// ================== NÚCLEO: cinemática + interpretador KRL ==================
const RL = (function () {
  "use strict";
  const D2R = Math.PI / 180, R2D = 180 / Math.PI;
  // Geometria didática aproximada (mm) — NÃO é a dimensional oficial de nenhum modelo
  const GEO = { d1: 400, a1: 25, a2: 455, a3: 35, d4: 420, d6: 80 };
  const LIMITS = [[-170, 170], [-190, 45], [-120, 156], [-185, 185], [-120, 120], [-350, 350]];
  const VMAX = [300, 300, 300, 380, 380, 600]; // graus/s (didático)
  const HOME = [0, -90, 90, 0, 0, 0];
  const DEFAULT_TOOL = { X: 110, Y: 0, Z: 0, A: 0, B: 0, C: 0 };
  // Obstáculos da célula (coordenadas do robô, mm)
  let OBSTACLES = [];
  function setObstacles(list) { OBSTACLES = list; }
  function getObstacles() { return OBSTACLES; }

  // ---------- matrizes 4x4 (linha-maior) ----------
  const mul = (a, b) => { const r = new Array(16); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let s = 0; for (let k = 0; k < 4; k++) s += a[i * 4 + k] * b[k * 4 + j]; r[i * 4 + j] = s; } return r; };
  const T = (x, y, z) => [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
  const RX = t => { const c = Math.cos(t), s = Math.sin(t); return [1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]; };
  const RY = t => { const c = Math.cos(t), s = Math.sin(t); return [c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]; };
  const RZ = t => { const c = Math.cos(t), s = Math.sin(t); return [c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]; };
  const inv = m => { const r = [m[0], m[4], m[8], 0, m[1], m[5], m[9], 0, m[2], m[6], m[10], 0, 0, 0, 0, 1];
    r[3] = -(r[0] * m[3] + r[1] * m[7] + r[2] * m[11]); r[7] = -(r[4] * m[3] + r[5] * m[7] + r[6] * m[11]); r[11] = -(r[8] * m[3] + r[9] * m[7] + r[10] * m[11]); return r; };
  const rotOnly = m => [m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, 0, 0, 0, 1];
  const frameToMat = f => mul(T(f.X || 0, f.Y || 0, f.Z || 0), mul(RZ((f.A || 0) * D2R), mul(RY((f.B || 0) * D2R), RX((f.C || 0) * D2R))));
  function matToFrame(m) {
    const r00 = m[0], r10 = m[4], r20 = m[8], h = Math.hypot(r00, r10);
    let A, B, C;
    if (h < 1e-7) { B = r20 < 0 ? 90 : -90; A = 0; C = (r20 < 0 ? Math.atan2(m[1], m[5]) : Math.atan2(-m[1], m[5])) * R2D; }
    else { B = Math.atan2(-r20, h) * R2D; A = Math.atan2(r10, r00) * R2D; C = Math.atan2(m[9], m[10]) * R2D; }
    const cl = v => Math.abs(v) < 1e-9 ? 0 : v;
    return { X: cl(m[3]), Y: cl(m[7]), Z: cl(m[11]), A: cl(A), B: cl(B), C: cl(C) };
  }
  const norm180 = a => { a = ((a + 180) % 360 + 360) % 360 - 180; return a === -180 ? 180 : a; };
  function fitRange(v, lo, hi, ref) { // escolhe v+360k dentro de [lo,hi] mais próximo de ref
    let best = null;
    for (let k = -2; k <= 2; k++) { const c = v + 360 * k; if (c >= lo - 1e-6 && c <= hi + 1e-6) { if (best === null || Math.abs(c - ref) < Math.abs(best - ref)) best = c; } }
    return best;
  }

  // ---------- cinemática direta ----------
  function fk(j) {
    const r = j.map(v => v * D2R);
    const F1 = RZ(-r[0]);
    const F2 = mul(F1, mul(T(GEO.a1, 0, GEO.d1), RY(r[1])));
    const F3 = mul(F2, mul(T(GEO.a2, 0, 0), RY(r[2])));
    const F4 = mul(F3, mul(T(0, 0, GEO.a3), RX(r[3])));
    const F5 = mul(F4, mul(T(GEO.d4, 0, 0), RY(r[4])));
    const F6 = mul(F5, mul(RX(r[5]), T(GEO.d6, 0, 0)));
    return { F1, F2, F3, F4, F5, F6 };
  }

  // ---------- cinemática inversa analítica (punho esférico) ----------
  function ik(Mf, cur) {
    const wx = Mf[3] - GEO.d6 * Mf[0], wy = Mf[7] - GEO.d6 * Mf[4], wz = Mf[11] - GEO.d6 * Mf[8];
    const L3 = Math.hypot(GEO.a3, GEO.d4), dl = Math.atan2(GEO.a3, GEO.d4);
    const R = rotOnly(Mf);
    const t0 = Math.atan2(wy, wx), nearAxis = Math.hypot(wx, wy) < 1e-6;
    const th1s = nearAxis ? [-cur[0] * D2R] : [t0, t0 + Math.PI];
    const cands = []; let reach = false, limitAxis = null;
    for (const t1 of th1s) {
      const r = wx * Math.cos(t1) + wy * Math.sin(t1) - GEO.a1, z = wz - GEO.d1;
      const D = (r * r + z * z - GEO.a2 * GEO.a2 - L3 * L3) / (2 * GEO.a2 * L3);
      if (Math.abs(D) > 1 + 1e-9) continue;
      reach = true;
      for (const sg of [-1, 1]) {
        const psi = sg * Math.acos(Math.max(-1, Math.min(1, D)));
        const ph2 = Math.atan2(z, r) - Math.atan2(L3 * Math.sin(psi), GEO.a2 + L3 * Math.cos(psi));
        const ph3 = ph2 + psi - dl;
        const a1 = fitRange(norm180(-t1 * R2D), LIMITS[0][0], LIMITS[0][1], cur[0]);
        const a2 = fitRange(norm180(-ph2 * R2D), LIMITS[1][0], LIMITS[1][1], cur[1]);
        const a3 = fitRange(norm180((dl - psi) * R2D), LIMITS[2][0], LIMITS[2][1], cur[2]);
        if (a1 === null) { limitAxis = limitAxis || "A1"; continue; }
        if (a2 === null) { limitAxis = limitAxis || "A2"; continue; }
        if (a3 === null) { limitAxis = limitAxis || "A3"; continue; }
        const R36 = mul(inv(mul(RZ(t1), RY(-ph3))), R);
        const r00 = R36[0], r01 = R36[1], r02 = R36[2], r10 = R36[4], r11 = R36[5], r20 = R36[8], r21 = R36[9];
        const sb = Math.hypot(r10, r20);
        const wr = [];
        if (sb < 1e-6) {
          if (r00 > 0) { const a4 = cur[3]; wr.push([a4, 0, Math.atan2(r21, r11) * R2D - a4, true]); }
        } else {
          const b = Math.atan2(sb, r00) * R2D, a = Math.atan2(r10, -r20) * R2D, c = Math.atan2(r01, r02) * R2D;
          wr.push([a, b, c, false], [a + 180, -b, c + 180, false]);
        }
        for (const [w4, w5, w6, sing] of wr) {
          const a4 = fitRange(norm180(w4), LIMITS[3][0], LIMITS[3][1], cur[3]);
          const a6 = fitRange(norm180(w6), LIMITS[5][0], LIMITS[5][1], cur[5]);
          if (a4 === null) { limitAxis = limitAxis || "A4"; continue; }
          if (Math.abs(w5) > LIMITS[4][1]) { limitAxis = limitAxis || "A5"; continue; }
          if (a6 === null) { limitAxis = limitAxis || "A6"; continue; }
          const jj = [a1, a2, a3, a4, w5, a6];
          const cost = jj.reduce((s, v, i) => s + Math.abs(v - cur[i]) * (i < 3 ? 1.5 : 1), 0);
          cands.push({ j: jj, cost, sing: sing || Math.abs(w5) < 0.5 });
        }
      }
    }
    if (!cands.length) return { ok: false, reason: !reach ? "fora do alcance do robô" : `limite do eixo ${limitAxis || "?"}` };
    cands.sort((a, b) => a.cost - b.cost);
    return { ok: true, j: cands[0].j, singular: cands[0].sing };
  }

  // ---------- quaternions (para interpolação de orientação) ----------
  function matToQuat(m) {
    const t = m[0] + m[5] + m[10]; let w, x, y, z;
    if (t > 0) { const s = Math.sqrt(t + 1) * 2; w = s / 4; x = (m[9] - m[6]) / s; y = (m[2] - m[8]) / s; z = (m[4] - m[1]) / s; }
    else if (m[0] > m[5] && m[0] > m[10]) { const s = Math.sqrt(1 + m[0] - m[5] - m[10]) * 2; w = (m[9] - m[6]) / s; x = s / 4; y = (m[1] + m[4]) / s; z = (m[2] + m[8]) / s; }
    else if (m[5] > m[10]) { const s = Math.sqrt(1 + m[5] - m[0] - m[10]) * 2; w = (m[2] - m[8]) / s; x = (m[1] + m[4]) / s; y = s / 4; z = (m[6] + m[9]) / s; }
    else { const s = Math.sqrt(1 + m[10] - m[0] - m[5]) * 2; w = (m[4] - m[1]) / s; x = (m[2] + m[8]) / s; y = (m[6] + m[9]) / s; z = s / 4; }
    return [w, x, y, z];
  }
  function quatToMat(q, p) {
    const [w, x, y, z] = q;
    return [1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w), p[0],
      2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w), p[1],
      2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y), p[2], 0, 0, 0, 1];
  }
  function slerp(a, b, t) {
    let d = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    if (d < 0) { b = b.map(v => -v); d = -d; }
    if (d > 0.9995) { const r = a.map((v, i) => v + t * (b[i] - v)); const n = Math.hypot(...r); return r.map(v => v / n); }
    const th = Math.acos(d), s = Math.sin(th);
    return a.map((v, i) => (Math.sin((1 - t) * th) * v + Math.sin(t * th) * b[i]) / s);
  }
  const quatAngle = (a, b) => 2 * Math.acos(Math.min(1, Math.abs(a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]))) * R2D;

  // ---------- pontos de verificação de colisão ----------
  function bodyPoints(j, toolM) {
    const f = fk(j), p = m => [m[3], m[7], m[11]];
    const tcp = mul(f.F6, toolM);
    return [["cotovelo", p(f.F3)], ["punho", p(f.F5)], ["flange", p(f.F6)], ["ferramenta", p(tcp)]];
  }
  function checkCollision(j, toolM) {
    for (const [nome, pt] of bodyPoints(j, toolM)) {
      if (pt[2] < 0) return { obstacle: { id: "piso", nome: "Piso" }, part: nome };
      for (const o of OBSTACLES) if (pt[0] > o.min[0] && pt[0] < o.max[0] && pt[1] > o.min[1] && pt[1] < o.max[1] && pt[2] > o.min[2] && pt[2] < o.max[2]) return { obstacle: o, part: nome };
    }
    return null;
  }

  // ======================= LÉXICO =======================
  class KrlError extends Error { constructor(msg, loc) { super(msg); this.loc = loc; } }
  const TOK = /\s*(?:(\d+\.\d*(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?|\d+(?:[eE][+-]?\d+)?)|("[^"]*")|(#[A-Za-z_]\w*)|([$A-Za-z_][\w$]*)|(==|<>|<=|>=|[=<>+\-*/(),\[\]{}.:]))/y;
  function tokenize(s, loc) {
    const out = []; TOK.lastIndex = 0; let pos = 0;
    while (pos < s.length) {
      if (/^\s*$/.test(s.slice(pos))) break;
      TOK.lastIndex = pos; const m = TOK.exec(s);
      if (!m) throw new KrlError(`caractere inesperado "${s.slice(pos).trim()[0]}"`, loc);
      pos = TOK.lastIndex;
      if (m[1] !== undefined) out.push({ t: "num", v: parseFloat(m[1]) });
      else if (m[2] !== undefined) out.push({ t: "str", v: m[2].slice(1, -1) });
      else if (m[3] !== undefined) out.push({ t: "enum", v: m[3].toUpperCase() });
      else if (m[4] !== undefined) out.push({ t: "id", v: m[4], u: m[4].toUpperCase() });
      else out.push({ t: "op", v: m[5] });
    }
    return out;
  }
  function stripComment(s) { let q = false; for (let i = 0; i < s.length; i++) { if (s[i] === '"') q = !q; else if (s[i] === ";" && !q) return s.slice(0, i); } return s; }
  function prep(text, file) {
    const out = [];
    text.split(/\r?\n/).forEach((raw, i) => {
      const loc = { file, line: i + 1 };
      let s = raw.trim();
      if (s.startsWith("&")) return;
      s = stripComment(s).trim();
      if (!s) return;
      out.push({ loc, text: s, toks: tokenize(s, loc) });
    });
    return out;
  }

  // ======================= EXPRESSÕES =======================
  class EP {
    constructor(toks, loc) { this.t = toks; this.i = 0; this.loc = loc; }
    peek(o = 0) { return this.t[this.i + o]; }
    isOp(v) { const k = this.peek(); return k && k.t === "op" && k.v === v; }
    isKw(v) { const k = this.peek(); return k && k.t === "id" && k.u === v; }
    eat(v) { if (!this.isOp(v)) throw new KrlError(`esperado "${v}"${this.peek() ? ` e encontrado "${this.peek().v}"` : " no fim da linha"}`, this.loc); this.i++; }
    done() { return this.i >= this.t.length; }
    expr() { let a = this.or(); while (this.peek() && this.peek().t === "op" && ["==", "<>", "<", ">", "<=", ">="].includes(this.peek().v)) { const op = this.t[this.i++].v; a = { n: "bin", op, a, b: this.or() }; } return a; }
    or() { let a = this.exor(); while (this.isKw("OR")) { this.i++; a = { n: "bin", op: "OR", a, b: this.exor() }; } return a; }
    exor() { let a = this.and(); while (this.isKw("EXOR")) { this.i++; a = { n: "bin", op: "EXOR", a, b: this.and() }; } return a; }
    and() { let a = this.add(); while (this.isKw("AND")) { this.i++; a = { n: "bin", op: "AND", a, b: this.add() }; } return a; }
    add() { let a = this.mulx(); while (this.isOp("+") || this.isOp("-")) { const op = this.t[this.i++].v; a = { n: "bin", op, a, b: this.mulx() }; } return a; }
    mulx() { let a = this.un(); while (this.isOp("*") || this.isOp("/")) { const op = this.t[this.i++].v; a = { n: "bin", op, a, b: this.un() }; } return a; }
    un() {
      if (this.isKw("NOT")) { this.i++; return { n: "un", op: "NOT", a: this.un() }; }
      if (this.isOp("-")) { this.i++; return { n: "un", op: "-", a: this.un() }; }
      if (this.isOp("+")) { this.i++; return this.un(); }
      return this.postfix(this.primary());
    }
    postfix(e) {
      for (;;) {
        if (this.isOp(".")) { this.i++; const k = this.peek(); if (!k || k.t !== "id") throw new KrlError("esperado nome do componente após '.'", this.loc); this.i++; e = { n: "mem", obj: e, key: k.u }; }
        else if (this.isOp("[")) { this.i++; const ix = this.expr(); this.eat("]"); e = { n: "idx", obj: e, index: ix }; }
        else return e;
      }
    }
    primary() {
      const k = this.peek();
      if (!k) throw new KrlError("expressão incompleta", this.loc);
      this.i++;
      if (k.t === "num") return { n: "num", v: k.v };
      if (k.t === "str") return { n: "str", v: k.v };
      if (k.t === "enum") return { n: "enum", v: k.v };
      if (k.t === "op" && k.v === "(") { const e = this.expr(); this.eat(")"); return e; }
      if (k.t === "op" && k.v === "{") return this.agg();
      if (k.t === "id") {
        if (k.u === "TRUE" || k.u === "FALSE") return { n: "bool", v: k.u === "TRUE" };
        if (this.isOp("(")) { this.i++; const args = []; if (!this.isOp(")")) { do { args.push(this.expr()); } while (this.isOp(",") && ++this.i); } this.eat(")"); return { n: "call", name: k.u, args }; }
        return { n: "var", name: k.u };
      }
      throw new KrlError(`símbolo inesperado "${k.v}"`, this.loc);
    }
    agg() {
      let type = null;
      if (this.peek() && this.peek().t === "id" && this.peek(1) && this.peek(1).t === "op" && this.peek(1).v === ":") { type = this.peek().u; this.i += 2; }
      const comps = [];
      while (!this.isOp("}")) {
        const k = this.peek();
        if (!k || k.t !== "id") throw new KrlError("agregado inválido: esperado nome do componente (ex.: X 100)", this.loc);
        this.i++;
        if (this.isOp("[") && this.peek(1) && this.peek(1).v === "]") this.i += 2;
        comps.push([k.u, this.expr()]);
        if (this.isOp(",")) this.i++; else if (!this.isOp("}")) throw new KrlError('agregado inválido: esperado "," ou "}"', this.loc);
      }
      this.eat("}");
      return { n: "agg", type, comps };
    }
  }
  function parseExprToks(toks, loc) { const p = new EP(toks, loc); const e = p.expr(); if (!p.done()) throw new KrlError(`texto inesperado após a expressão: "${p.peek().v}"`, loc); return e; }

  // ======================= PARSER DE INSTRUÇÕES =======================
  const TYPES = ["INT", "REAL", "BOOL", "CHAR", "E6POS", "POS", "FRAME", "E6AXIS", "AXIS"];
  const COMPAT_TYPES = ["FDAT", "PDAT", "LDAT", "LOAD", "STATE_T", "SIGNAL"];
  const APPROX = ["C_PTP", "C_DIS", "C_VEL", "C_ORI", "C_SPL"];
  function splitTop(toks, kw) { for (let i = 0; i < toks.length; i++) if (toks[i].t === "id" && toks[i].u === kw) return i; return -1; }
  function splitCommas(toks) { const parts = [[]]; let d = 0; for (const k of toks) { if (k.t === "op" && "([{".includes(k.v)) d++; if (k.t === "op" && ")]}".includes(k.v)) d--; if (k.t === "op" && k.v === "," && d === 0) parts.push([]); else parts[parts.length - 1].push(k); } return parts; }

  function parse(srcText, datText) {
    const errors = [], warnings = [];
    let lines = [];
    try { lines = prep(datText || "", "dat").concat(prep(srcText || "", "src")); }
    catch (e) { errors.push({ msg: e.message, loc: e.loc }); return { errors, warnings }; }
    const mod = { defs: {}, order: [], dat: [], name: null };
    let i = 0;
    const L = () => lines[i];
    const first = ln => ln.toks[0] && ln.toks[0].t === "id" ? ln.toks[0].u : "";

    function parseDecl(toks, loc, out) {
      let k = 0;
      if (toks[k] && toks[k].u === "DECL") k++;
      if (toks[k] && toks[k].u === "GLOBAL") k++;
      if (toks[k] && toks[k].u === "CONST") k++;
      const ty = toks[k] && toks[k].u; k++;
      if (!ty) throw new KrlError("DECL sem tipo", loc);
      if (!TYPES.includes(ty) && !COMPAT_TYPES.includes(ty)) warnings.push({ msg: `tipo ${ty} não é simulado — aceito como estrutura genérica`, loc });
      for (const part of splitCommas(toks.slice(k))) {
        if (!part.length || part[0].t !== "id") throw new KrlError("nome de variável esperado na declaração", loc);
        const name = part[0].u; let p = 1, size = null, init = null;
        if (part[p] && part[p].v === "[") { p++; if (part[p] && part[p].t === "num") { size = part[p].v; p++; } if (!part[p] || part[p].v !== "]") throw new KrlError("declaração de vetor inválida", loc); p++; }
        if (part[p] && part[p].v === "=") { init = parseExprToks(part.slice(p + 1), loc); p = part.length; }
        if (p < part.length) throw new KrlError(`texto inesperado na declaração: "${part[p].v}"`, loc);
        out.push({ k: "DECL", type: ty, name, size, init, loc, compat: COMPAT_TYPES.includes(ty) });
      }
    }

    function parseBlock(terms) {
      const stmts = [];
      for (;;) {
        if (i >= lines.length) throw new KrlError(`fim do arquivo inesperado — esperado ${terms.join(" ou ")}`, lines.length ? lines[lines.length - 1].loc : { file: "src", line: 1 });
        const f = first(L());
        if (terms.includes(f)) return { stmts, term: f };
        try { const s = parseStmt(); if (s) stmts.push(s); }
        catch (e) { if (!(e instanceof KrlError)) throw e; errors.push({ msg: e.message, loc: e.loc }); i++; }
      }
    }

    function parseStmt() {
      const ln = L(), toks = ln.toks, loc = ln.loc, f = first(ln);
      const rest = toks.slice(1);
      const node = (o) => { i++; return Object.assign({ loc, text: ln.text }, o); };
      if (f === "DECL" || ((TYPES.includes(f) || COMPAT_TYPES.includes(f)) && toks[1] && toks[1].t === "id")) { const out = []; parseDecl(toks, loc, out); i++; return { k: "BLOCK", stmts: out, loc, text: ln.text }; }
      if (f === "IF") {
        const th = splitTop(toks, "THEN"); if (th < 0) throw new KrlError("IF sem THEN", loc);
        const cond = parseExprToks(toks.slice(1, th), loc); i++;
        const b1 = parseBlock(["ELSE", "ENDIF"]); let b2 = { stmts: [] };
        if (b1.term === "ELSE") { i++; b2 = parseBlock(["ENDIF"]); }
        i++; return { k: "IF", cond, then: b1.stmts, els: b2.stmts, loc, text: ln.text };
      }
      if (f === "FOR") {
        const to = splitTop(toks, "TO"), st = splitTop(toks, "STEP");
        if (to < 0 || !toks[1] || toks[1].t !== "id" || !toks[2] || toks[2].v !== "=") throw new KrlError("sintaxe: FOR i = início TO fim [STEP passo]", loc);
        const v = toks[1].u, from = parseExprToks(toks.slice(3, to), loc);
        const toE = parseExprToks(toks.slice(to + 1, st < 0 ? toks.length : st), loc);
        const step = st < 0 ? { n: "num", v: 1 } : parseExprToks(toks.slice(st + 1), loc);
        i++; const b = parseBlock(["ENDFOR"]); i++;
        return { k: "FOR", v, from, to: toE, step, body: b.stmts, loc, text: ln.text };
      }
      if (f === "WHILE") { const cond = parseExprToks(rest, loc); i++; const b = parseBlock(["ENDWHILE"]); i++; return { k: "WHILE", cond, body: b.stmts, loc, text: ln.text }; }
      if (f === "LOOP") { i++; const b = parseBlock(["ENDLOOP"]); i++; return { k: "LOOP", body: b.stmts, loc, text: ln.text }; }
      if (f === "REPEAT") { i++; const b = parseBlock(["UNTIL"]); const u = L(); const cond = parseExprToks(u.toks.slice(1), u.loc); i++; return { k: "REPEAT", cond, body: b.stmts, loc, text: ln.text }; }
      if (f === "SWITCH") {
        const sel = parseExprToks(rest, loc); i++; const cases = []; let def = null;
        while (i < lines.length && first(L()) !== "ENDSWITCH") {
          const h = L(), hf = first(h);
          if (hf === "CASE") { const vals = splitCommas(h.toks.slice(1)).map(p => parseExprToks(p, h.loc)); i++; const b = parseBlock(["CASE", "DEFAULT", "ENDSWITCH"]); cases.push({ vals, body: b.stmts }); }
          else if (hf === "DEFAULT") { i++; const b = parseBlock(["CASE", "DEFAULT", "ENDSWITCH"]); def = b.stmts; }
          else throw new KrlError("esperado CASE, DEFAULT ou ENDSWITCH", h.loc);
        }
        if (i >= lines.length) throw new KrlError("SWITCH sem ENDSWITCH", loc);
        i++; return { k: "SWITCH", sel, cases, def, loc, text: ln.text };
      }
      if (f === "EXIT") return node({ k: "EXIT" });
      if (f === "RETURN") return node({ k: "RETURN" });
      if (f === "HALT") return node({ k: "HALT" });
      if (f === "INI") return node({ k: "INI" });
      if (f === "BRAKE") { warnings.push({ msg: "BRAKE aceito sem efeito (o robô simulado para ao fim do movimento)", loc }); return node({ k: "NOP" }); }
      if (f === "WAIT") {
        if (toks[1] && toks[1].u === "SEC") return node({ k: "WAITSEC", e: parseExprToks(toks.slice(2), loc) });
        if (toks[1] && toks[1].u === "FOR") return node({ k: "WAITFOR", e: parseExprToks(toks.slice(2), loc) });
        throw new KrlError("use WAIT SEC tempo ou WAIT FOR condição", loc);
      }
      if (["PTP", "LIN", "PTP_REL", "LIN_REL", "CIRC"].includes(f)) {
        let tk = rest.slice(), approx = null, frame = "BASE";
        while (tk.length) { const l = tk[tk.length - 1]; if (l.t === "id" && APPROX.includes(l.u)) { approx = l.u; tk.pop(); } else if (l.t === "enum" && (l.v === "#TOOL" || l.v === "#BASE")) { frame = l.v.slice(1); tk.pop(); } else break; }
        if (!tk.length) throw new KrlError(`${f} sem ponto de destino`, loc);
        if (approx) warnings.push({ msg: `${approx}: aproximação não simulada — o robô para exatamente em cada ponto`, loc });
        if (f === "CIRC") {
          const parts = splitCommas(tk); if (parts.length < 2) throw new KrlError("CIRC precisa de ponto auxiliar e ponto final: CIRC aux, fim", loc);
          if (parts.length > 2) warnings.push({ msg: "CIRC: parâmetro CA (ângulo) não suportado — ignorado", loc });
          return node({ k: "CIRC", aux: parseExprToks(parts[0], loc), e: parseExprToks(parts[1], loc) });
        }
        return node({ k: f, e: parseExprToks(tk, loc), frame });
      }
      if (f === "INTERRUPT" || (f === "GLOBAL" && toks[1] && toks[1].u === "INTERRUPT")) {
        const tk = f === "GLOBAL" ? toks.slice(1) : toks;
        if (tk[1] && tk[1].u === "DECL") {
          const w = splitTop(tk, "WHEN"), d = splitTop(tk, "DO");
          if (w < 0 || d < 0) throw new KrlError("sintaxe: INTERRUPT DECL n WHEN condição DO subprograma()", loc);
          const num = parseExprToks(tk.slice(2, w), loc), cond = parseExprToks(tk.slice(w + 1, d), loc), call = parseExprToks(tk.slice(d + 1), loc);
          if (call.n !== "call") throw new KrlError("após DO deve vir a chamada de um subprograma", loc);
          return node({ k: "INTDECL", num, cond, call });
        }
        if (tk[1] && (tk[1].u === "ON" || tk[1].u === "OFF" || tk[1].u === "ENABLE" || tk[1].u === "DISABLE")) {
          const on = tk[1].u === "ON" || tk[1].u === "ENABLE";
          return node({ k: "INTSW", on, num: tk.length > 2 ? parseExprToks(tk.slice(2), loc) : null });
        }
        throw new KrlError("INTERRUPT: use DECL, ON ou OFF", loc);
      }
      if (["DEF", "END", "ENDIF", "ELSE", "ENDFOR", "ENDWHILE", "ENDLOOP", "UNTIL", "ENDSWITCH", "CASE", "DEFAULT", "DEFDAT", "ENDDAT"].includes(f))
        throw new KrlError(`${f} fora de lugar`, loc);
      if (["GOTO", "SPLINE", "SPL", "SLIN", "SCIRC", "SPTP", "TRIGGER", "CONTINUE", "ANOUT", "ANIN", "PULSE", "DEFFCT"].includes(f)) {
        warnings.push({ msg: `${f} ainda não é suportado pelo simulador — a linha será ignorada na execução`, loc });
        return node({ k: "UNSUP", what: f });
      }
      // atribuição ou chamada
      let d = 0, eq = -1;
      for (let q = 0; q < toks.length; q++) { const k = toks[q]; if (k.t === "op" && "([{".includes(k.v)) d++; if (k.t === "op" && ")]}".includes(k.v)) d--; if (d === 0 && k.t === "op" && k.v === "=") { eq = q; break; } }
      if (eq > 0) {
        const lhs = parseExprToks(toks.slice(0, eq), loc);
        if (!["var", "mem", "idx"].includes(lhs.n)) throw new KrlError("lado esquerdo da atribuição inválido", loc);
        return node({ k: "ASSIGN", lhs, e: parseExprToks(toks.slice(eq + 1), loc) });
      }
      const e = parseExprToks(toks, loc);
      if (e.n === "call") return node({ k: "CALL", call: e });
      throw new KrlError(`instrução não reconhecida: "${ln.text}"`, loc);
    }

    while (i < lines.length) {
      const ln = L(), f = first(ln);
      try {
        if (f === "DEFDAT") {
          const nm = ln.toks[1] ? ln.toks[1].u : null; i++;
          while (i < lines.length && first(L()) !== "ENDDAT") {
            const d = L();
            try {
              const df = first(d);
              if (df === "DECL" || TYPES.includes(df) || COMPAT_TYPES.includes(df) || df === "GLOBAL") parseDecl(d.toks, d.loc, mod.dat);
              else if (df === "EXT" || df === "EXTFCT" || df === "PUBLIC") { /* ignorado */ }
              else throw new KrlError("no arquivo DAT só são permitidas declarações (DECL)", d.loc);
            } catch (e) { if (!(e instanceof KrlError)) throw e; errors.push({ msg: e.message, loc: e.loc }); }
            i++;
          }
          if (i >= lines.length) throw new KrlError("DEFDAT sem ENDDAT", ln.loc);
          i++; mod.datName = nm; continue;
        }
        if (f === "DEF" || (f === "GLOBAL" && ln.toks[1] && ln.toks[1].u === "DEF")) {
          const tk = f === "GLOBAL" ? ln.toks.slice(1) : ln.toks;
          if (!tk[1] || tk[1].t !== "id") throw new KrlError("DEF sem nome", ln.loc);
          const name = tk[1].u, params = [];
          if (!tk[2] || tk[2].v !== "(") throw new KrlError(`esperado "(" após DEF ${tk[1].v}`, ln.loc);
          for (const p of splitCommas(tk.slice(3, tk.length - 1))) if (p.length) { if (p[0].t !== "id") throw new KrlError("parâmetro inválido", ln.loc); params.push(p[0].u); }
          i++;
          const b = parseBlock(["END"]); i++;
          if (mod.defs[name]) errors.push({ msg: `subprograma ${name} definido duas vezes`, loc: ln.loc });
          mod.defs[name] = { name, display: tk[1].v, params, body: b.stmts, loc: ln.loc };
          mod.order.push(name); if (!mod.name) mod.name = tk[1].v;
          continue;
        }
        if (f === "DEFFCT") { warnings.push({ msg: "DEFFCT (funções) ainda não suportado — ignorado", loc: ln.loc }); while (i < lines.length && first(L()) !== "ENDFCT") i++; i++; continue; }
        throw new KrlError(`"${ln.text}" fora de um bloco DEF ... END`, ln.loc);
      } catch (e) { if (!(e instanceof KrlError)) throw e; errors.push({ msg: e.message, loc: e.loc }); i++; }
    }
    if (!mod.order.length && !errors.length) errors.push({ msg: "nenhum programa encontrado (esperado DEF nome() ... END)", loc: { file: "src", line: 1 } });
    if (!errors.length) staticCheck(mod, errors, warnings);
    return { mod, errors, warnings };
  }

  // ---------- verificação estática de variáveis e chamadas ----------
  const SYS_RO = ["$POS_ACT", "$AXIS_ACT", "$IN", "$NULLFRAME", "$STOPMESS", "$MODE_OP", "$ON_PATH", "$TIMER"];
  const SYS_RW = ["$GARRA_FORCA", "$GARRA_ABERTURA", "$OUT", "$VEL", "$VEL_AXIS", "$ACC", "$ACC_AXIS", "$APO", "$BASE", "$TOOL", "$OV_PRO", "$BWDSTART", "$H_POS", "$ADVANCE", "$ORI_TYPE", "$CIRC_TYPE", "$IPO_MODE", "$LOAD"];
  const BUILTIN_FN = ["SIN", "COS", "TAN", "ACOS", "ASIN", "ATAN2", "SQRT", "ABS", "ROUND", "TRUNC", "MIN", "MAX"];
  const COMPAT_CALLS = ["BAS", "IR_STOPM", "PTP_PARAMS", "USER_INI"];
  const PREDEF = { HOME: "E6AXIS", XHOME: "E6AXIS", PDAT_ACT: "PDAT", FDAT_ACT: "FDAT", LDAT_ACT: "LDAT" };
  function staticCheck(mod, errors, warnings) {
    const modVars = new Set([...Object.keys(PREDEF), ...mod.dat.map(d => d.name)]);
    for (const name of mod.order) {
      const def = mod.defs[name], local = new Set(def.params);
      const collect = ss => ss.forEach(s => { if (s.k === "DECL") local.add(s.name); if (s.k === "BLOCK") collect(s.stmts); ["then", "els", "body"].forEach(k => s[k] && collect(s[k])); if (s.cases) s.cases.forEach(c => collect(c.body)); if (s.def) collect(s.def); });
      collect(def.body);
      const known = n => local.has(n) || modVars.has(n) || n.startsWith("$");
      const walk = (e, loc) => {
        if (!e) return;
        if (e.n === "var") { if (!known(e.name)) errors.push({ msg: `variável ${e.name} não declarada`, loc }); else if (e.name.startsWith("$") && !SYS_RO.includes(e.name) && !SYS_RW.includes(e.name)) warnings.push({ msg: `variável de sistema ${e.name} não é simulada`, loc }); }
        else if (e.n === "call") { if (!BUILTIN_FN.includes(e.name)) errors.push({ msg: `função ${e.name}() não suportada em expressões`, loc }); e.args.forEach(a => walk(a, loc)); }
        else if (e.n === "agg") e.comps.forEach(c => walk(c[1], loc));
        else { walk(e.a, loc); walk(e.b, loc); walk(e.obj, loc); walk(e.index, loc); }
      };
      const ws = ss => ss.forEach(s => {
        ["e", "cond", "from", "to", "step", "aux", "lhs", "init", "sel", "num"].forEach(k => s[k] && walk(s[k], s.loc));
        if (s.k === "FOR" && !known(s.v)) errors.push({ msg: `variável de contagem ${s.v} não declarada (use DECL INT ${s.v})`, loc: s.loc });
        if (s.k === "CALL" || s.k === "INTDECL") { const c = s.call; if (!mod.defs[c.name] && !COMPAT_CALLS.includes(c.name)) (s.k === "CALL" ? errors : warnings).push({ msg: `subprograma ${c.name}() não encontrado neste módulo`, loc: s.loc }); c.args.forEach(a => walk(a, s.loc)); }
        if (s.k === "ASSIGN" && s.lhs.n === "var" && SYS_RO.includes(s.lhs.name)) errors.push({ msg: `${s.lhs.name} é somente leitura`, loc: s.loc });
        if (s.k === "ASSIGN" && s.lhs.n === "idx" && s.lhs.obj.n === "var" && s.lhs.obj.name === "$IN") errors.push({ msg: "$IN é somente leitura (entradas vêm dos periféricos)", loc: s.loc });
        if (s.k === "BLOCK") ws(s.stmts);
        ["then", "els", "body"].forEach(k => s[k] && ws(s[k])); if (s.cases) s.cases.forEach(c => { c.vals.forEach(v => walk(v, s.loc)); ws(c.body); }); if (s.def) ws(s.def);
      });
      ws(def.body);
    }
    mod.dat.forEach(d => d.init && (function w(e) { if (!e) return; if (e.n === "var" && !modVars.has(e.name) && !e.name.startsWith("$")) errors.push({ msg: `variável ${e.name} não declarada`, loc: d.loc }); if (e.n === "agg") e.comps.forEach(c => w(c[1])); w(e.a); w(e.b); })(d.init));
  }

  // ======================= EXECUÇÃO =======================
  class Signal { constructor(kind) { this.kind = kind; } }
  const AXK = ["A1", "A2", "A3", "A4", "A5", "A6"], POSK = ["X", "Y", "Z", "A", "B", "C"];
  const isAxisAgg = v => v && typeof v === "object" && (v.__t === "E6AXIS" || v.__t === "AXIS" || (!v.__t && AXK.some(k => k in v)));
  const isPosAgg = v => v && typeof v === "object" && (["E6POS", "POS", "FRAME"].includes(v.__t) || (!v.__t && POSK.some(k => k in v)));
  const clone = v => (v && typeof v === "object") ? JSON.parse(JSON.stringify(v)) : v;
  const fmt = v => typeof v === "number" ? (Math.round(v * 1000) / 1000).toString() : v;

  class Machine {
    constructor(parsed, hooks) {
      this.p = parsed; this.mod = parsed.mod; this.h = hooks;
      this.sys = { OUT: new Array(65).fill(false), VEL: { CP: 0.3, ORI1: 200, ORI2: 200 }, VEL_AXIS: new Array(7).fill(100), ACC: { CP: 2.3, ORI1: 400, ORI2: 400 }, ACC_AXIS: new Array(7).fill(100), APO: { CDIS: 10, CPTP: 50, CORI: 10, CVEL: 100 }, BASE: { __t: "FRAME", X: 0, Y: 0, Z: 0, A: 0, B: 0, C: 0 }, TOOL: Object.assign({ __t: "FRAME" }, DEFAULT_TOOL), OV_PRO: 100, misc: {} };
      this.modScope = {}; this.ints = {}; this.stmtCount = 0; this.warned = new Set();
      this.state = "idle"; this.stepMode = false; this.stepGo = null;
    }
    log(lvl, msg, loc) { this.h.log(lvl, msg, loc); }
    warnOnce(key, msg, loc) { if (!this.warned.has(key)) { this.warned.add(key); this.log("warn", msg, loc); } }
    // ----- variáveis -----
    defVal(type, size) {
      const base = { INT: 0, REAL: 0, BOOL: false, CHAR: "" }[type];
      const one = () => base !== undefined ? undefined : { __t: type };
      if (size) return Array.from({ length: size + 1 }, one);
      return one();
    }
    lookup(name, scope) {
      if (scope && name in scope) return scope;
      if (name in this.modScope) return this.modScope;
      return null;
    }
    coerce(type, v, loc) {
      if (v === undefined) return v;
      if (type === "INT") { if (typeof v !== "number") throw new KrlError(`valor incompatível com INT`, loc); return Math.round(v); }
      if (type === "REAL") { if (typeof v !== "number") throw new KrlError(`valor incompatível com REAL`, loc); return v; }
      if (type === "BOOL") { if (typeof v !== "boolean") throw new KrlError(`valor incompatível com BOOL (use TRUE/FALSE)`, loc); return v; }
      return v;
    }
    declare(d, scope) {
      let v = this.defVal(d.type, d.size);
      if (d.init) { const val = this.eval(d.init, scope, d.loc); v = (val && typeof val === "object" && !Array.isArray(val)) ? Object.assign({ __t: d.type }, clone(val), { __t: d.type }) : this.coerce(d.type, val, d.loc); }
      scope[d.name] = v; (scope.__types || (scope.__types = {}))[d.name] = d.type;
    }
    sysGet(name, loc) {
      const n = name.slice(1);
      switch (n) {
        case "POS_ACT": return Object.assign({ __t: "E6POS" }, this.curPos());
        case "AXIS_ACT": { const j = this.h.getJoints(); const o = { __t: "E6AXIS" }; AXK.forEach((k, i) => o[k] = j[i]); return o; }
        case "NULLFRAME": return { __t: "FRAME", X: 0, Y: 0, Z: 0, A: 0, B: 0, C: 0 };
        case "STOPMESS": return false;
        case "IN": return { __in: true };
        case "OUT": return this.sys.OUT;
        case "VEL": return this.sys.VEL; case "ACC": return this.sys.ACC; case "APO": return this.sys.APO;
        case "VEL_AXIS": return this.sys.VEL_AXIS; case "ACC_AXIS": return this.sys.ACC_AXIS;
        case "GARRA_FORCA": return this.h.getGrip ? this.h.getGrip().forca : 60;
        case "GARRA_ABERTURA": return this.h.getGrip ? this.h.getGrip().abertura : 100;
        case "BASE": return this.sys.BASE; case "TOOL": return this.sys.TOOL; case "OV_PRO": return this.h.getOverride();
        case "MODE_OP": return "#T1"; case "ON_PATH": return true;
        default: if (n in this.sys.misc) return this.sys.misc[n]; throw new KrlError(`variável de sistema ${name} não é simulada`, loc);
      }
    }
    // ----- avaliação -----
    eval(e, scope, loc) {
      switch (e.n) {
        case "num": case "bool": case "str": return e.v;
        case "enum": return e.v;
        case "var": {
          if (e.name.startsWith("$")) return this.sysGet(e.name, loc);
          const s = this.lookup(e.name, scope);
          if (!s) { if (e.name === "HOME" || e.name === "XHOME") return { __t: "E6AXIS", A1: 0, A2: -90, A3: 90, A4: 0, A5: 0, A6: 0 }; throw new KrlError(`variável ${e.name} não declarada`, loc); }
          if (s[e.name] === undefined) throw new KrlError(`variável ${e.name} usada sem valor (não inicializada)`, loc);
          return s[e.name];
        }
        case "mem": { const o = this.eval(e.obj, scope, loc); if (!o || typeof o !== "object" || !(e.key in o)) throw new KrlError(`componente ${e.key} inexistente ou sem valor`, loc); return o[e.key]; }
        case "idx": {
          const ix = this.eval(e.index, scope, loc);
          if (e.obj.n === "var" && e.obj.name === "$IN") { if (ix < 1 || ix > 4096) throw new KrlError(`índice de $IN inválido: ${ix}`, loc); return this.h.getIn(ix); }
          const o = this.eval(e.obj, scope, loc);
          if (!Array.isArray(o)) throw new KrlError("indexação [ ] em variável que não é vetor", loc);
          if (ix < 1 || ix >= o.length) throw new KrlError(`índice ${ix} fora dos limites (1..${o.length - 1})`, loc);
          if (o[ix] === undefined) throw new KrlError(`elemento [${ix}] sem valor`, loc);
          return o[ix];
        }
        case "agg": { const o = { __t: e.type }; for (const [k, x] of e.comps) o[k] = this.eval(x, scope, loc); if (!o.__t) delete o.__t; return o; }
        case "call": {
          const a = e.args.map(x => this.eval(x, scope, loc)), M = Math;
          const num = v => { if (typeof v !== "number") throw new KrlError(`${e.name}() exige número`, loc); return v; };
          switch (e.name) {
            case "SIN": return M.sin(num(a[0]) * D2R); case "COS": return M.cos(num(a[0]) * D2R); case "TAN": return M.tan(num(a[0]) * D2R);
            case "ACOS": return M.acos(num(a[0])) * R2D; case "ASIN": return M.asin(num(a[0])) * R2D; case "ATAN2": return M.atan2(num(a[0]), num(a[1])) * R2D;
            case "SQRT": if (num(a[0]) < 0) throw new KrlError("SQRT de número negativo", loc); return M.sqrt(a[0]);
            case "ABS": return M.abs(num(a[0])); case "ROUND": return M.round(num(a[0])); case "TRUNC": return M.trunc(num(a[0]));
            case "MIN": return M.min(num(a[0]), num(a[1])); case "MAX": return M.max(num(a[0]), num(a[1]));
          }
          throw new KrlError(`função ${e.name}() não suportada`, loc);
        }
        case "un": { const v = this.eval(e.a, scope, loc); if (e.op === "NOT") { if (typeof v !== "boolean") throw new KrlError("NOT exige valor BOOL", loc); return !v; } if (typeof v !== "number") throw new KrlError("sinal '-' exige número", loc); return -v; }
        case "bin": {
          const a = this.eval(e.a, scope, loc), b = this.eval(e.b, scope, loc), op = e.op;
          if (["AND", "OR", "EXOR"].includes(op)) { if (typeof a !== "boolean" || typeof b !== "boolean") throw new KrlError(`${op} exige operandos BOOL — em KRL, ${op} tem prioridade maior que comparações; use parênteses: (a > 1) ${op} (b < 2)`, loc); return op === "AND" ? a && b : op === "OR" ? a || b : a !== b; }
          if (op === "==") return a === b; if (op === "<>") return a !== b;
          if (op === ":") throw new KrlError("operador geométrico ':' não suportado", loc);
          if (typeof a !== "number" || typeof b !== "number") throw new KrlError(`operador ${op} exige números`, loc);
          switch (op) { case "+": return a + b; case "-": return a - b; case "*": return a * b; case "/": if (b === 0) throw new KrlError("divisão por zero", loc); return a / b; case "<": return a < b; case ">": return a > b; case "<=": return a <= b; case ">=": return a >= b; }
        }
      }
      throw new KrlError("expressão inválida", loc);
    }
    assign(lhs, val, scope, loc) {
      // monta caminho
      const path = []; let e = lhs;
      while (e.n !== "var") { if (e.n === "mem") path.unshift({ key: e.key }); else path.unshift({ index: this.eval(e.index, scope, loc) }); e = e.obj; }
      const name = e.name;
      if (name.startsWith("$")) return this.sysSet(name.slice(1), path, val, loc);
      const s = this.lookup(name, scope);
      if (!s) throw new KrlError(`variável ${name} não declarada`, loc);
      const type = s.__types && s.__types[name];
      if (!path.length) {
        if (val && typeof val === "object" && !Array.isArray(val)) { const old = (s[name] && typeof s[name] === "object") ? s[name] : { __t: type }; s[name] = Object.assign(old, clone(val), { __t: type || val.__t }); }
        else s[name] = this.coerce(type, val, loc);
        return;
      }
      let o = s[name];
      if (o === undefined && path[0].key) o = s[name] = { __t: type };
      for (let k = 0; k < path.length - 1; k++) { const p = path[k]; o = p.key ? (o[p.key] = o[p.key] || {}) : o[p.index]; }
      const last = path[path.length - 1];
      if (last.key) o[last.key] = val; else { if (!Array.isArray(o) || last.index < 1 || last.index >= o.length) throw new KrlError(`índice ${last.index} fora dos limites`, loc); o[last.index] = this.coerce(type, val, loc); }
    }
    sysSet(n, path, val, loc) {
      const need = t => { if (typeof val !== t) throw new KrlError(`$${n}: valor ${t === "boolean" ? "BOOL" : "numérico"} esperado`, loc); };
      if (n === "OUT") { if (!path.length || path[0].index === undefined) throw new KrlError("use $OUT[n] = TRUE/FALSE", loc); need("boolean"); const ix = path[0].index; if (ix < 1 || ix > 64) throw new KrlError("simulador possui saídas $OUT[1..64]", loc); this.sys.OUT[ix] = val; this.h.output(ix, val); return; }
      if (n === "VEL" || n === "ACC" || n === "APO") { if (!path.length) { Object.assign(this.sys[n], val); return; } need("number"); if (n === "VEL" && path[0].key === "CP" && (val <= 0 || val > 2)) throw new KrlError("$VEL.CP deve estar entre 0 e 2 m/s", loc); this.sys[n][path[0].key] = val; return; }
      if (n === "VEL_AXIS" || n === "ACC_AXIS") { need("number"); if (!path.length || path[0].index < 1 || path[0].index > 6) throw new KrlError(`use $${n}[1..6] = %`, loc); if (val <= 0 || val > 100) throw new KrlError(`$${n} deve estar entre 1 e 100 %`, loc); this.sys[n][path[0].index] = val; return; }
      if (n === "BASE" || n === "TOOL") {
        if (!path.length) { if (!isPosAgg(val)) throw new KrlError(`$${n} exige um FRAME {X,Y,Z,A,B,C}`, loc); const f = { __t: "FRAME" }; POSK.forEach(k => f[k] = val[k] !== undefined ? val[k] : 0); this.sys[n] = f; }
        else { need("number"); this.sys[n][path[0].key] = val; }
        this.h.frames && this.h.frames(this.sys.BASE, this.sys.TOOL);
        this.log("info", `$${n} = {X ${fmt(this.sys[n].X)}, Y ${fmt(this.sys[n].Y)}, Z ${fmt(this.sys[n].Z)}, A ${fmt(this.sys[n].A)}, B ${fmt(this.sys[n].B)}, C ${fmt(this.sys[n].C)}}`, loc);
        return;
      }
      if (n === "GARRA_FORCA" || n === "GARRA_ABERTURA") { need("number"); const lim = n === "GARRA_FORCA" ? [5, 200] : [20, 120]; if (val < lim[0] || val > lim[1]) throw new KrlError(`$${n} deve estar entre ${lim[0]} e ${lim[1]} ${n === "GARRA_FORCA" ? "N" : "mm"}`, loc); if (this.h.gripParam) this.h.gripParam(n === "GARRA_FORCA" ? "forca" : "abertura", val); this.log("info", `$${n} = ${val} ${n === "GARRA_FORCA" ? "N" : "mm"}`, loc); return; }
      if (n === "OV_PRO") { need("number"); this.h.setOverride(Math.max(1, Math.min(100, val))); return; }
      if (["POS_ACT", "AXIS_ACT", "IN", "NULLFRAME"].includes(n)) throw new KrlError(`$${n} é somente leitura`, loc);
      this.sys.misc[n] = val; this.warnOnce("sys" + n, `$${n}: aceito, mas sem efeito no simulador`, loc);
    }
    // ----- pose atual -----
    toolM() { return frameToMat(this.sys.TOOL); }
    baseM() { return frameToMat(this.sys.BASE); }
    curPos(j) { j = j || this.h.getJoints(); return matToFrame(mul(inv(this.baseM()), mul(fk(j).F6, this.toolM()))); }
    flangeFor(pos) { return mul(this.baseM(), mul(frameToMat(pos), inv(this.toolM()))); }
    // ----- planejamento de movimento -----
    resolveTarget(v, kind, loc) {
      const cur = this.h.getJoints();
      if (isAxisAgg(v)) {
        if (kind === "LIN" || kind === "CIRC") throw new KrlError(`${kind} exige ponto cartesiano (E6POS/POS/FRAME), não posição de eixos`, loc);
        const j = AXK.map((k, i) => typeof v[k] === "number" ? v[k] : cur[i]);
        return { j };
      }
      if (isPosAgg(v)) {
        const c = this.curPos(cur), p = {};
        POSK.forEach(k => p[k] = typeof v[k] === "number" ? v[k] : c[k]);
        if (v.S !== undefined || v.T !== undefined) this.warnOnce("ST", "Status/Turn (S, T) ignorados: o simulador escolhe a solução mais próxima da posição atual", loc);
        return { pos: p };
      }
      throw new KrlError("destino de movimento inválido (use E6POS, POS, FRAME, E6AXIS ou AXIS)", loc);
    }
    limitCheck(j, loc) { j.forEach((v, i) => { if (v < LIMITS[i][0] - 1e-6 || v > LIMITS[i][1] + 1e-6) throw new KrlError(`A${i + 1} = ${fmt(v)}° fora do limite de software [${LIMITS[i][0]}, ${LIMITS[i][1]}]`, loc); }); }
    planPTP(jt, loc) {
      const j0 = this.h.getJoints(); this.limitCheck(jt, loc);
      let t = 0; const dmax = Math.max(...jt.map((v, i) => Math.abs(v - j0[i])));
      jt.forEach((v, i) => { t = Math.max(t, Math.abs(v - j0[i]) / (VMAX[i] * this.sys.VEL_AXIS[i + 1] / 100)); });
      const n = Math.max(2, Math.ceil(dmax / 1.5) + 1), keys = [];
      for (let k = 0; k < n; k++) { const u = k / (n - 1); keys.push(j0.map((v, i) => v + (jt[i] - v) * u)); }
      return { keys, duration: Math.max(0.15, t * 1.25) };
    }
    planCart(posFn, n, len, oriDeg, loc, kind) {
      const keys = []; let cur = this.h.getJoints().slice(), sing = false;
      keys.push(cur.slice());
      for (let k = 1; k < n; k++) {
        const u = k / (n - 1), r = ik(this.flangeFor(posFn(u)), cur);
        if (!r.ok) throw new KrlError(`${kind}: trajetória impossível em ${Math.round(u * 100)}% do percurso — ${r.reason}`, loc);
        const jump = Math.max(...r.j.map((v, i) => Math.abs(v - cur[i])));
        if (jump > 25) throw new KrlError(`${kind}: passagem por singularidade (salto de ${fmt(Math.round(jump))}° nos eixos do punho). Use PTP ou altere a orientação.`, loc);
        if (r.singular) sing = true;
        keys.push(r.j); cur = r.j;
      }
      if (sing) this.log("warn", `${kind}: trajetória passa perto de singularidade de punho (A5 ≈ 0°)`, loc);
      const v = this.sys.VEL.CP * 1000, vo = this.sys.VEL.ORI1;
      return { keys, duration: Math.max(0.15, Math.max(len / v, oriDeg / vo) * 1.2) };
    }
    planLIN(target, loc) {
      const c = this.curPos(), M0 = frameToMat(c), M1 = frameToMat(target);
      const q0 = matToQuat(M0), q1 = matToQuat(M1);
      const p0 = [c.X, c.Y, c.Z], p1 = [target.X, target.Y, target.Z];
      const len = Math.hypot(p1[0] - p0[0], p1[1] - p0[1], p1[2] - p0[2]), ori = quatAngle(q0, q1);
      const n = Math.max(12, Math.ceil(len / 4), Math.ceil(ori / 1.5)) + 1;
      return this.planCart(u => matToFrame(quatToMat(slerp(q0, q1, u), p0.map((v, i) => v + (p1[i] - v) * u))), n, len, ori, loc, "LIN");
    }
    planCIRC(aux, target, loc) {
      const c = this.curPos(), P1 = [c.X, c.Y, c.Z], P2 = [aux.X, aux.Y, aux.Z], P3 = [target.X, target.Y, target.Z];
      const sub = (a, b) => a.map((v, i) => v - b[i]), dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
      const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
      const u = sub(P2, P1), v = sub(P3, P1), w = cross(u, v), ww = dot(w, w);
      if (ww < 1e-3) throw new KrlError("CIRC: ponto inicial, auxiliar e final estão alinhados (ou coincidem) — não definem um círculo", loc);
      const t1 = cross(v, w).map(x => x * dot(u, u)), t2 = cross(w, u).map(x => x * dot(v, v));
      const C = P1.map((p, i) => p + (t1[i] + t2[i]) / (2 * ww));
      const R = Math.hypot(...sub(P1, C)), e1 = sub(P1, C).map(x => x / R), nrm = w.map(x => x / Math.sqrt(ww)), e2 = cross(nrm, e1);
      let th = Math.atan2(dot(sub(P3, C), e2), dot(sub(P3, C), e1)); if (th <= 0) th += 2 * Math.PI;
      const q0 = matToQuat(frameToMat(c)), q1 = matToQuat(frameToMat(target)), ori = quatAngle(q0, q1);
      const len = R * th, n = Math.max(24, Math.ceil(len / 4)) + 1;
      this.log("info", `CIRC: raio ${fmt(Math.round(R * 10) / 10)} mm, arco de ${fmt(Math.round(th * R2D))}°`, loc);
      return this.planCart(s => { const a = th * s, p = C.map((cc, i) => cc + R * (Math.cos(a) * e1[i] + Math.sin(a) * e2[i])); return matToFrame(quatToMat(slerp(q0, q1, s), p)); }, n, len, ori, loc, "CIRC");
    }
    async move(plan, loc, label) {
      const toolM = this.toolM();
      let cut = null;
      for (let k = 0; k < plan.keys.length; k++) { const col = checkCollision(plan.keys[k], toolM); if (col) { cut = { k, col }; break; } }
      if (cut) { plan = { keys: plan.keys.slice(0, Math.max(1, cut.k)), duration: plan.duration * Math.max(1, cut.k) / plan.keys.length }; }
      if (plan.keys.length > 1) { if (this.h.dry) this.h.setJoints(plan.keys[plan.keys.length - 1]); else await this.h.animate(plan, label); }
      this.totalTime = (this.totalTime || 0) + plan.duration; this.motions = (this.motions || 0) + 1;
      this.h.moved && this.h.moved(label, this.curPos(), !!cut);
      if (cut) { this.h.collision && this.h.collision(cut.col.obstacle.id); throw new KrlError(`COLISÃO: ${cut.col.part} do robô atingiu ${cut.col.obstacle.nome}. Movimento interrompido.`, loc); }
    }
    // ----- controle de execução -----
    async gate(s) {
      if (this.state === "stopping") throw new Signal("stop");
      this.h.line(s.loc, s.text);
      if (!this.h.dry && (this.stepMode || this.state === "paused")) { this.state = "paused"; this.h.status("paused"); await new Promise(r => this.stepGo = r); this.stepGo = null; if (this.state === "stopping") throw new Signal("stop"); this.state = "running"; this.h.status("running"); }
      if (++this.stmtCount % 400 === 0) await new Promise(r => setTimeout(r, 0));
      if (this.h.dry && this.stmtCount > (this.h.maxStmts || 20000)) throw new KrlError(`análise interrompida após ${this.h.maxStmts || 20000} instruções (laço infinito? normal em programas com LOOP)`, s.loc);
      await this.checkInts();
    }
    async checkInts() {
      if (this.inInt) return;
      for (const [n, it] of Object.entries(this.ints)) {
        if (!it.on) continue;
        let v; try { v = this.eval(it.cond, it.scope, it.loc); } catch (e) { v = false; }
        if (v === true && !it.prev) { it.prev = true; this.log("info", `INTERRUPT ${n} disparado → ${it.call.name}()`, it.loc); this.inInt = true; try { await this.callRoutine(it.call, it.scope, it.loc); } finally { this.inInt = false; } }
        else if (v !== true) it.prev = false;
      }
    }
    pause() { if (this.state === "running") this.state = "paused"; }
    resume() { this.stepMode = false; if (this.stepGo) this.stepGo(); else if (this.state === "paused") this.state = "running"; }
    step() { this.stepMode = true; if (this.stepGo) this.stepGo(); }
    stop() { this.state = "stopping"; if (this.stepGo) this.stepGo(); }
    async sleep(sec) { if (this.h.dry) { this.totalTime = (this.totalTime || 0) + sec; return; } let left = sec * 1000; while (left > 0) { if (this.state === "stopping") throw new Signal("stop"); const dt = Math.min(50, left); await new Promise(r => setTimeout(r, dt)); if (this.state !== "paused") left -= dt; } }
    async run(entry) {
      const mod = this.mod; const name = entry || mod.order[0];
      this.state = "running"; this.stepMode = !!this.startStepping; this.h.status("running");
      try {
        for (const d of mod.dat) { if (d.compat) { this.modScope[d.name] = d.init ? this.eval(d.init, null, d.loc) : {}; continue; } this.declare(d, this.modScope); }
        for (const k of Object.keys(PREDEF)) if (!(k in this.modScope)) { this.modScope[k] = PREDEF[k] === "E6AXIS" ? { __t: "E6AXIS", A1: 0, A2: -90, A3: 90, A4: 0, A5: 0, A6: 0 } : {}; (this.modScope.__types || (this.modScope.__types = {}))[k] = PREDEF[k]; }
        this.h.points && this.h.points(this.modScope);
        await this.callRoutine({ name, args: [] }, null, mod.defs[name].loc);
        this.log("ok", `Programa ${mod.defs[name].display} concluído.`);
        return "done";
      } catch (e) {
        if (e instanceof Signal) { if (e.kind === "stop") { this.log("warn", "Execução interrompida pelo operador."); return "stopped"; } if (e.kind === "exit") return "done"; }
        if (e instanceof KrlError) { this.log("err", e.message, e.loc); this.h.errorLine && this.h.errorLine(e.loc); return "error"; }
        this.log("err", "Erro interno do simulador: " + e.message); console.error(e); return "error";
      } finally { this.state = "idle"; this.h.status("idle"); }
    }
    async callRoutine(call, scope, loc) {
      const def = this.mod.defs[call.name];
      if (!def) {
        if (call.name === "BAS") return this.bas(call, scope, loc);
        if (COMPAT_CALLS.includes(call.name)) { this.warnOnce("cc" + call.name, `${call.name}() é rotina do sistema KUKA — ignorada no simulador`, loc); return; }
        throw new KrlError(`subprograma ${call.name}() não encontrado`, loc);
      }
      if (call.args.length !== def.params.length) throw new KrlError(`${def.display}() espera ${def.params.length} parâmetro(s) e recebeu ${call.args.length}`, loc);
      const local = { __types: {} };
      def.params.forEach((p, k) => local[p] = clone(this.eval(call.args[k], scope, loc)));
      if (this.depth = (this.depth || 0) + 1, this.depth > 50) throw new KrlError("profundidade de chamadas excedida (recursão infinita?)", loc);
      try { await this.block(def.body, local); }
      catch (e) { if (!(e instanceof Signal && e.kind === "return")) throw e; }
      finally { this.depth--; }
    }
    bas(call, scope, loc) {
      const a = call.args.map(x => this.eval(x, scope, loc));
      switch (a[0]) {
        case "#INITMOV": this.ini(loc); return;
        case "#PTP_PARAMS": for (let k = 1; k <= 6; k++) this.sys.VEL_AXIS[k] = Math.max(1, Math.min(100, a[1])); return;
        case "#CP_PARAMS": this.sys.VEL.CP = Math.max(0.001, Math.min(2, a[1])); return;
        default: this.warnOnce("bas" + a[0], `BAS(${a[0]}) não simulado — ignorado`, loc);
      }
    }
    ini(loc) { for (let k = 1; k <= 6; k++) { this.sys.VEL_AXIS[k] = 100; this.sys.ACC_AXIS[k] = 100; } this.sys.VEL.CP = 0.3; this.log("info", "INI: velocidades e acelerações padrão carregadas", loc); }
    async block(stmts, scope) { for (const s of stmts) await this.exec(s, scope); }
    async exec(s, scope) {
      if (s.k === "BLOCK") { for (const d of s.stmts) this.declare(d, scope); return; }
      await this.gate(s);
      const ev = e => this.eval(e, scope, s.loc), bool = e => { const v = ev(e); if (typeof v !== "boolean") throw new KrlError("a condição deve resultar em BOOL", s.loc); return v; };
      switch (s.k) {
        case "NOP": return;
        case "UNSUP": this.log("warn", `${s.what} ignorado (não suportado)`, s.loc); return;
        case "INI": this.ini(s.loc); return;
        case "ASSIGN": this.assign(s.lhs, ev(s.e), scope, s.loc); return;
        case "CALL": return this.callRoutine(s.call, scope, s.loc);
        case "IF": return this.block(bool(s.cond) ? s.then : s.els, scope);
        case "WHILE": try { while (bool(s.cond)) await this.block(s.body, scope); } catch (e) { if (!(e instanceof Signal && e.kind === "exit")) throw e; } return;
        case "REPEAT": try { do { await this.block(s.body, scope); } while (!bool(s.cond)); } catch (e) { if (!(e instanceof Signal && e.kind === "exit")) throw e; } return;
        case "LOOP": try { for (;;) await this.block(s.body, scope); } catch (e) { if (!(e instanceof Signal && e.kind === "exit")) throw e; } return;
        case "FOR": {
          const from = ev(s.from), to = ev(s.to), step = ev(s.step);
          if (![from, to, step].every(Number.isFinite)) throw new KrlError("FOR exige valores inteiros", s.loc);
          if (step === 0) throw new KrlError("STEP não pode ser 0", s.loc);
          const v = { n: "var", name: s.v };
          try { for (let x = from; step > 0 ? x <= to : x >= to; x += step) { this.assign(v, x, scope, s.loc); await this.block(s.body, scope); } }
          catch (e) { if (!(e instanceof Signal && e.kind === "exit")) throw e; }
          return;
        }
        case "SWITCH": { const v = ev(s.sel); for (const c of s.cases) if (c.vals.some(x => ev(x) === v)) return this.block(c.body, scope); if (s.def) return this.block(s.def, scope); return; }
        case "EXIT": throw new Signal("exit");
        case "RETURN": throw new Signal("return");
        case "HALT": if (this.h.dry) { this.log("info", "Análise: HALT ignorado", s.loc); return; } this.log("warn", "HALT: programa pausado. Clique em Continuar.", s.loc); this.state = "paused"; this.h.status("paused"); await new Promise(r => this.stepGo = r); this.stepGo = null; if (this.state === "stopping") throw new Signal("stop"); this.state = "running"; this.h.status("running"); return;
        case "WAITSEC": { const t = ev(s.e); if (typeof t !== "number" || t < 0) throw new KrlError("WAIT SEC exige tempo ≥ 0", s.loc); return this.sleep(t); }
        case "WAITFOR": {
          if (this.h.dry) { this.h.waitEvent && this.h.waitEvent(s.text); if (!bool(s.e)) this.log("info", `Análise: ${s.text.trim()} considerado satisfeito`, s.loc); return; }
          this.h.waitEvent && this.h.waitEvent(s.text);
          if (!bool(s.e)) { this.log("info", `Aguardando condição: ${s.text.replace(/^WAIT\s+FOR\s+/i, "")} — ative a entrada no painel de E/S`, s.loc); this.h.waiting && this.h.waiting(true); while (!bool(s.e)) { await this.sleep(0.05); await this.checkInts(); } this.h.waiting && this.h.waiting(false); }
          return;
        }
        case "INTDECL": { const n = ev(s.num); this.ints[n] = { cond: s.cond, call: s.call, scope, loc: s.loc, on: false, prev: false }; return; }
        case "INTSW": { if (s.num) { const n = ev(s.num); if (!this.ints[n]) { this.warnOnce("int" + n, `INTERRUPT ${n} não declarado`, s.loc); return; } this.ints[n].on = s.on; } else Object.values(this.ints).forEach(it => it.on = s.on); return; }
        case "PTP": case "PTP_REL": {
          let v = ev(s.e), plan;
          if (s.k === "PTP_REL") v = this.relTarget(v, s, "PTP");
          const t = this.resolveTarget(v, "PTP", s.loc);
          if (t.j) plan = this.planPTP(t.j, s.loc);
          else { const r = ik(this.flangeFor(t.pos), this.h.getJoints()); if (!r.ok) throw new KrlError(`PTP: ponto inalcançável — ${r.reason}`, s.loc); if (r.singular) this.log("warn", "PTP: ponto de destino em singularidade de punho (A5 ≈ 0°)", s.loc); plan = this.planPTP(r.j, s.loc); }
          return this.move(plan, s.loc, s.text);
        }
        case "LIN": case "LIN_REL": {
          let v = ev(s.e); if (s.k === "LIN_REL") v = this.relTarget(v, s, "LIN");
          const t = this.resolveTarget(v, "LIN", s.loc);
          return this.move(this.planLIN(t.pos, s.loc), s.loc, s.text);
        }
        case "CIRC": {
          const a = this.resolveTarget(ev(s.aux), "CIRC", s.loc), t = this.resolveTarget(ev(s.e), "CIRC", s.loc);
          return this.move(this.planCIRC(a.pos, t.pos, s.loc), s.loc, s.text);
        }
      }
      throw new KrlError("instrução não executável", s.loc);
    }
    relTarget(v, s, kind) {
      if (isAxisAgg(v)) { if (kind === "LIN") throw new KrlError("LIN_REL exige deslocamento cartesiano {X,Y,Z,A,B,C}", s.loc); const j = this.h.getJoints(); const o = { __t: "E6AXIS" }; AXK.forEach((k, i) => o[k] = j[i] + (v[k] || 0)); return o; }
      if (!isPosAgg(v)) throw new KrlError(`${s.k}: deslocamento inválido`, s.loc);
      const c = this.curPos(), Mc = frameToMat(c), d = {}; POSK.forEach(k => d[k] = v[k] || 0);
      let M;
      if (s.frame === "TOOL") M = mul(Mc, frameToMat(d));
      else { const Rr = frameToMat({ A: d.A, B: d.B, C: d.C }); M = mul(Rr, rotOnly(Mc)); M[3] = c.X + d.X; M[7] = c.Y + d.Y; M[11] = c.Z + d.Z; }
      return Object.assign({ __t: "E6POS" }, matToFrame(M));
    }
  }

  function evalExpr(machine, text) { const loc = { file: "var", line: 1 }; return machine.eval(parseExprToks(tokenize(text, loc), loc), null, loc); }
  return { evalExpr, GEO, LIMITS, HOME, DEFAULT_TOOL, setObstacles, getObstacles, quatToMat, matToQuat, fk, ik, mul, inv, frameToMat, matToFrame, parse, Machine, KrlError, checkCollision, tokenize, D2R, R2D };
})();
if (typeof module !== "undefined") module.exports = RL;
