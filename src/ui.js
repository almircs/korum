// ===================================================================
//  Korum — interface (empacotada com esbuild em app/ui.bundle.js)
// ===================================================================
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import JSZip from "jszip";
import { initKCP } from "./kcp.js";

const $ = id => document.getElementById(id);
const fmt = (v, d = 1) => (Math.abs(v) < 0.05 && d <= 1 ? 0 : v).toFixed(d);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const clone = o => JSON.parse(JSON.stringify(o));
const now = () => new Date().toISOString();
const dt = iso => { const d = new Date(iso); return d.toLocaleDateString("pt-BR") + " " + d.toTimeString().slice(0, 5); };
const APP_VERSION = (window.korum && window.korum.version) || "1.0.0";

// ======================= PLATAFORMA (Electron ou navegador) =======================
const K = window.korum || null;
const platform = {
  async load() { if (K) return await K.load(); try { return localStorage.getItem("korum-store"); } catch (e) { return null; } },
  save(json) { if (K) return K.saveSync(json); try { localStorage.setItem("korum-store", json); return true; } catch (e) { return false; } },
  async saveFile(name, data) {
    if (K) return K.saveFile(name, data, store.settings.backupDir || "");
    const blob = new Blob([data]); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); return { saved: true, path: name };
  },
  async chooseDir() { return K ? K.chooseDir() : null; },
  openData() { if (K) K.openDataFolder(); else toast("Disponível no aplicativo instalado"); },
  async ai(req) {
    if (K) return K.ai(req);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": req.apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: req.model, max_tokens: 2000, system: req.system, messages: req.messages }) });
      const j = await r.json(); if (!r.ok) return { error: (j.error && j.error.message) || ("HTTP " + r.status) };
      return { text: (j.content || []).filter(c => c.type === "text").map(c => c.text).join("\n") };
    } catch (e) { return { error: e.message }; }
  },
};

// ======================= ARMAZENAMENTO =======================
const DEFAULT_MODEL = "claude-sonnet-5-5";
let store = { v: 1, settings: { theme: "escuro", apiKey: "", model: DEFAULT_MODEL, backupDir: "" }, projects: [], currentId: null, progress: { lessons: {}, exercises: {} } };
const CATS = ["Movimentação básica", "Manipulação de peças", "Pick and Place", "Paletização", "Soldagem", "Operações de montagem", "Inspeção", "Alimentação de máquinas", "Integração com sensores", "Aplicações avançadas", "Exercícios", "Importados"];
const cur = () => store.projects.find(p => p.id === store.currentId);
function newProject({ name, cat, src, dat, scene, exercise }) {
  const p = { id: uid(), name, cat: cat || "Movimentação básica", src, dat, scene: clone(scene || SCENES.pick), blocks: null, original: null, versions: [], created: now(), updated: now(), exercise: exercise || null };
  p.versions.push({ id: uid(), date: now(), note: "Criação do projeto", src, dat });
  store.projects.unshift(p); return p;
}
let saveT = null;
function markDirty() { const p = cur(); if (p) p.updated = now(); clearTimeout(saveT); saveT = setTimeout(persist, 600); }
function persist() {
  clearTimeout(saveT);
  const ok = platform.save(JSON.stringify(store));
  $("saved").textContent = ok ? "salvo " + new Date().toTimeString().slice(0, 5) : "⚠ falha ao salvar";
  $("saved").style.color = ok ? "" : "var(--err)";
}
window.addEventListener("beforeunload", () => { if (saveT) persist(); });
function saveVersion(note, force) {
  const p = cur(); if (!p) return false;
  const last = p.versions[p.versions.length - 1];
  if (!force && last && last.src === p.src && last.dat === p.dat) return false;
  p.versions.push({ id: uid(), date: now(), note, src: p.src, dat: p.dat });
  if (p.versions.length > 80) p.versions.splice(1, p.versions.length - 80);
  markDirty(); return true;
}

// ======================= UTILITÁRIOS DE UI =======================
function log(lvl, msg, loc) {
  const d = document.createElement("div"); d.className = lvl;
  const L = { info: "INFO", ok: "OK", warn: "AVISO", err: "ERRO", run: "EXEC" }[lvl] || lvl;
  d.innerHTML = `<time>${new Date().toTimeString().slice(0, 8)}</time><span class="lv">${L}</span>`;
  if (loc && loc.line) { const a = document.createElement("a"); a.textContent = `${loc.file === "dat" ? "dat" : "src"}:${loc.line}`; a.onclick = () => { showPane("prog"); gotoLine(loc); }; d.appendChild(a); }
  const m = document.createElement("span"); m.className = "lm"; m.textContent = msg; d.appendChild(m);
  const box = $("log"); box.appendChild(d); while (box.children.length > 800) box.firstChild.remove(); box.scrollTop = box.scrollHeight;
  if (S.onLog) S.onLog(lvl, msg, loc);
  if (store.settings.nivel === "iniciante" && (lvl === "err" || (lvl === "info" && /Aguardando condição/.test(msg)))) { const hnt = HINTS.find(x => x[0].test(msg)); if (hnt) setTimeout(() => log("ok", "💡 Dica: " + hnt[1]), 0); }
  S.logTail.push(`${L}${loc && loc.line ? ` (${loc.file}:${loc.line})` : ""}: ${msg}`); if (S.logTail.length > 30) S.logTail.shift();
}
let toastT; function toast(m) { const t = $("toast"); t.textContent = m; t.style.display = "block"; clearTimeout(toastT); toastT = setTimeout(() => t.style.display = "none", 2400); }
function ask(title, html, buttons) { // buttons: [{label, value, pri, danger}]
  return new Promise(res => {
    $("askTitle").textContent = title; $("askBody").innerHTML = html; const f = $("askFoot"); f.innerHTML = "";
    for (const b of buttons) { const el = document.createElement("button"); el.textContent = b.label; if (b.pri) el.className = "pri"; if (b.danger) el.className = "danger"; el.onclick = () => { $("mAsk").classList.remove("on"); res(b.value); }; f.appendChild(el); }
    $("mAsk").classList.add("on");
  });
}
document.querySelectorAll("[data-close]").forEach(b => b.onclick = () => b.closest(".modal").classList.remove("on"));
document.querySelectorAll(".modal").forEach(m => m.addEventListener("click", e => { if (e.target === m && m.id !== "mAsk" && m.id !== "mNivel") m.classList.remove("on"); }));

// ======================= ESTADO DA SESSÃO =======================
const S = { joints: RL.HOME.slice(), file: "src", ins: new Array(9).fill(false), outs: new Array(65).fill(false), pov: 100,
  machine: null, running: false, curLine: null, errLine: null, warnLines: new Set(), tool: { ...RL.DEFAULT_TOOL }, base: { X: 0, Y: 0, Z: 0, A: 0, B: 0, C: 0 },
  events: [], logTail: [], chat: [], pane: "prog", exTargets: [] };

// ======================= NAVEGAÇÃO =======================
function showPane(p) {
  const wasK = S.pane === "kcp"; S.pane = p;
  if ((p === "kcp") !== wasK) { document.body.classList.toggle("kcp", p === "kcp"); const r = document.documentElement;
    if (p === "kcp") { S.leftSaved = r.style.getPropertyValue("--left"); r.style.setProperty("--left", "760px"); } else r.style.setProperty("--left", S.leftSaved || "440px");
    setTimeout(resize, 30); }
  if (p === "kcp" && S.kcpShow) S.kcpShow();
  document.querySelectorAll("#nav button[data-p]").forEach(b => b.classList.toggle("on", b.dataset.p === p));
  document.querySelectorAll(".pane").forEach(el => el.classList.toggle("on", el.id === "p-" + p));
  if (p === "prog") { render(); }
  if (p === "blocos") openBlocks();
  if (p === "projetos") renderProjects();
  if (p === "cursos") renderCourses();
  if (p === "exerc") renderExercises();
  if (p === "cena") renderSceneEditor();
  if (p === "analise") renderRevInfo();
  if (p === "ia") renderChat();
  if (p === "config") renderConfig();
  if (p === "inicio") renderTour();
  if (p === "traj") { trRender(); trDraw(); } else { if (typeof setMarking === "function" && trMarking) setMarking(false); if (typeof trInfo === "function") trInfo(); }
}
document.querySelectorAll("#nav button[data-p]").forEach(b => b.onclick = () => showPane(b.dataset.p));

// ======================= EDITOR KRL =======================
const ta = $("ta"), hl = $("hl"), gut = $("gut");
const KW = new Set("DEF END DEFDAT ENDDAT DECL GLOBAL CONST IF THEN ELSE ENDIF FOR TO STEP ENDFOR WHILE ENDWHILE REPEAT UNTIL LOOP ENDLOOP SWITCH CASE DEFAULT ENDSWITCH EXIT RETURN WAIT SEC HALT INTERRUPT WHEN DO ON OFF INI AND OR NOT EXOR EXT BRAKE GOTO".split(" "));
const MV = new Set("PTP LIN CIRC PTP_REL LIN_REL SPLINE SPL SLIN SCIRC SPTP C_PTP C_DIS C_VEL C_ORI".split(" "));
const TY = new Set("INT REAL BOOL CHAR E6POS POS FRAME E6AXIS AXIS FDAT PDAT LDAT".split(" "));
function hlLine(s) {
  if (/^\s*&/.test(s)) return `<span class="c">${esc(s)}</span>`;
  let code = s, com = "", q = false;
  for (let i = 0; i < s.length; i++) { if (s[i] === '"') q = !q; else if (s[i] === ";" && !q) { code = s.slice(0, i); com = s.slice(i); break; } }
  const out = code.replace(/("[^"]*")|(#\w+)|(\$\w+)|(\b\d+\.?\d*\b)|([A-Za-z_]\w*)|([<>&])/g, (m, st, en, sy, nu, id, sp) => {
    if (st) return `<span class="s">${esc(st)}</span>`; if (en) return `<span class="e">${en}</span>`; if (sy) return `<span class="v">${sy}</span>`;
    if (nu) return `<span class="n">${nu}</span>`; if (sp) return esc(sp);
    const u = id.toUpperCase();
    if (MV.has(u)) return `<span class="m">${id}</span>`; if (KW.has(u)) return `<span class="k">${id}</span>`; if (TY.has(u)) return `<span class="t">${id}</span>`;
    if (u === "TRUE" || u === "FALSE") return `<span class="n">${id}</span>`;
    return id;
  });
  return out + (com ? `<span class="c">${esc(com)}</span>` : "");
}
function render() {
  const lines = ta.value.split("\n"), f = S.file;
  const c = S.curLine && S.curLine.file === f ? S.curLine.line : -1, er = S.errLine && S.errLine.file === f ? S.errLine.line : -1;
  hl.innerHTML = lines.map((l, i) => `<div class="${i + 1 === c ? "cur" : ""}${i + 1 === er ? " errl" : ""}">${hlLine(l) || " "}</div>`).join("") + "<div></div>".repeat(8);
  gut.innerHTML = lines.map((l, i) => `<div class="${i + 1 === c ? "cur" : ""}${i + 1 === er ? " errl" : ""}${S.warnLines.has(f + (i + 1)) ? " wrn" : ""}">${i + 1}</div>`).join("") + "<div></div>".repeat(8);
  sync();
}
function sync() { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; gut.scrollTop = ta.scrollTop; }
ta.addEventListener("scroll", sync);
let ptT;
ta.addEventListener("input", () => { const p = cur(); if (!p) return; p[S.file] = ta.value; S.errLine = null; render(); updateNames(); markDirty(); clearTimeout(ptT); ptT = setTimeout(previewPoints, 500); });
ta.addEventListener("keydown", e => { if (e.key === "Tab") { e.preventDefault(); ta.setRangeText("  ", ta.selectionStart, ta.selectionEnd, "end"); ta.dispatchEvent(new Event("input")); } });
document.addEventListener("keydown", e => {
  if (e.key === "F5") { e.preventDefault(); runProgram(false); }
  if (e.key === "F10") { e.preventDefault(); runProgram(true); }
  if (e.key === "Escape") document.querySelectorAll(".modal.on").forEach(m => m.id !== "mAsk" && m.id !== "mNivel" && m.classList.remove("on"));
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); if (saveVersion("Salvo manualmente")) toast("Versão salva no histórico"); persist(); }
});
function setFile(f) { S.file = f; const p = cur(); ta.value = p ? p[f] : ""; $("tabSrc").classList.toggle("on", f === "src"); $("tabDat").classList.toggle("on", f === "dat"); render(); ta.scrollTop = 0; sync(); }
$("tabSrc").onclick = () => setFile("src"); $("tabDat").onclick = () => setFile("dat");
function gotoLine(loc, select = true) {
  if (loc.file !== S.file) setFile(loc.file);
  const lines = ta.value.split("\n"), top = (loc.line - 1) * 20;
  if (top < ta.scrollTop + 20 || top > ta.scrollTop + ta.clientHeight - 60) { ta.scrollTop = Math.max(0, top - ta.clientHeight / 3); sync(); }
  if (select) { let p = 0; for (let i = 0; i < loc.line - 1; i++) p += lines[i].length + 1; ta.focus(); ta.setSelectionRange(p, p + (lines[loc.line - 1] || "").length); }
}
const progName = src => { const m = (src || "").match(/^\s*(?:GLOBAL\s+)?DEF\s+([A-Za-z_]\w*)/im); return m ? m[1] : "programa"; };
function updateNames() { const p = cur(); const n = progName(p && p.src); $("tabSrc").textContent = n + ".src"; $("tabDat").textContent = n + ".dat"; }
function openProject(id) {
  if (S.running) return toast("Pare a execução antes de trocar de projeto");
  store.currentId = id; const p = cur(); if (!p) return;
  $("projName").value = p.name; S.errLine = null; S.curLine = null; S.warnLines.clear();
  setFile("src"); updateNames(); applyScene(p.scene); resetCell(true); previewPoints();
  S.exTargets = p.exercise ? (EXERCISES.find(x => x.id === p.exercise) || {}).alvos || [] : []; showTargets();
  trSel = -1; trDraw(); if (S.pane === "traj") trRender();
  markDirty();
}
$("projName").onchange = () => { const p = cur(); if (p) { p.name = $("projName").value.trim() || "Sem nome"; markDirty(); } };

// ======================= CENA 3D =======================
const view = $("view");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
view.prepend(renderer.domElement);
const css = new CSS2DRenderer(); css.domElement.style.cssText = "position:absolute;top:0;left:0;pointer-events:none"; view.appendChild(css.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 50);
const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.addEventListener("start", () => S.camMoved = true); controls.dampingFactor = 0.12;
scene.add(new THREE.HemisphereLight(0xdfe8ff, 0x1a1d22, 1.1));
const sun = new THREE.DirectionalLight(0xffffff, 2.2); sun.position.set(2.5, 4, 2); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -2, right: 2, top: 2, bottom: -2, near: 0.5, far: 10 }); sun.shadow.bias = -0.0005; scene.add(sun);
const fill = new THREE.DirectionalLight(0x9fb8ff, 0.6); fill.position.set(-2, 1.5, -2); scene.add(fill);
let grid = null;
function sceneTheme(t) {
  const dark = t !== "claro";
  scene.background = new THREE.Color(dark ? 0x0e1115 : 0xdfe5ec); scene.fog = new THREE.Fog(dark ? 0x0e1115 : 0xdfe5ec, 5, 11);
  if (grid) scene.remove(grid); grid = dark ? new THREE.GridHelper(4, 40, 0x3a4350, 0x232a33) : new THREE.GridHelper(4, 40, 0x9aa6b3, 0xc3ccd6); scene.add(grid);
  view.style.background = dark ? "#0c0f13" : "#dfe5ec";
}
const floor = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), new THREE.ShadowMaterial({ opacity: 0.3 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
const root = new THREE.Group(); root.rotation.x = -Math.PI / 2; root.scale.setScalar(0.001); scene.add(root);
const mat = {
  orange: new THREE.MeshStandardMaterial({ color: 0xf26a10, roughness: 0.42, metalness: 0.15 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x2b3037, roughness: 0.6, metalness: 0.3 }),
  black: new THREE.MeshStandardMaterial({ color: 0x15181c, roughness: 0.7, metalness: 0.2 }),
  steel: new THREE.MeshStandardMaterial({ color: 0xa9b3bd, roughness: 0.3, metalness: 0.8 }),
  table: new THREE.MeshStandardMaterial({ color: 0x5b6672, roughness: 0.7, metalness: 0.2 }),
  top: new THREE.MeshStandardMaterial({ color: 0x8c97a3, roughness: 0.5, metalness: 0.3 }),
  belt: new THREE.MeshStandardMaterial({ color: 0x1d2126, roughness: 0.9 }),
  stripe: new THREE.MeshStandardMaterial({ color: 0x2c3138 }),
  yellow: new THREE.MeshStandardMaterial({ color: 0xe8b420, roughness: 0.5 }),
  wood: new THREE.MeshStandardMaterial({ color: 0xb08350, roughness: 0.85 }),
  machine: new THREE.MeshStandardMaterial({ color: 0x6f8597, roughness: 0.5, metalness: 0.3 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x1b2a36, roughness: 0.15, metalness: 0.6 }),
  part: new THREE.MeshStandardMaterial({ color: 0x3f86d6, roughness: 0.35, metalness: 0.4 }),
  hit: new THREE.MeshStandardMaterial({ color: 0xff3b3b, emissive: 0x661010 }),
};
function mesh(geo, m, parent, pos, rot) { const o = new THREE.Mesh(geo, m); o.castShadow = o.receiveShadow = true; if (pos) o.position.set(...pos); if (rot) o.rotation.set(...rot); parent.add(o); return o; }
const cylZ = (r, h, s = 40) => new THREE.CylinderGeometry(r, r, h, s).rotateX(Math.PI / 2);
const cylY = (r, h, s = 40) => new THREE.CylinderGeometry(r, r, h, s);
const cylX = (r, h, s = 40) => new THREE.CylinderGeometry(r, r, h, s).rotateZ(Math.PI / 2);
const box = (x, y, z) => new THREE.BoxGeometry(x, y, z);
function rbox(x, y, z, r) {
  const s = new THREE.Shape(), w = x / 2, h = z / 2; r = Math.min(r, w, h);
  s.moveTo(-w + r, -h); s.lineTo(w - r, -h); s.quadraticCurveTo(w, -h, w, -h + r); s.lineTo(w, h - r); s.quadraticCurveTo(w, h, w - r, h); s.lineTo(-w + r, h); s.quadraticCurveTo(-w, h, -w, h - r); s.lineTo(-w, -h + r); s.quadraticCurveTo(-w, -h, -w + r, -h);
  const g = new THREE.ExtrudeGeometry(s, { depth: y, bevelEnabled: true, bevelSize: 6, bevelThickness: 6, bevelSegments: 3, curveSegments: 8 });
  g.translate(0, 0, -y / 2); g.rotateX(Math.PI / 2); return g;
}
function label(parent, txt, p, cls = "lbl", color, k) { const d = document.createElement("div"); d.className = cls; d.textContent = txt; if (color) d.style.color = color; const o = new CSS2DObject(d); o.userData.k = k; o.position.set(...p); parent.add(o); return o; }
// visibilidade das legendas por categoria (aplicada a cada quadro, inclusive em legendas recriadas)
const VIS = { eixo: true, ponto: true, base: true, objeto: true, alvo: true };
const G = RL.GEO;
// ---- robô ----
mesh(box(300, 300, 16), mat.dark, root, [0, 0, 8]);
mesh(cylZ(118, 50), mat.dark, root, [0, 0, 41]);
const g1 = new THREE.Group(); root.add(g1);
mesh(cylZ(104, 150), mat.orange, g1, [0, 0, 141]); mesh(rbox(200, 190, 230, 40), mat.orange, g1, [28, 0, 318]); mesh(cylZ(46, 120), mat.dark, g1, [-95, 0, 270]);
const g2 = new THREE.Group(); g2.position.set(G.a1, 0, G.d1); g1.add(g2);
mesh(cylY(88, 200), mat.orange, g2); mesh(cylY(62, 214), mat.dark, g2); mesh(rbox(G.a2, 82, 112, 30), mat.orange, g2, [G.a2 / 2, 0, 0]); mesh(cylY(50, 70), mat.dark, g2, [0, -135, 0]);
const g3 = new THREE.Group(); g3.position.set(G.a2, 0, 0); g2.add(g3);
mesh(cylY(74, 172), mat.orange, g3); mesh(cylY(52, 184), mat.dark, g3); mesh(rbox(220, 150, 125, 30), mat.orange, g3, [18, 0, 40]); mesh(cylX(44, 80), mat.dark, g3, [-125, 0, 58]);
const g4 = new THREE.Group(); g4.position.set(0, 0, G.a3); g3.add(g4);
mesh(cylX(50, 290), mat.orange, g4, [250, 0, 0]); mesh(box(80, 16, 92), mat.orange, g4, [398, 46, 0]); mesh(box(80, 16, 92), mat.orange, g4, [398, -46, 0]);
const g5 = new THREE.Group(); g5.position.set(G.d4, 0, 0); g4.add(g5);
mesh(cylY(44, 76), mat.orange, g5); mesh(cylY(30, 110), mat.dark, g5);
const g6 = new THREE.Group(); g5.add(g6);
mesh(cylX(38, 52), mat.orange, g6, [32, 0, 0]); mesh(cylX(36, 18), mat.steel, g6, [G.d6 - 9, 0, 0]);
const flange = new THREE.Group(); flange.position.set(G.d6, 0, 0); g6.add(flange);
const tool = new THREE.Group(); flange.add(tool);
mesh(box(45, 74, 54), mat.black, tool, [22.5, 0, 0]);
const fA = mesh(box(85, 12, 30), mat.steel, tool, [87.5, 51, 0]), fB = mesh(box(85, 12, 30), mat.steel, tool, [87.5, -51, 0]);
const tcpMark = new THREE.Group(); tcpMark.matrixAutoUpdate = false; flange.add(tcpMark);
const tcpAxes = new THREE.AxesHelper(70); tcpAxes.material.depthTest = false; tcpAxes.renderOrder = 5; tcpMark.add(tcpAxes);
const grip = { target: 56, cur: 56 };
const axLabels = [[g1, [0, 0, 230]], [g2, [0, -120, 0]], [g3, [0, -105, 0]], [g4, [150, 0, 60]], [g5, [0, -70, 0]], [g6, [50, 0, 50]]].map(([g, p], i) => label(g, "A" + (i + 1), p, "lbl", null, "eixo"));
const baseAxes = new THREE.Group(); root.add(baseAxes);
function arrow(dir, color, txt) {
  baseAxes.add(new THREE.ArrowHelper(new THREE.Vector3(...dir), new THREE.Vector3(0, 0, 2), 260, color, 40, 22));
  label(baseAxes, txt, [dir[0] * 300, dir[1] * 300, dir[2] * 300 + 2], "lbl ax", "#" + color.toString(16).padStart(6, "0"), "base");
}
arrow([1, 0, 0], 0xff5a5a, "X"); arrow([0, 1, 0], 0x43c37a, "Y"); arrow([0, 0, 1], 0x5aa9ff, "Z");

// ---- cenário dinâmico ----
let cellGroup = new THREE.Group(); root.add(cellGroup);
const obMeshes = {}; let parts = []; let held = null, gripClosed = false;
function buildObject(o, id, grp) {
  const { x, y, w, d, h } = o; const ms = [];
  if (o.tipo === "mesa") {
    ms.push(mesh(box(w, d, 20), mat.top, grp, [x, y, h - 10]));
    for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) ms.push(mesh(box(24, 24, h - 20), mat.table, grp, [x + dx * (w / 2 - 20), y + dy * (d / 2 - 20), (h - 20) / 2]));
  } else if (o.tipo === "esteira") {
    ms.push(mesh(box(w, Math.max(10, d - 40), h - 30), mat.table, grp, [x, y, (h - 30) / 2]));
    ms.push(mesh(box(w, Math.max(10, d - 70), 20), mat.belt, grp, [x, y, h - 10]));
    mesh(box(w, 18, 34), mat.yellow, grp, [x, y - d / 2 + 9, h - 17]); mesh(box(w, 18, 34), mat.yellow, grp, [x, y + d / 2 - 9, h - 17]);
    for (let sx = x - w / 2 + 30; sx < x + w / 2; sx += 70) mesh(box(6, Math.max(10, d - 70), 1), mat.stripe, grp, [sx, y, h + 0.6]);
    if (o.sensor) { mesh(box(6, d - 20, 36), mat.yellow, grp, [x + w / 2 - 3, y, h + 18]); sensorMeshes[id] = mesh(box(14, 14, 14), new THREE.MeshBasicMaterial({ color: 0x444444 }), grp, [x + w / 2 - 30, y + d / 2 - 2, h + 40]); }
    if (o.motor) mesh(cylY(28, 50), mat.dark, grp, [x - w / 2 + 40, y + d / 2 + 25, h - 40]);
  } else if (o.tipo === "palete") {
    const n = Math.max(3, Math.round(w / 60));
    for (let k = 0; k < n; k++) ms.push(mesh(box(Math.min(55, w / n - 8), d, 22), mat.wood, grp, [x - w / 2 + (k + 0.5) * w / n, y, h - 11]));
    for (const dx of [-1, 0, 1]) for (const dy of [-1, 0, 1]) ms.push(mesh(box(70, 70, h - 22), mat.wood, grp, [x + dx * (w / 2 - 35), y + dy * (d / 2 - 35), (h - 22) / 2]));
  } else if (o.tipo === "maquina") {
    ms.push(mesh(box(w, d, h), mat.machine, grp, [x, y, h / 2]));
    mesh(box(w * 0.6, 6, h * 0.45), mat.glass, grp, [x, y - d / 2 - 3, h * 0.55]);
    mesh(box(w, d + 4, 16), mat.yellow, grp, [x, y, h - 8]);
  } else {
    ms.push(mesh(box(w, d, h), mat.steel, grp, [x, y, h / 2]));
  }
  obMeshes[id] = ms;
  label(grp, o.nome, [x, y + (o.tipo === "esteira" ? -d / 2 - 40 : d / 2 + 30), h + 15], "lbl ob", null, "objeto");
}
// dimensões da peça no plano (considera giro de 90° em Z)
function pdim(p) { const s = (p && p.userData.size) || [50, 50, 50], sw = p && Math.abs(Math.sin(p.rotation.z)) > 0.7; return { wx: sw ? s[1] : s[0], wy: sw ? s[0] : s[1], h: s[2] }; }
function surfaceBelow(x, y, excl) {
  let z = 0; const e = pdim(excl);
  for (const o of (cur() ? cur().scene.objetos : [])) if (Math.abs(x - o.x) < o.w / 2 && Math.abs(y - o.y) < o.d / 2) z = Math.max(z, o.h);
  for (const p of parts) if (p !== excl && p !== held && p.parent === root) { const q = p.position, d = pdim(p); if (Math.abs(q.x - x) < (d.wx + e.wx) / 2 - 4 && Math.abs(q.y - y) < (d.wy + e.wy) / 2 - 4) z = Math.max(z, q.z + d.h / 2); }
  return z;
}
// pacote de garrafas com filme (tampas desenhadas no topo)
let packMats = null;
function packMaterials() {
  if (packMats) return packMats;
  const c = document.createElement("canvas"); c.width = 256; c.height = 128; const g = c.getContext("2d");
  g.fillStyle = "#f2700f"; g.fillRect(0, 0, 256, 128);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { g.beginPath(); g.arc(32 + i * 64, 32 + j * 64, 22, 0, 7); g.fillStyle = "#ffd9b8"; g.fill(); g.beginPath(); g.arc(32 + i * 64, 32 + j * 64, 13, 0, 7); g.fillStyle = "#e8e8e8"; g.fill(); }
  g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = 3; g.strokeRect(2, 2, 252, 124);
  const top = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c), roughness: 0.35 });
  const c2 = document.createElement("canvas"); c2.width = 128; c2.height = 64; const h = c2.getContext("2d");
  h.fillStyle = "#e8620a"; h.fillRect(0, 0, 128, 64); h.fillStyle = "#ffffff"; h.fillRect(0, 26, 128, 10); h.fillStyle = "#c94f05"; h.fillRect(0, 0, 128, 4); h.fillRect(0, 60, 128, 4);
  const side = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c2), roughness: 0.3, metalness: 0.05 });
  packMats = [side, side, side, side, top, side]; return packMats;
}
function makePart(x, y, size, tipo, spawned) {
  const s = size || [50, 50, 50];
  const m = mesh(box(s[0], s[1], s[2]), tipo === "pacote" ? packMaterials() : mat.part, root, [x, y, 0]);
  m.userData.size = s; m.userData.spawned = !!spawned; return m;
}
function applyScene(sc) {
  if (held) { held = null; }
  root.remove(cellGroup); cellGroup.traverse(o => { if (o.element) o.element.remove(); });
  parts.forEach(p => { p.parent && p.parent.remove(p); });
  for (const k in obMeshes) delete obMeshes[k];
  cellGroup = new THREE.Group(); root.add(cellGroup);
  const obs = [];
  sc.objetos.forEach((o, i) => { const id = "o" + i; buildObject(o, id, cellGroup); obs.push({ id, nome: o.nome, min: [o.x - o.w / 2, o.y - o.d / 2, 0], max: [o.x + o.w / 2, o.y + o.d / 2, o.h] }); });
  RL.setObstacles(obs);
  parts = [];
  sc.pecas.forEach(pc => { const [x, y, s, tipo] = Array.isArray(pc) ? pc : [pc.x, pc.y, pc.s, pc.tipo]; const m = makePart(x, y, s, tipo, false); m.position.z = surfaceBelow(x, y, m) + m.userData.size[2] / 2; m.userData.home = m.position.toArray(); parts.push(m); });
  convAcc = {};
}
function partPos(p) { const v = p.getWorldPosition(new THREE.Vector3()); root.worldToLocal(v); return { x: v.x, y: v.y, z: v.z }; }
// trajetória
const TRAIL_MAX = 20000, trailPos = new Float32Array(TRAIL_MAX * 3); let trailN = 0, lastTrail = null;
const trailGeo = new THREE.BufferGeometry(); trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3)); trailGeo.setDrawRange(0, 0);
const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 0xffa040 })); trail.frustumCulled = false; root.add(trail);
function pushTrail(p) { if (lastTrail && Math.hypot(p[0] - lastTrail[0], p[1] - lastTrail[1], p[2] - lastTrail[2]) < 2) return; if (trailN >= TRAIL_MAX) return; trailPos.set(p, trailN * 3); trailN++; trailGeo.setDrawRange(0, trailN); trailGeo.attributes.position.needsUpdate = true; lastTrail = p; }
function clearTrail() { trailN = 0; lastTrail = null; trailGeo.setDrawRange(0, 0); }
const reach = new THREE.Mesh(new THREE.SphereGeometry(G.a2 + Math.hypot(G.a3, G.d4) + G.d6 + 110, 48, 24), new THREE.MeshBasicMaterial({ color: 0x5aa9ff, wireframe: true, transparent: true, opacity: 0.12 }));
reach.position.set(0, 0, G.d1); reach.visible = false; root.add(reach);
// pontos e alvos
const ptGroup = new THREE.Group(); root.add(ptGroup); const tgGroup = new THREE.Group(); root.add(tgGroup);
function clearGroup(g) { g.children.slice().forEach(c => { g.remove(c); c.traverse(o => o.element && o.element.remove()); }); }
function showPoints(list) {
  clearGroup(ptGroup);
  for (const p of list) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(9, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffcb6b })); m.position.set(...p.pos); ptGroup.add(m);
    const ax = new THREE.AxesHelper(45); ax.position.set(...p.pos); ax.quaternion.copy(p.q); ptGroup.add(ax);
    label(ptGroup, p.name, [p.pos[0], p.pos[1], p.pos[2] + 28], "lbl", "#ffcb6b", "ponto");
  }
}
function showTargets() {
  clearGroup(tgGroup);
  for (const t of S.exTargets) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(14, 20, 14), new THREE.MeshBasicMaterial({ color: 0x43c37a, transparent: true, opacity: 0.75 })); m.position.set(t.X, t.Y, t.Z); tgGroup.add(m);
    label(tgGroup, "🎯 " + t.nome, [t.X, t.Y, t.Z - 34], "lbl", "#43c37a", "alvo");
  }
}
const m4 = m => { const M = new THREE.Matrix4(); M.set(...m); return M; };
function pointsFromScope(scope) {
  const out = [], baseM = RL.frameToMat(S.base);
  for (const [k, v] of Object.entries(scope)) {
    if (!v || typeof v !== "object" || k.startsWith("__") || k === "HOME" || k === "XHOME") continue;
    if (cur() && (cur().trajeto || []).length && /^T\d+(_APROX)?$/.test(k)) continue; // já desenhados pela aba Trajeto
    let M = null;
    if (["E6POS", "POS", "FRAME"].includes(v.__t) && ["X", "Y", "Z"].every(c => typeof v[c] === "number")) M = RL.mul(baseM, RL.frameToMat(v));
    else if (["E6AXIS", "AXIS"].includes(v.__t) && ["A1", "A2", "A3", "A4", "A5", "A6"].every(c => typeof v[c] === "number")) M = RL.mul(RL.fk(["A1", "A2", "A3", "A4", "A5", "A6"].map(c => v[c])).F6, RL.frameToMat(S.tool));
    if (M) out.push({ name: k, pos: [M[3], M[7], M[11]], q: new THREE.Quaternion().setFromRotationMatrix(m4(M)), raw: v });
  }
  return out;
}
function datScope(p) {
  const pr = RL.parse(p.src, p.dat); if (pr.errors.length || !pr.mod) return null;
  const m = new RL.Machine(pr, stubHooks());
  for (const d of pr.mod.dat) { try { if (!d.compat) m.declare(d, m.modScope); } catch (e) { } }
  return m.modScope;
}
function previewPoints() { const p = cur(); if (!p) return; const sc = datScope(p); if (sc) showPoints(pointsFromScope(sc)); }

// ======================= ROBÔ: estado e painel =======================
function applyJoints() { const j = S.joints.map(v => v * RL.D2R); g1.rotation.z = -j[0]; g2.rotation.y = j[1]; g3.rotation.y = j[2]; g4.rotation.x = j[3]; g5.rotation.y = j[4]; g6.rotation.x = j[5]; }
const tcpWorld = () => RL.mul(RL.fk(S.joints).F6, RL.frameToMat(S.tool));
function setTool(t) {
  S.tool = { X: t.X || 0, Y: t.Y || 0, Z: t.Z || 0, A: t.A || 0, B: t.B || 0, C: t.C || 0 };
  tcpMark.matrix.copy(m4(RL.frameToMat(S.tool))); tcpMark.matrixWorldNeedsUpdate = true;
  $("toolInfo").textContent = (Math.abs(S.tool.X - 110) < 1e-6 && !S.tool.Y && !S.tool.Z) ? "garra (TCP X 110)" : (S.tool.X || S.tool.Y || S.tool.Z ? `TCP {X ${fmt(S.tool.X)}, Y ${fmt(S.tool.Y)}, Z ${fmt(S.tool.Z)}}` : "flange ($NULLFRAME)");
}
let panelDirty = true;
function setJoints(j, trailOn) { S.joints = j.slice(); applyJoints(); panelDirty = true; if (trailOn) { const M = tcpWorld(); pushTrail([M[3], M[7], M[11]]); } }
const axRows = [];
RL.LIMITS.forEach(([lo, hi], i) => {
  const r = document.createElement("div"); r.className = "axis";
  r.innerHTML = `<b>A${i + 1}</b><input type="range" min="${lo}" max="${hi}" step="0.1"><input type="number" min="${lo}" max="${hi}" step="1">`;
  const [sl, nu] = r.querySelectorAll("input");
  const set = v => { if (S.running) return; v = Math.max(lo, Math.min(hi, +v || 0)); const j = S.joints.slice(); j[i] = v; setJoints(j, false); checkStatic(); };
  sl.oninput = () => set(sl.value); nu.onchange = () => set(nu.value);
  $("axes").appendChild(r); axRows.push({ r, sl, nu });
});
const poseCells = {}, goIn = {};
"XYZABC".split("").forEach(k => { const d = document.createElement("div"); d.innerHTML = `<span>${k}</span><b>0</b>`; $("pose").appendChild(d); poseCells[k] = d.querySelector("b"); });
"XYZABC".split("").forEach(k => { const l = document.createElement("label"); l.textContent = k; $("gopos").appendChild(l); });
"XYZABC".split("").forEach(k => { const i = document.createElement("input"); i.type = "number"; $("gopos").appendChild(i); goIn[k] = i; });
const curPos = () => RL.matToFrame(RL.mul(RL.inv(RL.frameToMat(S.base)), tcpWorld()));
function updatePanel() {
  if (!panelDirty) return; panelDirty = false;
  S.joints.forEach((v, i) => { const { r, sl, nu } = axRows[i], [lo, hi] = RL.LIMITS[i]; sl.value = v; if (document.activeElement !== nu) nu.value = v.toFixed(1);
    const lim = v <= lo + 0.05 || v >= hi - 0.05; r.classList.toggle("lim", lim); r.classList.toggle("near", !lim && (v < lo + 8 || v > hi - 8)); });
  const p = curPos(); for (const k in poseCells) poseCells[k].textContent = fmt(p[k]);
}
function fillGo() { const p = curPos(); for (const k in goIn) goIn[k].value = +p[k].toFixed(1); }
"XYZABC".split("").forEach(k => ["-", "+"].forEach(sg => { const b = document.createElement("button"); b.textContent = k + sg; b.dataset.k = k + sg; b.onclick = () => jog(k, sg === "+" ? 1 : -1); $("jog").appendChild(b); }));
function jog(k, sg) {
  if (S.running) return;
  const st = +$("jogStep").value, ang = { 1: 1, 10: 5, 50: 15 }[st];
  const d = { X: 0, Y: 0, Z: 0, A: 0, B: 0, C: 0 }; d[k] = sg * ("XYZ".includes(k) ? st : ang);
  const cm = RL.mul(RL.inv(RL.frameToMat(S.base)), tcpWorld()); let M;
  if ($("jogFrame").value === "TOOL") M = RL.mul(cm, RL.frameToMat(d));
  else { const rc = cm.slice(); rc[3] = rc[7] = rc[11] = 0; M = RL.mul(RL.frameToMat({ A: d.A, B: d.B, C: d.C }), rc); M[3] = cm[3] + d.X; M[7] = cm[7] + d.Y; M[11] = cm[11] + d.Z; }
  moveToPose(M, false);
}
function moveToPose(Mrel, animate) {
  const r = RL.ik(RL.mul(RL.frameToMat(S.base), RL.mul(Mrel, RL.inv(RL.frameToMat(S.tool)))), S.joints), msg = $("ikmsg");
  if (!r.ok) { msg.textContent = "⚠ Posição impossível: " + r.reason; msg.style.color = "var(--err)"; return; }
  msg.textContent = r.singular ? "Atenção: punho em singularidade (A5 ≈ 0°) — A4 e A6 ficam ambíguos." : ""; msg.style.color = "var(--warn)";
  const col = RL.checkCollision(r.j, RL.frameToMat(S.tool));
  if (col) { msg.textContent = `⚠ Bloqueado: ${col.part} colidiria com ${col.obstacle.nome}`; msg.style.color = "var(--err)"; flashObstacle(col.obstacle.id); return; }
  if (animate) quickMove(r.j); else { setJoints(r.j, false); fillGo(); }
}
function quickMove(jt) {
  const j0 = S.joints.slice(), T = 0.6; let t = 0, last = performance.now();
  const step = n => { t += Math.max(0, (n - last) / 1000); last = n; const u = Math.min(1, t / T), s = u - Math.sin(2 * Math.PI * u) / (2 * Math.PI); setJoints(j0.map((v, i) => v + (jt[i] - v) * s), false); if (u < 1) requestAnimationFrame(step); else fillGo(); };
  requestAnimationFrame(step);
}
$("bGo").onclick = () => { if (S.running) return; const p = {}; for (const k in goIn) p[k] = +goIn[k].value || 0; moveToPose(RL.frameToMat(p), true); };
$("bHome").onclick = () => { if (!S.running) quickMove(RL.HOME); };
function checkStatic() { const col = RL.checkCollision(S.joints, RL.frameToMat(S.tool)); $("ikmsg").textContent = col ? `⚠ ${col.part} em colisão com ${col.obstacle.nome}` : ""; $("ikmsg").style.color = "var(--err)"; }
for (let n = 1; n <= 8; n++) {
  const b = document.createElement("button"); b.textContent = "IN " + n; b.onclick = () => { S.ins[n] = !S.ins[n]; b.classList.toggle("on", S.ins[n]); log("info", `$IN[${n}] = ${S.ins[n] ? "TRUE" : "FALSE"} (operador)`); }; $("ins").appendChild(b);
  const l = document.createElement("div"); l.className = "lamp"; l.innerHTML = `<i></i>${n}`; $("outs").appendChild(l);
}
function setOut(n, v) { S.outs[n] = v; if (n <= 8) $("outs").children[n - 1].classList.toggle("on", v); if (n === 1) gripper(v); }
// ---- garra ajustável: abertura (mm) e força (N) ----
const GR = { fechamento: 0, forca: 60 };
const ABERTURA = 120; // a garra sempre abre totalmente
const MU = 0.4, SEG = 2; // atrito dedo/peça e fator de segurança
const massOf = p => p.userData.size && p.userData.size[0] === 100 ? 1.2 : 0.5; // pacote 1,2 kg · peça 0,5 kg
const forceNeeded = p => Math.ceil(massOf(p) * 9.81 * SEG / (2 * MU));
const openY = () => ABERTURA / 2 + 6;
const closedY = w => Math.max(6, w) / 2 + 6;
function widthAcross(p) { // largura da peça na direção em que os dedos fecham (eixo Y da ferramenta)
  const M = tcpWorld(), uy = [M[1], M[5], M[9]], d = p.userData.size || [50, 50, 50];
  const a = new THREE.Euler().setFromQuaternion(p.getWorldQuaternion(new THREE.Quaternion()).premultiply(root.getWorldQuaternion(new THREE.Quaternion()).invert()), "ZYX").z;
  const ax = [Math.cos(a), Math.sin(a)], ay = [-Math.sin(a), Math.cos(a)];
  return Math.abs(uy[0] * ax[0] + uy[1] * ax[1]) * d[0] + Math.abs(uy[0] * ay[0] + uy[1] * ay[1]) * d[1] + Math.abs(uy[2]) * d[2];
}
function setGrip(o, quiet) {
  if (o.fechamento !== undefined) GR.fechamento = Math.max(0, Math.min(ABERTURA, Math.round(o.fechamento)));
  if (o.forca !== undefined) GR.forca = Math.max(5, Math.min(200, Math.round(o.forca)));
  $("gAb").value = GR.fechamento; $("gAbv").textContent = GR.fechamento + " mm"; $("gFo").value = GR.forca; $("gFov").textContent = GR.forca + " N";
  if (!gripClosed) grip.target = openY(); else if (!held) grip.target = closedY(GR.fechamento);
  if (held && GR.fechamento >= widthAcross(held) - 1) { log("warn", `Fechamento aumentado para ${GR.fechamento} mm: os dedos se afastaram da peça (${Math.round(widthAcross(held))} mm) e ela caiu.`); grip.target = closedY(GR.fechamento); dropHeld(); }
  else if (held && GR.forca < forceNeeded(held)) { log("warn", `Força reduzida para ${GR.forca} N: a peça precisa de ${forceNeeded(held)} N e escorregou da garra.`); dropHeld(); }
  if (!quiet) { store.settings.garra = { ...GR }; markDirty(); }
  gripInfo();
}
function dropHeld() {
  const p = held; if (!p) return; root.attach(p); held = null;
  const yaw = new THREE.Euler().setFromQuaternion(p.quaternion, "ZYX").z; p.rotation.set(0, 0, Math.round(yaw / (Math.PI / 2)) * (Math.PI / 2));
  const z = surfaceBelow(p.position.x, p.position.y, p) + pdim(p).h / 2, drop = p.position.z - z; p.position.z = z;
  const on = (cur().scene.objetos.find(o => Math.abs(p.position.x - o.x) < o.w / 2 && Math.abs(p.position.y - o.y) < o.d / 2) || { nome: "o piso" }).nome;
  log(drop > 15 ? "warn" : "ok", drop > 15 ? `Peça solta a ${Math.round(drop)} mm de altura — caiu sobre ${on}.` : `Peça depositada: ${on}.`);
}
function gripper(close) {
  if (close === gripClosed) return; gripClosed = close;
  if (close) {
    const M = tcpWorld(); let best = null, bd = 1e9;
    for (const p of parts) { const q = partPos(p), d = Math.hypot(M[3] - q.x, M[7] - q.y, M[11] - q.z); if (d < bd) { bd = d; best = p; } }
    const garra = Math.abs(S.tool.X - 110) < 1;
    if (best && bd < 30 && garra) {
      const w = widthAcross(best), need = forceNeeded(best);
      if (w > ABERTURA - 2) { grip.target = closedY(GR.fechamento); S.events.push({ t: "grip", ok: false }); log("err", `A peça tem ${Math.round(w)} mm entre os dedos e a garra abre no máximo ${ABERTURA} mm: não cabe na garra.`); }
      else if (GR.fechamento >= w - 1) { grip.target = closedY(GR.fechamento); S.events.push({ t: "grip", ok: false }); log("warn", `O fechamento está em ${GR.fechamento} mm e a peça tem ${Math.round(w)} mm: os dedos não encostam na peça. Ajuste o fechamento para menos de ${Math.round(w)} mm.`); }
      else if (GR.forca < need) { grip.target = w / 2 + 6; S.events.push({ t: "grip", ok: false }); log("warn", `Força de ${GR.forca} N insuficiente: a peça (${massOf(best).toFixed(1).replace(".", ",")} kg) precisa de pelo menos ${need} N. A garra fechou, mas a peça escorregou.`); }
      else {
        tool.attach(best); held = best; grip.target = w / 2 + 6; S.events.push({ t: "grip", ok: true });
        log("ok", `Garra fechada: peça presa (${GR.forca} N, mínimo ${need} N).`);
        if (best.userData.size && best.userData.size[0] === 100 && GR.forca > 120) log("warn", `Força de ${GR.forca} N pode amassar o pacote (recomendado até 120 N).`);
      }
    } else { grip.target = closedY(GR.fechamento); S.events.push({ t: "grip", ok: false }); log("info", best ? `Garra fechada vazia (peça mais próxima a ${Math.round(bd)} mm do TCP).` : "Garra fechada vazia."); }
  } else {
    grip.target = openY();
    if (held) dropHeld();
  }
  gripInfo();
}
function gripInfo() {
  const el = $("gInfo"); if (!el) return;
  const M = tcpWorld(); let best = null, bd = 1e9; for (const p of parts) if (p !== held) { const q = partPos(p), d = Math.hypot(M[3] - q.x, M[7] - q.y, M[11] - q.z); if (d < bd) { bd = d; best = p; } }
  const st = gripClosed ? (held ? `<b style="color:var(--ok)">fechada com peça</b>` : `<b>fechada (vazia)</b> em ${GR.fechamento} mm`) : `<b>aberta</b> (${ABERTURA} mm, totalmente)`;
  const ref = held || best;
  el.innerHTML = `Garra ${st}` + (ref ? `<br>${held ? "Peça presa" : "Peça mais próxima"}: ${(ref.userData.size || [50, 50, 50]).join("×")} mm, ${massOf(ref).toFixed(1).replace(".", ",")} kg → precisa de <b>${forceNeeded(ref)} N</b>${GR.forca < forceNeeded(ref) ? ` <span style="color:var(--err)">(força atual insuficiente)</span>` : ""}${!held && GR.fechamento >= widthAcross(ref) - 1 ? `<br><span style="color:var(--err)">Fechamento ${GR.fechamento} mm não encosta nesta peça (${Math.round(widthAcross(ref))} mm)</span>` : ""}` : "");
}
$("gAb").oninput = () => setGrip({ fechamento: +$("gAb").value });
$("gFo").oninput = () => setGrip({ forca: +$("gFo").value });
$("gOpen").onclick = () => { if (!S.running) setOut(1, false); };
$("gClose").onclick = () => { if (!S.running) setOut(1, true); };
setInterval(() => { if (!S.running) gripInfo(); }, 700);
function flashObstacle(id) { const ms = obMeshes[id]; if (!ms) return; ms.forEach(m => { m.userData.mat = m.userData.mat || m.material; m.material = mat.hit; }); setTimeout(() => ms.forEach(m => m.material = m.userData.mat), 1800); }
function resetCell(silent) {
  if (S.running) return; setJoints(RL.HOME, false);
  if (held) { root.attach(held); held = null; }
  parts = parts.filter(p => { if (p.userData.spawned) { p.parent && p.parent.remove(p); return false; } return true; });
  parts.forEach(p => { if (p.parent !== root) root.attach(p); p.position.fromArray(p.userData.home); p.rotation.set(0, 0, 0); }); convAcc = {};
  gripClosed = false; grip.target = openY(); for (let n = 1; n <= 64; n++) if (S.outs[n]) { S.outs[n] = false; if (n <= 8) $("outs").children[n - 1].classList.remove("on"); }
  setTool(RL.DEFAULT_TOOL); S.base = { X: 0, Y: 0, Z: 0, A: 0, B: 0, C: 0 }; clearTrail(); S.errLine = null; render(); setStatus("idle"); $("ikmsg").textContent = ""; fillGo();
  if (!silent) log("info", "Célula reiniciada: robô em HOME, peças nas posições iniciais.");
}

// ---- esteiras motorizadas: motor = $OUT[n], sensor de batente = $IN[n], geração automática de pacotes ----
let convLast = performance.now(), convAcc = {};
const sensorMeshes = {};
function conveyors(dt) {
  const p = cur(); if (!p || dt <= 0) return;
  p.scene.objetos.forEach((o, i) => {
    if (o.tipo !== "esteira" || !o.motor) return;
    const xs = o.x - o.w / 2, xe = o.x + o.w / 2, stop = xe - 6;
    const onBelt = parts.filter(q => q !== held && q.parent === root && Math.abs(q.position.y - o.y) < o.d / 2 && q.position.x > xs - 40 && q.position.x < xe + 40 && Math.abs(q.position.z - (o.h + pdim(q).h / 2)) < 4)
      .sort((a, b) => b.position.x - a.position.x);
    if (S.outs[o.motor]) {
      let limit = stop;
      for (const q of onBelt) { const hl = pdim(q).wx / 2, tgt = Math.min(q.position.x + (o.vel || 200) * dt, limit - hl); if (tgt > q.position.x) q.position.x = tgt; limit = q.position.x - hl - 3; }
      const g = o.gerar;
      if (g) {
        convAcc[i] = (convAcc[i] || 0) + dt;
        const free = !onBelt.some(q => q.position.x - pdim(q).wx / 2 < xs + g.tamanho[0] + 12);
        if (convAcc[i] >= g.intervalo && free && parts.filter(q => q.userData.spawned).length < (g.max || 40)) {
          convAcc[i] = 0; const m = makePart(xs + g.tamanho[0] / 2 + 4, o.y, g.tamanho, g.tipo, true); m.position.z = o.h + g.tamanho[2] / 2; parts.push(m);
        }
      }
    }
    if (o.sensor) {
      const at = onBelt.some(q => q.position.x + pdim(q).wx / 2 > stop - 4);
      if (!!S.ins[o.sensor] !== at) { S.ins[o.sensor] = at; const b = $("ins").children[o.sensor - 1]; if (b) b.classList.toggle("on", at); }
      const sm = sensorMeshes["o" + i]; if (sm) sm.material.color.set(at ? 0x30ff60 : 0x444444);
    }
  });
}

// ---- câmera e laço de renderização ----
const TARGET = new THREE.Vector3(0.32, 0.36, 0.18);
const CAMS = { iso: [2.0, 1.45, 1.75], front: [2.6, 0.55, 0.18], side: [0.32, 0.55, 2.6], top: [0.32, 3.2, 0.19] };
function setCam(k) { camera.position.set(...CAMS[k]); controls.target.copy(TARGET); controls.update(); document.querySelectorAll("[data-cam]").forEach(b => b.classList.toggle("on", b.dataset.cam === k)); }
document.querySelectorAll("[data-cam]").forEach(b => b.onclick = () => setCam(b.dataset.cam));
const tg = (id, fn) => { const b = $(id); b.onclick = () => { b.classList.toggle("on"); fn(b.classList.contains("on")); }; };
tg("tTrail", v => trail.visible = v); tg("tPts", v => { ptGroup.visible = v; VIS.ponto = v; }); tg("tAxes", v => VIS.eixo = v); tg("tReach", v => reach.visible = v);
// Vista limpa: só o robô, a célula e as peças (para vídeo e apresentação)
let cleanSaved = null;
$("tClean").onclick = () => {
  const b = $("tClean"), on = !b.classList.contains("on"); b.classList.toggle("on", on);
  if (on) {
    cleanSaved = { trail: trail.visible, pts: ptGroup.visible, eixo: VIS.eixo };
    trail.visible = false; ptGroup.visible = false; baseAxes.visible = false; tcpAxes.visible = false; tgGroup.visible = false;
    Object.keys(VIS).forEach(k => VIS[k] = false); $("view").classList.add("clean");
  } else {
    const c = cleanSaved || { trail: true, pts: true, eixo: true };
    trail.visible = c.trail; ptGroup.visible = c.pts; baseAxes.visible = true; tcpAxes.visible = true; tgGroup.visible = true;
    Object.assign(VIS, { eixo: c.eixo, ponto: c.pts, base: true, objeto: true, alvo: true }); $("view").classList.remove("clean");
  }
  ["tTrail", "tPts", "tAxes"].forEach(id => $(id).disabled = on);
};
$("tClear").onclick = clearTrail;
$("tFull").onclick = () => { document.body.classList.toggle("full"); setTimeout(resize, 30); toast(document.body.classList.contains("full") ? "Tela cheia — Esc ou ⛶ para voltar" : "Tela normal"); };
document.addEventListener("keydown", e => { if (e.key === "Escape" && document.body.classList.contains("full")) { document.body.classList.remove("full"); setTimeout(resize, 30); } });
function resize() { const w = view.clientWidth, h = view.clientHeight; if (!w || !h) return; renderer.setSize(w, h); css.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(view);
renderer.setAnimationLoop(() => {
  controls.update();
  { const nw = performance.now(); conveyors(Math.min(0.1, (nw - convLast) / 1000)); convLast = nw; }
  if (Math.abs(grip.cur - grip.target) > 0.1) { grip.cur += Math.sign(grip.target - grip.cur) * Math.min(Math.abs(grip.target - grip.cur), 3); fA.position.y = grip.cur; fB.position.y = -grip.cur; }
  updatePanel(); renderer.render(scene, camera);
  root.traverse(o => { if (o.isCSS2DObject) o.visible = VIS[o.userData.k] !== false; });
  css.render(scene, camera);
});

// ======================= EXECUÇÃO =======================
function stubHooks() { return { log() { }, line() { }, status() { }, getJoints: () => S.joints, getIn: n => !!S.ins[n], output() { }, getOverride: () => S.pov, setOverride() { }, animate: async () => { } }; }
function setStatus(st) {
  const c = $("status"); c.className = "chip " + st;
  c.textContent = { running: "EXECUTANDO", paused: "PAUSADO", idle: "PARADO", error: "ERRO", waiting: "AGUARDANDO E/S" }[st] || st;
  const run = S.running;
  $("bRun").disabled = run && st !== "paused"; $("bRun").textContent = st === "paused" ? "▶ Continuar" : "▶ Executar";
  $("bPause").disabled = !(run && (st === "running" || st === "waiting")); $("bStop").disabled = !run;
  ["bCheck", "bReset", "bTeach", "bGo", "bHome", "examples", "bAnalyze", "bSceneApply", "bBlkGen"].forEach(id => $(id) && ($(id).disabled = run));
  document.querySelectorAll("#jog button,.exrun").forEach(b => b.disabled = run); axRows.forEach(a => { a.sl.disabled = run; a.nu.disabled = run; });
  ta.readOnly = run;
}
function check(verbose) {
  const p = cur(); if (!p) return null; S.warnLines.clear(); S.errLine = null;
  const pr = RL.parse(p.src, p.dat);
  pr.warnings.forEach(w => S.warnLines.add(w.loc.file + w.loc.line));
  if (pr.errors.length) {
    pr.errors.forEach(e => log("err", e.msg, e.loc)); S.errLine = pr.errors[0].loc;
    if (S.pane !== "prog") showPane("prog"); gotoLine(pr.errors[0].loc, false); render();
    log("err", `Verificação: ${pr.errors.length} erro(s). Corrija antes de executar.`); setStatus("error"); return null;
  }
  if (verbose) { pr.warnings.forEach(w => log("warn", w.msg, w.loc)); log("ok", `Verificação OK: ${Object.keys(pr.mod.defs).length} subprograma(s), ${pr.mod.dat.length} declaração(ões) no .dat${pr.warnings.length ? `, ${pr.warnings.length} aviso(s)` : ""}.`); }
  render(); previewPoints(); return pr;
}
async function runProgram(stepping) {
  if (S.running) { if (S.machine) stepping ? S.machine.step() : S.machine.resume(); return null; }
  const pr = check(false); if (!pr) return "error";
  if (S.kcpCheck) { const e = S.kcpCheck(); if (e) { log("err", e); return "error"; } }
  saveVersion("Antes de executar");
  const seen = new Set(); pr.warnings.forEach(w => { if (!seen.has(w.msg)) { seen.add(w.msg); log("warn", w.msg, w.loc); } });
  setTool(RL.DEFAULT_TOOL); S.base = { X: 0, Y: 0, Z: 0, A: 0, B: 0, C: 0 }; S.events = [];
  const m = new RL.Machine(pr, {
    log: (l, msg, loc) => log(l, msg, loc),
    line: (loc, text) => { S.curLine = loc; if (S.pane === "prog") { if (loc.file !== S.file) setFile(loc.file); render(); gotoLine(loc, false); } const n = $("nowcmd"); n.style.display = "block"; n.textContent = `▶ ${text}   (linha ${loc.line})`; },
    status: st => { if (st !== "idle") setStatus(st); },
    getJoints: () => S.joints, getIn: n => !!S.ins[n], output: (n, v) => setOut(n, v),
    getOverride: () => S.pov, setOverride: v => { S.pov = v; $("pov").value = v; $("povv").textContent = v + "%"; },
    getGrip: () => GR, gripParam: (k, v) => setGrip({ [k]: v }, true),
    frames: (base, toolF) => { S.base = { ...base }; setTool(toolF); previewPoints(); },
    points: scope => showPoints(pointsFromScope(scope)),
    errorLine: loc => { S.errLine = loc; S.curLine = null; if (S.pane === "prog") { render(); gotoLine(loc, false); } },
    collision: id => { flashObstacle(id); S.events.push({ t: "collision" }); },
    moved: (label, pos, cut) => { S.events.push({ t: "move", label: label || "", pos, joints: S.joints.slice(), cut }); if (S.onMoved) S.onMoved(); },
    waitEvent: text => S.events.push({ t: "wait", text }),
    waiting: on => { $("ins").classList.toggle("waitio", on); setStatus(on ? "waiting" : "running"); },
    animate: plan => new Promise(res => {
      const keys = plan.keys, n = keys.length; let t = 0, last = performance.now();
      const frame = nw => {
        const d = Math.max(0, Math.min(0.1, (nw - last) / 1000)); last = nw;
        if (m.state === "stopping") return res();
        const sample = tt => { const uu = Math.min(1, tt / plan.duration), ss = Math.max(0, uu - Math.sin(2 * Math.PI * uu) / (2 * Math.PI)); const ff = ss * (n - 1), ii = Math.max(0, Math.min(n - 2, Math.floor(ff))), ww = ff - ii; return keys[ii].map((v, k) => v + (keys[ii + 1][k] - v) * ww); };
        if (m.state !== "paused") {
          let nt = t + d * S.pov / 100;
          if (S.tcpLimit && d > 0) { const tp = j => { const M = RL.mul(RL.fk(j).F6, RL.frameToMat(S.tool)); return [M[3], M[7], M[11]]; }; const a = tp(sample(t)), b = tp(sample(nt)), dist = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]), lim = S.tcpLimit * d; if (dist > lim) nt = t + (nt - t) * lim / dist; }
          t = nt;
        }
        const u = Math.min(1, t / plan.duration);
        setJoints(sample(t), true);
        if (u >= 1) { setJoints(keys[n - 1], true); return res(); }
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }),
  });
  S.machine = m; S.running = true; m.startStepping = stepping; S.curLine = null; S.errLine = null;
  log("run", `Executando ${pr.mod.defs[pr.mod.order[0]].display}()${stepping ? " — passo a passo" : ""}`);
  setStatus("running");
  const r = await m.run();
  S.running = false; S.machine = null; S.curLine = null; $("nowcmd").style.display = "none"; $("ins").classList.remove("waitio");
  setStatus(r === "error" ? "error" : "idle"); render(); fillGo(); S.lastRun = { r, t: Date.now() };
  return r;
}
$("bRun").onclick = () => runProgram(false);
$("bStep").onclick = () => runProgram(true);
$("bPause").onclick = () => { if (S.machine) { S.machine.pause(); setStatus("paused"); } };
$("bStop").onclick = () => { if (S.machine) S.machine.stop(); };
$("bCheck").onclick = () => check(true);
$("bReset").onclick = () => resetCell(false);
$("pov").oninput = e => { S.pov = +e.target.value; $("povv").textContent = S.pov + "%"; };
$("bClear").onclick = () => $("log").innerHTML = "";
$("bHelp").onclick = () => $("mHelp").classList.add("on");
const BEG_EX = ["basico", "b01", "b02", "quadrado", "circ", "pick", "p22"];
function fillExamples() {
  const list = store.settings.nivel === "iniciante" ? EXAMPLES.filter(e => BEG_EX.includes(e.id)) : EXAMPLES;
  $("examples").innerHTML = `<option value="">Exemplos…</option>` + [...new Set(list.map(e => e.cat))].map(c => `<optgroup label="${esc(c)}">${list.filter(e => e.cat === c).map(e => `<option value="${e.id}">${esc(e.title)}</option>`).join("")}</optgroup>`).join("");
}
fillExamples();
$("examples").onchange = () => { const e = EXAMPLES.find(x => x.id === $("examples").value); $("examples").value = ""; if (e) openExample(e); };
function openExample(e) {
  const p = newProject({ name: "Exemplo: " + e.title, cat: e.cat, src: e.src, dat: e.dat, scene: SCENES[e.scene || "pick"] });
  openProject(p.id); showPane("prog"); log("info", `Projeto criado a partir do exemplo "${e.title}".`);
}
$("bTeach").onclick = () => {
  if (S.running) return; const p = cur(); const nm = teachPoint();
  const pos = S.file === "src" ? ta.selectionStart : p.src.length; const lines = p.src.split("\n"); let acc = 0, li = 0;
  for (; li < lines.length; li++) { acc += lines[li].length + 1; if (acc > pos) break; }
  if (/^\s*END\s*$/i.test(lines[li] || "")) li = Math.max(0, li - 1);
  lines.splice(li + 1, 0, `  PTP ${nm}`); p.src = lines.join("\n"); setFile("src"); markDirty(); previewPoints();
  log("ok", `Ponto ${nm} gravado no .dat e "PTP ${nm}" inserido no .src (linha ${li + 2}).`, { file: "src", line: li + 2 });
};
function teachPoint() {
  const p = cur(), c = curPos(); let n = 1; const used = (p.src + "\n" + p.dat).toUpperCase(); while (new RegExp(`\\bP${n}\\b`).test(used)) n++;
  const nm = "P" + n, line = `  DECL E6POS ${nm} = {X ${fmt(c.X)}, Y ${fmt(c.Y)}, Z ${fmt(c.Z)}, A ${fmt(c.A)}, B ${fmt(c.B)}, C ${fmt(c.C)}}`;
  if (/^\s*ENDDAT/im.test(p.dat)) p.dat = p.dat.replace(/^(\s*ENDDAT)/im, line + "\n$1"); else p.dat += "\n" + line;
  return nm;
}

// ======================= BLOCOS =======================
const BDEF = {
  home: { g: "mov", t: "Ir para HOME", krl: () => "PTP HOME" },
  ptp: { g: "mov", t: "Mover até (PTP)", f: [["ponto", "pt"]], krl: b => `PTP ${b.ponto}` },
  lin: { g: "mov", t: "Mover em linha reta até (LIN)", f: [["ponto", "pt"]], krl: b => `LIN ${b.ponto}` },
  rel: { g: "mov", t: "Deslocar em linha reta", f: [["eixo", "sel", ["X", "Y", "Z"]], ["mm", "num", "mm"]], krl: b => `LIN_REL {${b.eixo} ${b.mm}}` },
  vel: { g: "mov", t: "Velocidade linear", f: [["v", "num", "m/s"]], krl: b => `$VEL.CP = ${b.v}` },
  velax: { g: "mov", t: "Velocidade dos eixos", f: [["v", "num", "%"]], krl: b => `BAS(#PTP_PARAMS, ${b.v})` },
  abrir: { g: "io", t: "Abrir garra", krl: () => "$OUT[1] = FALSE" },
  fechar: { g: "io", t: "Fechar garra", krl: () => "$OUT[1] = TRUE" },
  saida: { g: "io", t: "Saída", f: [["n", "num", "nº"], ["v", "sel", ["TRUE", "FALSE"]]], krl: b => `$OUT[${b.n}] = ${b.v}` },
  espera_in: { g: "io", t: "Esperar entrada ligar", f: [["n", "num", "nº"]], krl: b => `WAIT FOR $IN[${b.n}]` },
  tempo: { g: "tm", t: "Aguardar", f: [["s", "num", "s"]], krl: b => `WAIT SEC ${b.s}` },
  repetir: { g: "fl", t: "Repetir", f: [["n", "num", "vezes"]], open: true },
  fim_rep: { g: "fl", t: "Fim do repetir", close: "repetir" },
  se: { g: "fl", t: "Se a entrada estiver ligada", f: [["n", "num", "nº"]], open: true },
  senao: { g: "fl", t: "Senão", mid: true },
  fim_se: { g: "fl", t: "Fim do se", close: "se" },
  coment: { g: "tm", t: "Comentário", f: [["txt", "text"]], krl: b => `; ${b.txt || ""}` },
  raw: { g: "raw", t: "KRL", f: [["code", "text"]], krl: b => b.code || "" },
};
const PAL = [["home", "mov"], ["ptp", "mov"], ["lin", "mov"], ["rel", "mov"], ["vel", "mov"], ["velax", "mov"], ["abrir", "io"], ["fechar", "io"], ["saida", "io"], ["espera_in", "io"], ["tempo", "tm"], ["repetir", "fl"], ["se", "fl"], ["coment", "tm"], ["raw", "tm"]];
const PALN = { home: "HOME", ptp: "PTP", lin: "LIN", rel: "Deslocar", vel: "Vel. linear", velax: "Vel. eixos", abrir: "Abrir garra", fechar: "Fechar garra", saida: "Saída", espera_in: "Esperar entrada", tempo: "Aguardar", repetir: "Repetir", se: "Se entrada", coment: "Comentário", raw: "KRL livre" };
$("palette").innerHTML = PAL.map(([k, g]) => `<button data-b="${k}" data-g="${g}">+ ${PALN[k]}</button>`).join("");
$("palette").onclick = e => {
  const k = e.target.dataset && e.target.dataset.b; if (!k) return; const p = cur(); if (!p.blocks) p.blocks = [];
  const pts = pointNames(p);
  const def = { home: {}, ptp: { ponto: pts[0] || "HOME" }, lin: { ponto: pts[0] || "HOME" }, rel: { eixo: "Z", mm: 100 }, vel: { v: 0.3 }, velax: { v: 100 }, saida: { n: 2, v: "TRUE" }, espera_in: { n: 1 }, tempo: { s: 0.5 }, repetir: { n: 3 }, se: { n: 1 }, coment: { txt: "" }, raw: { code: "" } }[k] || {};
  const add = [{ k, ...def }]; if (k === "repetir") add.push({ k: "fim_rep" }); if (k === "se") add.push({ k: "fim_se" });
  p.blocks.push(...add); blocksChanged();
};
function pointNames(p) { const out = ["HOME"]; const re = /^\s*DECL\s+(?:GLOBAL\s+)?(E6POS|POS|E6AXIS|AXIS|FRAME)\s+([A-Za-z_]\w*)/gim; let m; while ((m = re.exec(p.dat))) out.push(m[2]); return out; }
function blocksToKrl(blocks, name, rest) {
  const lines = [], decl = []; let ind = 1, rep = 0; const stack = [];
  const pad = () => "  ".repeat(ind);
  for (const b of blocks) {
    const d = BDEF[b.k]; if (!d) continue;
    if (b.k === "repetir") { rep++; decl.push(`  DECL INT rep${rep}`); lines.push(`${pad()}FOR rep${rep} = 1 TO ${Math.max(1, Math.round(+b.n || 1))}`); stack.push("ENDFOR"); ind++; continue; }
    if (b.k === "se") { lines.push(`${pad()}IF $IN[${b.n}] THEN`); stack.push("ENDIF"); ind++; continue; }
    if (b.k === "senao") { lines.push(`${"  ".repeat(Math.max(1, ind - 1))}ELSE`); continue; }
    if (b.k === "fim_rep" || b.k === "fim_se") { ind = Math.max(1, ind - 1); lines.push(`${pad()}${stack.pop() || (b.k === "fim_rep" ? "ENDFOR" : "ENDIF")}`); continue; }
    lines.push(pad() + d.krl(b));
  }
  while (stack.length) { ind--; lines.push("  ".repeat(Math.max(1, ind)) + stack.pop()); }
  return [`DEF ${name}()`, ...decl, "  INI", ...lines, "END"].join("\n") + (rest ? "\n" + rest : "");
}
function splitFirstDef(src) { // devolve {head, body:[linhas], rest}
  const L = src.split("\n"); let s = L.findIndex(l => /^\s*(GLOBAL\s+)?DEF\s+/i.test(l)); if (s < 0) return null;
  let e = s + 1; while (e < L.length && !/^\s*END\s*(;.*)?$/i.test(L[e])) e++;
  return { body: L.slice(s + 1, e), rest: L.slice(e + 1).join("\n").replace(/^\n+/, "") };
}
function krlToBlocks(src) {
  const sp = splitFirstDef(src); if (!sp) return [];
  const out = [];
  for (const raw of sp.body) {
    const t0 = raw.trim(); if (!t0) continue; let m;
    if (/^;/.test(t0)) { out.push({ k: "coment", txt: t0.replace(/^;\s?/, "") }); continue; }
    const ci = t0.indexOf(";"), l = (ci > 0 && !t0.slice(0, ci).includes('"') ? t0.slice(0, ci) : t0).trim(), cm = ci > 0 && l !== t0 ? t0.slice(ci + 1).trim() : "";
    if (/^DECL\s+INT\s+rep\d+$/i.test(l) || /^INI$/i.test(l)) continue;
    const n0 = out.length;
    if (/^PTP\s+X?HOME$/i.test(l)) out.push({ k: "home" });
    else if ((m = l.match(/^PTP\s+([A-Za-z_]\w*)$/i))) out.push({ k: "ptp", ponto: m[1] });
    else if ((m = l.match(/^LIN\s+([A-Za-z_]\w*)$/i))) out.push({ k: "lin", ponto: m[1] });
    else if ((m = l.match(/^LIN_REL\s*\{\s*([XYZ])\s+(-?[\d.]+)\s*\}$/i))) out.push({ k: "rel", eixo: m[1].toUpperCase(), mm: +m[2] });
    else if ((m = l.match(/^\$VEL\.CP\s*=\s*([\d.]+)$/i))) out.push({ k: "vel", v: +m[1] });
    else if ((m = l.match(/^BAS\s*\(\s*#PTP_PARAMS\s*,\s*([\d.]+)\s*\)$/i))) out.push({ k: "velax", v: +m[1] });
    else if (/^\$OUT\[\s*1\s*\]\s*=\s*FALSE$/i.test(l)) out.push({ k: "abrir" });
    else if (/^\$OUT\[\s*1\s*\]\s*=\s*TRUE$/i.test(l)) out.push({ k: "fechar" });
    else if ((m = l.match(/^\$OUT\[\s*(\d+)\s*\]\s*=\s*(TRUE|FALSE)$/i))) out.push({ k: "saida", n: +m[1], v: m[2].toUpperCase() });
    else if ((m = l.match(/^WAIT\s+FOR\s+\$IN\[\s*(\d+)\s*\]$/i))) out.push({ k: "espera_in", n: +m[1] });
    else if ((m = l.match(/^WAIT\s+SEC\s+([\d.]+)$/i))) out.push({ k: "tempo", s: +m[1] });
    else if ((m = l.match(/^FOR\s+rep\d+\s*=\s*1\s+TO\s+(\d+)$/i))) out.push({ k: "repetir", n: +m[1] });
    else if (/^ENDFOR$/i.test(l) && out.some(b => b.k === "repetir")) out.push({ k: "fim_rep" });
    else if ((m = l.match(/^IF\s+\$IN\[\s*(\d+)\s*\]\s+THEN$/i))) out.push({ k: "se", n: +m[1] });
    else if (/^ELSE$/i.test(l)) out.push({ k: "senao" });
    else if (/^ENDIF$/i.test(l)) out.push({ k: "fim_se" });
    else out.push({ k: "raw", code: t0 });
    if (cm && out.length > n0 && out[out.length - 1].k !== "raw") out.push({ k: "coment", txt: cm });
  }
  return out;
}
let blkSession = false, genT;
function blocksChanged() {
  const p = cur(); renderBlocks();
  if (!blkSession) { saveVersion("Antes de editar por blocos"); blkSession = true; }
  clearTimeout(genT); genT = setTimeout(() => { const sp = splitFirstDef(p.src); p.src = blocksToKrl(p.blocks, progName(p.src), sp ? sp.rest : ""); p.blkSrc = p.src; if (S.file === "src") setFile("src"); updateNames(); markDirty(); }, 250);
}
function openBlocks() {
  const p = cur(); if (!p) return; blkSession = false;
  if (!p.blocks || (p.blkSrc !== undefined && p.blkSrc !== p.src)) { if (!p.blocks || p.blocks.length === 0) { p.blocks = krlToBlocks(p.src); p.blkSrc = p.src; } }
  renderBlocks();
}
function renderBlocks() {
  const p = cur(), box = $("blocks"); const pts = pointNames(p); let ind = 0, html = "";
  if (p.blkSrc !== undefined && p.blkSrc !== p.src) html += `<div class="note" style="color:var(--warn)">O programa foi editado como texto depois da última geração. Clique em "Ler do KRL" para atualizar os blocos.</div>`;
  if (!p.blocks.length) html += `<p class="note">Nenhum bloco. Use a paleta acima para montar o programa.</p>`;
  p.blocks.forEach((b, i) => {
    const d = BDEF[b.k] || BDEF.raw; if (d.close || d.mid) ind = Math.max(0, ind - 1);
    const flds = (d.f || []).map(([n, ty, o]) => {
      if (ty === "pt") return `<select data-i="${i}" data-n="${n}">${[...new Set([...pts, b[n]])].map(x => `<option ${x === b[n] ? "selected" : ""}>${esc(x)}</option>`).join("")}</select><button class="sm" data-teach="${i}" title="Gravar a pose atual como novo ponto">⊕</button>`;
      if (ty === "sel") return `<select data-i="${i}" data-n="${n}">${o.map(x => `<option ${x === b[n] ? "selected" : ""}>${x}</option>`).join("")}</select>`;
      if (ty === "num") return `<input type="number" step="any" data-i="${i}" data-n="${n}" value="${esc(b[n])}"><span class="note" style="margin:0">${o || ""}</span>`;
      return `<input type="text" style="flex:1;min-width:120px" data-i="${i}" data-n="${n}" value="${esc(b[n] || "")}">`;
    }).join("");
    html += `<div class="blk ${d.g}" draggable="true" data-idx="${i}" style="margin-left:${ind * 18}px"><span class="h">⠿</span><b>${esc(d.t)}</b>${flds}<span class="x"><button data-up="${i}">↑</button><button data-dn="${i}">↓</button><button data-del="${i}" class="danger">✕</button></span></div>`;
    if (d.open || d.mid) ind++;
  });
  box.innerHTML = html;
}
$("blocks").addEventListener("change", e => { const t = e.target; if (t.dataset.i === undefined) return; const p = cur(), b = p.blocks[+t.dataset.i]; b[t.dataset.n] = t.type === "number" ? +t.value : t.value; blocksChanged(); });
$("blocks").addEventListener("click", e => {
  const t = e.target, p = cur(); if (!t.dataset) return; const bl = p.blocks;
  if (t.dataset.del !== undefined) { const i = +t.dataset.del, k = bl[i].k; bl.splice(i, 1);
    if (k === "repetir" || k === "se") { let depth = 0; for (let j = i; j < bl.length; j++) { const kk = bl[j].k; if (kk === k) depth++; if (kk === (k === "se" ? "fim_se" : "fim_rep")) { if (depth === 0) { bl.splice(j, 1); break; } depth--; } } }
    blocksChanged(); }
  if (t.dataset.up !== undefined) { const i = +t.dataset.up; if (i > 0) { [bl[i - 1], bl[i]] = [bl[i], bl[i - 1]]; blocksChanged(); } }
  if (t.dataset.dn !== undefined) { const i = +t.dataset.dn; if (i < bl.length - 1) { [bl[i + 1], bl[i]] = [bl[i], bl[i + 1]]; blocksChanged(); } }
  if (t.dataset.teach !== undefined) { if (S.running) return; const nm = teachPoint(); bl[+t.dataset.teach].ponto = nm; previewPoints(); log("ok", `Ponto ${nm} gravado com a pose atual.`); blocksChanged(); }
});
let dragI = null;
$("blocks").addEventListener("dragstart", e => { const el = e.target.closest(".blk"); if (!el) return; dragI = +el.dataset.idx; el.classList.add("drag"); e.dataTransfer.effectAllowed = "move"; });
$("blocks").addEventListener("dragover", e => { const el = e.target.closest(".blk"); if (!el) return; e.preventDefault(); document.querySelectorAll(".blk.over").forEach(x => x.classList.remove("over")); el.classList.add("over"); });
$("blocks").addEventListener("drop", e => { const el = e.target.closest(".blk"); if (!el || dragI === null) return; e.preventDefault(); const to = +el.dataset.idx, bl = cur().blocks; const [b] = bl.splice(dragI, 1); bl.splice(to > dragI ? to - 1 : to, 0, b); dragI = null; blocksChanged(); });
$("blocks").addEventListener("dragend", () => { dragI = null; document.querySelectorAll(".blk.drag,.blk.over").forEach(x => x.classList.remove("drag", "over")); });
$("bBlkRead").onclick = () => { const p = cur(); p.blocks = krlToBlocks(p.src); p.blkSrc = p.src; renderBlocks(); markDirty(); toast(`${p.blocks.length} blocos lidos do programa`); };
$("bBlkGen").onclick = () => { const p = cur(); saveVersion("Antes de gerar pelos blocos"); const sp = splitFirstDef(p.src); p.src = blocksToKrl(p.blocks, progName(p.src), sp ? sp.rest : ""); p.blkSrc = p.src; setFile("src"); markDirty(); renderBlocks(); toast("Programa .src gerado a partir dos blocos"); };

// ======================= PROJETOS =======================
$("projCatF").innerHTML += CATS.map(c => `<option>${c}</option>`).join("");
$("projSearch").oninput = renderProjects; $("projCatF").onchange = renderProjects;
function renderProjects() {
  const q = $("projSearch").value.toLowerCase(), cf = $("projCatF").value;
  const list = store.projects.filter(p => (!cf || p.cat === cf) && (!q || p.name.toLowerCase().includes(q)));
  $("projList").innerHTML = list.map(p => `<div class="item ${p.id === store.currentId ? "on" : ""}" data-open="${p.id}"><b>${esc(p.name)}</b><div class="meta">${esc(p.cat)} · ${p.versions.length} versões · alterado ${dt(p.updated)}${p.original ? " · importado" : ""}</div></div>`).join("") || `<p class="note">Nenhum projeto encontrado.</p>`;
  const p = cur(); if (!p) { $("projDetail").innerHTML = ""; return; }
  $("projDetail").innerHTML = `<h3>Projeto aberto</h3>
    <div class="row"><input type="text" id="pdName" value="${esc(p.name)}" style="flex:1"></div>
    <div class="row"><label>Categoria</label><select id="pdCat" style="flex:1">${CATS.map(c => `<option ${c === p.cat ? "selected" : ""}>${c}</option>`).join("")}</select></div>
    <div class="row"><button id="pdVer">Salvar versão…</button><button id="pdDup">Duplicar</button><button id="pdDel" class="danger">Excluir</button></div>
    <h3>Histórico de versões</h3>
    ${p.versions.slice().reverse().map((v, k) => `<div class="item" style="cursor:default"><b>${esc(v.note)}</b><div class="meta">${dt(v.date)} · ${v.src.split("\n").length} linhas</div>
      <div class="row" style="margin-bottom:0"><button class="sm" data-vcmp="${v.id}">Comparar com o atual</button><button class="sm" data-vres="${v.id}">Restaurar</button></div></div>`).join("")}`;
  $("pdName").onchange = () => { p.name = $("pdName").value.trim() || "Sem nome"; $("projName").value = p.name; markDirty(); renderProjects(); };
  $("pdCat").onchange = () => { p.cat = $("pdCat").value; markDirty(); renderProjects(); };
  $("pdVer").onclick = async () => { const note = await askText("Salvar versão", "Descreva a alteração (ex.: ajustei a altura da pega):"); if (note === null) return; saveVersion(note || "Versão manual", true); renderProjects(); toast("Versão salva"); };
  $("pdDup").onclick = () => { const c = clone(p); c.id = uid(); c.name = p.name + " (cópia)"; c.created = c.updated = now(); store.projects.unshift(c); openProject(c.id); renderProjects(); };
  $("pdDel").onclick = async () => {
    if (S.running) return; const ok = await ask("Excluir projeto", `Excluir <b>${esc(p.name)}</b> e todo o seu histórico? Se quiser guardar, faça antes um backup deste projeto.`, [{ label: "Cancelar", value: false }, { label: "Excluir", value: true, danger: true }]);
    if (!ok) return; store.projects = store.projects.filter(x => x !== p); if (!store.projects.length) newProject({ name: "Meu primeiro programa", ...blankProg() }); openProject(store.projects[0].id); renderProjects();
  };
}
$("projList").onclick = e => { const it = e.target.closest("[data-open]"); if (it) { openProject(it.dataset.open); renderProjects(); } };
$("projDetail").onclick = async e => {
  const p = cur(), t = e.target;
  if (t.dataset.vcmp) { const v = p.versions.find(x => x.id === t.dataset.vcmp); showDiff(`Versão "${v.note}" (${dt(v.date)}) → atual`, v, p); }
  if (t.dataset.vres) {
    if (S.running) return; const v = p.versions.find(x => x.id === t.dataset.vres);
    const ok = await ask("Restaurar versão", `Substituir o programa atual pela versão <b>${esc(v.note)}</b> de ${dt(v.date)}? O estado atual será guardado no histórico antes.`, [{ label: "Cancelar", value: false }, { label: "Restaurar", value: true, pri: true }]);
    if (!ok) return; saveVersion("Antes de restaurar versão", false); p.src = v.src; p.dat = v.dat; setFile("src"); updateNames(); previewPoints(); markDirty(); renderProjects(); toast("Versão restaurada");
  }
};
function askText(title, prompt, val = "") {
  return new Promise(res => {
    $("askTitle").textContent = title; $("askBody").innerHTML = `<p>${prompt}</p><input type="text" id="askIn" style="width:100%" value="${esc(val)}">`; const f = $("askFoot"); f.innerHTML = "";
    const c = document.createElement("button"); c.textContent = "Cancelar"; c.onclick = () => { $("mAsk").classList.remove("on"); res(null); };
    const o = document.createElement("button"); o.textContent = "OK"; o.className = "pri"; o.onclick = () => { $("mAsk").classList.remove("on"); res($("askIn").value.trim()); };
    f.append(c, o); $("mAsk").classList.add("on"); setTimeout(() => { $("askIn").focus(); $("askIn").onkeydown = e => { if (e.key === "Enter") o.click(); }; }, 30);
  });
}
const blankProg = () => ({ src: "DEF novo()\n  INI\n  PTP HOME\n\n  PTP HOME\nEND", dat: "DEFDAT novo\n\nENDDAT" });
$("bProjNew").onclick = async () => {
  const name = await askText("Novo projeto", "Nome do projeto:", "Novo programa"); if (name === null) return;
  const nm = (name || "novo").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9_]+/g, "_").replace(/^(\d)/, "_$1").toLowerCase().slice(0, 24) || "novo";
  const p = newProject({ name: name || "Novo programa", src: `DEF ${nm}()\n  INI\n  PTP HOME\n\n  PTP HOME\nEND`, dat: `DEFDAT ${nm}\n\nENDDAT`, scene: SCENES.pick });
  openProject(p.id); renderProjects();
};
// ---- diff ----
function lineDiff(a, b) {
  const A = a.split("\n"), B = b.split("\n"), n = A.length, m = B.length;
  if (n * m > 4e6) return [{ t: "h", s: "Arquivos grandes demais para comparar linha a linha." }];
  const L = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const out = []; let i = 0, j = 0;
  while (i < n && j < m) { if (A[i] === B[j]) { out.push({ t: "=", s: A[i] }); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) out.push({ t: "r", s: A[i++] }); else out.push({ t: "a", s: B[j++] }); }
  while (i < n) out.push({ t: "r", s: A[i++] }); while (j < m) out.push({ t: "a", s: B[j++] });
  return out;
}
function diffHtml(a, b) {
  const d = lineDiff(a, b); const ch = d.filter(x => x.t === "a" || x.t === "r").length;
  if (!ch) return `<p class="note">Sem diferenças.</p>`;
  const keep = d.map((x, i) => x.t !== "=" || d.slice(Math.max(0, i - 2), i + 3).some(y => y.t !== "="));
  let html = "", gap = false;
  d.forEach((x, i) => { if (!keep[i]) { if (!gap) html += `<div class="h">  ⋯</div>`; gap = true; return; } gap = false; html += `<div class="${x.t === "a" ? "a" : x.t === "r" ? "r" : ""}">${x.t === "a" ? "+ " : x.t === "r" ? "- " : "  "}${esc(x.s)}</div>`; });
  return `<p class="note">${d.filter(x => x.t === "r").length} linha(s) removida(s), ${d.filter(x => x.t === "a").length} adicionada(s).</p><div class="diff">${html}</div>`;
}
function showDiff(title, a, b) { $("diffTitle").textContent = title; $("diffBody").innerHTML = `<h3>Programa (.src)</h3>${diffHtml(a.src, b.src)}<h3>Dados (.dat)</h3>${diffHtml(a.dat, b.dat)}`; $("mDiff").classList.add("on"); }
// ---- backup ----
async function sha256(txt) { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(txt)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
const safe = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^\w.-]+/g, "_").slice(0, 60);
async function makeZip(projects, kind) {
  const zip = new JSZip(); const lib = JSON.stringify({ projects, progress: kind === "completo" ? store.progress : undefined }, null, 1);
  zip.file("biblioteca.json", lib);
  zip.file("manifesto.json", JSON.stringify({ app: "Korum", versao: APP_VERSION, tipo: kind, data: now(), projetos: projects.length, sha256: await sha256(lib) }, null, 1));
  for (const p of projects) { const n = progName(p.src), f = zip.folder("programas/" + safe(p.name)); f.file(n + ".src", p.src); f.file(n + ".dat", p.dat); }
  return zip.generateAsync({ type: "uint8array", compression: "DEFLATE" });
}
const stamp = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}_${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}`; };
$("bBackupAll").onclick = async () => { const data = await makeZip(store.projects, "completo"); const r = await platform.saveFile(`korum-backup-${stamp()}.zip`, data); if (r && r.saved) { store.settings.lastBackup = now(); markDirty(); toast("Backup salvo"); log("ok", `Backup completo salvo: ${r.path} (${store.projects.length} projetos).`); renderBackupInfo(); } };
$("bBackupProj").onclick = async () => { const p = cur(); const data = await makeZip([p], "projeto"); const r = await platform.saveFile(`korum-${safe(p.name)}-${stamp()}.zip`, data); if (r && r.saved) { toast("Projeto exportado"); log("ok", `Projeto salvo em ${r.path}.`); } };
$("bExportKrl").onclick = async () => { const p = cur(), n = progName(p.src); const a = await platform.saveFile(n + ".src", p.src); if (a && a.saved) { const b = await platform.saveFile(n + ".dat", p.dat); if (b && b.saved) log("ok", `Arquivos ${n}.src e ${n}.dat exportados.`); } };
$("bRestore").onclick = () => $("fileZip").click();
$("fileZip").onchange = async e => {
  const f = e.target.files[0]; e.target.value = ""; if (!f) return;
  try {
    let lib, man = null;
    if (/\.json$/i.test(f.name)) { const j = JSON.parse(await f.text()); lib = j.projects ? j : { projects: [] }; }
    else {
      const zip = await JSZip.loadAsync(await f.arrayBuffer()); const lf = zip.file("biblioteca.json"), mf = zip.file("manifesto.json");
      if (!lf) throw new Error("o arquivo não é um backup do Korum (falta biblioteca.json)");
      const txt = await lf.async("string"); if (mf) { man = JSON.parse(await mf.async("string")); if (man.sha256 && man.sha256 !== await sha256(txt)) throw new Error("verificação de integridade falhou: o backup está corrompido ou foi alterado"); }
      lib = JSON.parse(txt);
    }
    if (!Array.isArray(lib.projects) || !lib.projects.length) throw new Error("nenhum projeto no backup");
    const info = man ? `Backup de ${dt(man.data)} · ${man.projetos} projeto(s) · integridade verificada ✓` : `${lib.projects.length} projeto(s)`;
    const mode = await ask("Restaurar backup", `<p>${info}</p><p><b>Adicionar</b> coloca os projetos do backup junto aos atuais (cópias, sem apagar nada).<br><b>Substituir</b> apaga a biblioteca atual e deixa só o conteúdo do backup.</p>`,
      [{ label: "Cancelar", value: null }, { label: "Substituir tudo", value: "sub", danger: true }, { label: "Adicionar", value: "add", pri: true }]);
    if (!mode) return;
    if (mode === "sub") { const ok = await ask("Confirmar substituição", "Isso apaga todos os projetos atuais. Tem certeza?", [{ label: "Cancelar", value: false }, { label: "Apagar e substituir", value: true, danger: true }]); if (!ok) return; store.projects = lib.projects; if (lib.progress) store.progress = lib.progress; }
    else lib.projects.forEach(p => { p.id = uid(); store.projects.unshift(p); });
    openProject(store.projects[0].id); renderProjects(); persist(); log("ok", `Backup restaurado (${mode === "sub" ? "substituição" : "adição"}): ${lib.projects.length} projeto(s).`);
  } catch (err) { log("err", "Não foi possível restaurar: " + err.message); ask("Backup inválido", esc(err.message), [{ label: "OK", value: 1 }]); }
};
function renderBackupInfo() { $("backupInfo").textContent = `Pasta sugerida: ${store.settings.backupDir || "Documentos"} · último backup .zip: ${store.settings.lastBackup ? dt(store.settings.lastBackup) : "nunca"}. Cópias automáticas diárias ficam na pasta de dados.`; }
// ---- importar KRL ----
let importMode = "proj";
$("bProjImport").onclick = () => { importMode = "proj"; $("fileKrl").click(); };
$("bRevImport").onclick = () => { importMode = "rev"; $("fileKrl").click(); };
$("fileKrl").onchange = async e => {
  const files = [...e.target.files]; e.target.value = ""; if (!files.length) return; let src = null, dat = null;
  for (const f of files) { const t = await f.text(); if (/\.dat$/i.test(f.name) || /^\s*(&.*\r?\n\s*)*DEFDAT/i.test(t)) dat = t; else src = t; }
  if (src === null) { if (dat !== null && cur()) { cur().dat = dat; setFile(S.file); previewPoints(); markDirty(); log("info", "Arquivo .dat importado para o projeto aberto."); } return; }
  src = src.replace(/\r\n/g, "\n"); dat = (dat || `DEFDAT ${progName(src)}\nENDDAT`).replace(/\r\n/g, "\n");
  const p = newProject({ name: files.map(f => f.name).join(" + "), cat: "Importados", src, dat, scene: cur() ? cur().scene : SCENES.pick });
  p.original = { src, dat, date: now(), files: files.map(f => f.name) };
  openProject(p.id); log("ok", `Importado: ${p.name}. O original foi guardado para comparação.`);
  if (importMode === "rev") { showPane("analise"); analyze(); } else { showPane("prog"); check(true); }
};

// ======================= CURSOS =======================
let openLesson = null;
function renderCourses() {
  const all = COURSES.flatMap(c => c.aulas), done = all.filter(a => store.progress.lessons[a.id]).length;
  $("courseProg").textContent = `${done}/${all.length} aulas`;
  if (openLesson) {
    const c = COURSES.find(c => c.aulas.some(a => a.id === openLesson)), a = c.aulas.find(a => a.id === openLesson), idx = c.aulas.indexOf(a);
    const ex = a.exemplo && EXAMPLES.find(e => e.id === a.exemplo);
    $("courses").innerHTML = `<div class="row"><button class="sm" id="lsBack">← Trilha</button><span class="note">Nível ${c.nivel} · ${c.titulo} · aula ${idx + 1}/${c.aulas.length}</span></div>
      <h2>${esc(a.titulo)}</h2><div class="lesson">${a.html}</div>
      <div class="row" style="margin-top:14px">${ex ? `<button class="pri" id="lsEx">Abrir exemplo: ${esc(ex.title)}</button>` : ""}
      <button id="lsDone">${store.progress.lessons[a.id] ? "✓ Concluída" : "Marcar como concluída"}</button>
      <button id="lsAsk">Perguntar ao Professor</button>${idx < c.aulas.length - 1 ? `<button id="lsNext">Próxima →</button>` : ""}</div>`;
    $("lsBack").onclick = () => { openLesson = null; renderCourses(); };
    if (ex) $("lsEx").onclick = () => openExample(ex);
    $("lsDone").onclick = () => { store.progress.lessons[a.id] = !store.progress.lessons[a.id]; markDirty(); renderCourses(); };
    $("lsAsk").onclick = () => { showPane("ia"); $("chatIn").value = `Sobre a aula "${a.titulo}": `; $("chatIn").focus(); };
    if ($("lsNext")) $("lsNext").onclick = () => { store.progress.lessons[a.id] = true; markDirty(); openLesson = c.aulas[idx + 1].id; renderCourses(); $("courses").scrollTop = 0; };
    return;
  }
  $("courses").innerHTML = `<div class="bar" style="margin-bottom:10px"><i style="width:${Math.round(100 * done / all.length)}%"></i></div>` + COURSES.map(c => {
    const d = c.aulas.filter(a => store.progress.lessons[a.id]).length;
    return `<div class="cat">Nível ${c.nivel} — ${c.titulo} <span class="badge ${d === c.aulas.length ? "ok" : ""}">${d}/${c.aulas.length}</span></div>` +
      c.aulas.map(a => `<div class="item" data-ls="${a.id}">${store.progress.lessons[a.id] ? "✓ " : ""}<b>${esc(a.titulo)}</b>${a.exemplo ? `<div class="meta">com exemplo prático</div>` : ""}</div>`).join("");
  }).join("");
}
$("courses").onclick = e => { const it = e.target.closest("[data-ls]"); if (it) { openLesson = it.dataset.ls; renderCourses(); $("courses").scrollTop = 0; } };

// ======================= EXERCÍCIOS =======================
let openEx = null;
function renderExercises() {
  const prog = store.progress.exercises, done = EXERCISES.filter(x => prog[x.id] && prog[x.id].best === 100).length;
  $("exProg").textContent = `${done}/${EXERCISES.length} completos`;
  if (openEx) {
    const x = EXERCISES.find(e => e.id === openEx), pr = prog[x.id], proj = store.projects.find(p => p.exercise === x.id);
    $("exercises").innerHTML = `<div class="row"><button class="sm" id="exBack">← Exercícios</button><span class="note">${esc(x.nivel)} · cenário: ${esc(SCENES[x.scene].nome)}</span></div>
      <h2>${esc(x.titulo)}</h2><p>${esc(x.enunciado)}</p>
      <h3>Critérios de avaliação</h3><div id="exCrit">${x.criterios.map(c => `<div class="crit"><b>•</b><div>${esc(c.txt)}</div></div>`).join("")}</div>
      <div class="row" style="margin-top:12px"><button class="pri exrun" id="exStart">${proj ? "Abrir meu programa" : "Começar exercício"}</button><button class="exrun" id="exEval" ${proj ? "" : "disabled"}>▶ Executar e avaliar</button>${proj ? `<button class="exrun danger" id="exRestart">Recomeçar do zero</button>` : ""}</div>
      ${pr ? `<p class="note">Melhor nota: <b>${pr.best}%</b> · ${pr.tries} tentativa(s) · última em ${dt(pr.date)}</p>` : ""}<div id="exResult"></div>`;
    $("exBack").onclick = () => { openEx = null; renderExercises(); };
    $("exStart").onclick = () => { startExercise(x, false); };
    if ($("exRestart")) $("exRestart").onclick = async () => { const ok = await ask("Recomeçar", "Apagar o seu programa deste exercício e começar do modelo inicial?", [{ label: "Cancelar", value: false }, { label: "Recomeçar", value: true, danger: true }]); if (ok) startExercise(x, true); };
    $("exEval").onclick = () => evaluate(x);
    return;
  }
  $("exercises").innerHTML = `<p class="note">Cada exercício abre um projeto próprio (categoria Exercícios) com o cenário certo. Escreva a solução e clique em "Executar e avaliar": o Korum executa o programa e confere cada critério.</p>` +
    EXERCISES.map(x => { const p = prog[x.id]; return `<div class="item" data-ex="${x.id}"><b>${esc(x.titulo)}</b> ${p ? `<span class="badge ${p.best === 100 ? "ok" : "warn"}">${p.best}%</span>` : ""}<div class="meta">${esc(x.nivel)} · ${x.criterios.length} critérios</div></div>`; }).join("");
}
$("exercises").onclick = e => { const it = e.target.closest("[data-ex]"); if (it) { openEx = it.dataset.ex; renderExercises(); } };
function startExercise(x, fresh) {
  let p = store.projects.find(q => q.exercise === x.id);
  if (p && fresh) { store.projects = store.projects.filter(q => q !== p); p = null; }
  if (!p) p = newProject({ name: "Exercício: " + x.titulo, cat: "Exercícios", src: x.src, dat: x.dat, scene: SCENES[x.scene], exercise: x.id });
  openProject(p.id); renderExercises(); showPane("prog"); log("info", `Exercício "${x.titulo}": ${x.enunciado}`);
}
async function evaluate(x) {
  let p = cur(); if (!p || p.exercise !== x.id) { p = store.projects.find(q => q.exercise === x.id); if (!p) return; openProject(p.id); }
  p.scene = clone(SCENES[x.scene]); applyScene(p.scene); resetCell(true);
  log("run", `Avaliação do exercício "${x.titulo}"`);
  const r = await runProgram(false);
  const ctx = { result: r, events: S.events, joints: S.joints.slice(), parts: parts.map(partPos), outs: S.outs.slice(), src: p.src, scene: p.scene };
  const res = x.criterios.map(c => { let ok = false; try { ok = !!c.f(ctx); } catch (e) { ok = false; } return { ...c, ok }; });
  const score = Math.round(100 * res.filter(c => c.ok).length / res.length);
  const pr = store.progress.exercises[x.id] || { best: 0, tries: 0 }; pr.tries++; pr.best = Math.max(pr.best, score); pr.date = now(); store.progress.exercises[x.id] = pr; markDirty();
  openEx = x.id; showPane("exerc");
  $("exResult").innerHTML = `<h3>Resultado: ${score}%</h3><div class="bar"><i style="width:${score}%;background:${score === 100 ? "var(--ok)" : "var(--warn)"}"></i></div>` +
    res.map(c => `<div class="crit ${c.ok ? "ok" : "no"}"><b>${c.ok ? "✓" : "✗"}</b><div>${esc(c.txt)}${c.ok ? "" : `<small>Dica: ${esc(c.dica)}</small>`}</div></div>`).join("") +
    (score === 100 ? `<p style="color:var(--ok)"><b>Parabéns! Exercício concluído.</b></p>` : `<p class="note">Corrija os itens marcados com ✗ e avalie de novo. Em dúvida, pergunte ao Professor.</p>`);
  log(score === 100 ? "ok" : "warn", `Nota do exercício "${x.titulo}": ${score}%`);
}

// ======================= CENÁRIO =======================
let sceneDraft = null;
$("scenePreset").innerHTML = `<option value="">— escolher modelo —</option>` + Object.entries(SCENES).map(([k, s]) => `<option value="${k}">${esc(s.nome)}</option>`).join("");
$("scenePreset").onchange = () => { const k = $("scenePreset").value; if (k) { sceneDraft = clone(SCENES[k]); renderSceneEditor(true); } $("scenePreset").value = ""; };
function renderSceneEditor(keep) {
  const p = cur(); if (!p) return; if (!keep || !sceneDraft) sceneDraft = clone(p.scene);
  const num = (path, v, w = 62) => `<input type="number" data-s="${path}" value="${v}" style="width:${w}px">`;
  $("sceneObjs").innerHTML = sceneDraft.objetos.map((o, i) => `<div class="item" style="cursor:default"><div class="row" style="margin:0 0 4px"><select data-s="o.${i}.tipo">${["mesa", "esteira", "palete", "maquina", "bloco"].map(t => `<option ${t === o.tipo ? "selected" : ""}>${t}</option>`).join("")}</select><input type="text" data-s="o.${i}.nome" value="${esc(o.nome)}" style="flex:1"><button class="sm danger" data-sdel="o.${i}">✕</button></div>
    <div class="row" style="margin:0"><label>X</label>${num(`o.${i}.x`, o.x)}<label>Y</label>${num(`o.${i}.y`, o.y)}<label>L</label>${num(`o.${i}.w`, o.w, 56)}<label>P</label>${num(`o.${i}.d`, o.d, 56)}<label>A</label>${num(`o.${i}.h`, o.h, 56)}</div></div>`).join("") || `<p class="note">Nenhum objeto.</p>`;
  $("sceneParts").innerHTML = sceneDraft.pecas.map((q, i) => `<div class="row"><label>Peça ${i + 1}</label><label>X</label>${num(`p.${i}.0`, q[0])}<label>Y</label>${num(`p.${i}.1`, q[1])}<button class="sm danger" data-sdel="p.${i}">✕</button></div>`).join("") || `<p class="note">Nenhuma peça.</p>`;
}
document.getElementById("p-cena").addEventListener("change", e => {
  const s = e.target.dataset.s; if (!s) return; const [k, i, f] = s.split(".");
  if (k === "o") sceneDraft.objetos[+i][f] = e.target.type === "number" ? +e.target.value : e.target.value; else sceneDraft.pecas[+i][+f] = +e.target.value;
});
document.getElementById("p-cena").addEventListener("click", e => { const s = e.target.dataset.sdel; if (!s) return; const [k, i] = s.split("."); (k === "o" ? sceneDraft.objetos : sceneDraft.pecas).splice(+i, 1); renderSceneEditor(true); });
$("bAddObj").onclick = () => { const t = $("newObjType").value; const dims = { mesa: [350, 500, 150], esteira: [440, 310, 150], palete: [320, 320, 120], maquina: [420, 300, 420], bloco: [150, 150, 150] }[t]; sceneDraft.objetos.push({ tipo: t, nome: t[0].toUpperCase() + t.slice(1), x: 500, y: 400, w: dims[0], d: dims[1], h: dims[2] }); renderSceneEditor(true); };
$("bAddPart").onclick = () => { sceneDraft.pecas.push([575, 0]); renderSceneEditor(true); };
$("bSceneApply").onclick = () => {
  if (S.running) return; const p = cur();
  for (const o of sceneDraft.objetos) { if (Math.hypot(o.x, o.y) < Math.max(o.w, o.d) / 2 + 120 && Math.abs(o.x) < o.w / 2 + 130 && Math.abs(o.y) < o.d / 2 + 130) { log("warn", `${o.nome} ocupa a base do robô — ajuste X/Y.`); } }
  p.scene = clone(sceneDraft); applyScene(p.scene); resetCell(true); markDirty(); log("ok", `Cenário aplicado: ${p.scene.objetos.length} objeto(s), ${p.scene.pecas.length} peça(s).`);
};

// ======================= TRAJETO POR PONTOS (marcação com o mouse) =======================
const TRC = { pegar: 0x3f86d6, soltar: 0x43c37a, passar: 0xf2b33d };
const TRN = { pegar: "Pegar", soltar: "Soltar", passar: "Passar por" };
let trMarking = false, trSel = -1;
const trGroup = new THREE.Group(); root.add(trGroup);
const ray = new THREE.Raycaster();
function trOpts() { const p = cur(); p.trOpt = p.trOpt || { aprox: 150, vel: 0.4, rep: 1, home: true }; return p.trOpt; }
function topAt(x, y) { let z = 0; for (const o of cur().scene.objetos) if (Math.abs(x - o.x) < o.w / 2 && Math.abs(y - o.y) < o.d / 2) z = Math.max(z, o.h); return z; }
const r1 = v => Math.round(v * 10) / 10;
function setMarking(on) { if (!on && typeof hoverG !== "undefined") { hoverG.visible = false; clearGroup(hoverG); } trMarking = on; $("trMark").classList.toggle("on", on); $("trMark").textContent = on ? "🖱 Marcar pontos: LIGADO (clique no 3D)" : "🖱 Marcar pontos: desligado"; view.classList.toggle("marking", on); }
$("trMark").onclick = () => setMarking(!trMarking);
let trDown = null;
renderer.domElement.addEventListener("pointerdown", e => { trDown = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener("pointerup", e => {
  if (!trMarking || !trDown || S.running) return;
  if (Math.hypot(e.clientX - trDown[0], e.clientY - trDown[1]) > 5) return; // foi um arraste de câmera
  trPick(e);
});
function trPick(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  ray.setFromCamera(new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1), camera);
  const free = parts.filter(q => q.parent === root), meshes = [];
  cellGroup.traverse(o => { if (o.isMesh) meshes.push(o); });
  const hit = ray.intersectObjects([...free, ...meshes, floor], false)[0]; if (!hit) return;
  const w = root.worldToLocal(hit.point.clone()), p = cur(); if (!p.trajeto) p.trajeto = [];
  const T = p.trajeto, sel = $("trNext").value, pend = T.filter(t => t.acao === "pegar").length > T.filter(t => t.acao === "soltar").length;
  const lastA = (T.slice().reverse().find(t => t.acao === "pegar") || {}).a || 0;
  let pt;
  if (free.includes(hit.object)) {
    const q = hit.object.position, d = pdim(hit.object), yaw = Math.round(hit.object.rotation.z * RL.R2D);
    const ac = sel === "auto" ? (pend ? "soltar" : "pegar") : sel;
    if (ac === "pegar") pt = { x: q.x, y: q.y, z: q.z, a: yaw, acao: "pegar" };
    else if (ac === "soltar") pt = { x: q.x, y: q.y, z: q.z + d.h / 2 + 30, a: lastA, acao: "soltar" }; // empilhar em cima
    else pt = { x: q.x, y: q.y, z: q.z + d.h / 2 + 200, a: lastA, acao: "passar" };
  } else {
    const top = topAt(w.x, w.y), ac = sel === "auto" ? (pend ? "soltar" : "passar") : sel;
    pt = { x: w.x, y: w.y, z: ac === "passar" ? top + 225 : top + 30, a: ac === "pegar" ? 0 : lastA, acao: ac };
  }
  pt.x = r1(pt.x); pt.y = r1(pt.y); pt.z = r1(pt.z);
  T.push(pt); trSel = T.length - 1; trChanged();
  log("info", `Ponto T${T.length} (${TRN[pt.acao]}) marcado em X ${pt.x} Y ${pt.y} Z ${pt.z}.`);
}
function trCheck(t) {
  const o = trOpts(), tool = RL.frameToMat(RL.DEFAULT_TOOL);
  const chk = z => { const r = RL.ik(RL.mul(RL.frameToMat({ X: t.x, Y: t.y, Z: z, A: t.a || 0, B: 90, C: 0 }), RL.inv(tool)), RL.HOME); if (!r.ok) return r.reason; const c = RL.checkCollision(r.j, tool); return c ? `colisão de ${c.part} com ${c.obstacle.nome}` : null; };
  const e1 = chk(t.z); if (e1) return e1;
  if (t.acao !== "passar") { const e2 = chk(t.z + o.aprox); if (e2) return "aproximação: " + e2; }
  return null;
}
const GEN_MARK = "; Programa gerado pela aba Trajeto";
function trGenerate() {
  const p = cur(), o = trOpts(), T = p.trajeto || []; if (!T.length) return;
  if (!p.src.includes(GEN_MARK)) saveVersion("Antes de gerar pelo Trajeto", true);
  const n = p.src.includes(GEN_MARK) ? progName(p.src) : "trajeto";
  const pos = (t, dz) => `{X ${r1(t.x)}, Y ${r1(t.y)}, Z ${r1(t.z + dz)}, A ${r1(t.a || 0)}, B 90, C 0}`;
  const rep = Math.max(1, Math.round(+o.rep || 1)), ind = rep > 1 ? "    " : "  ", L = [], D = [];
  L.push(`DEF ${n}()`, `  ${GEN_MARK} (marcação de pontos com o mouse).`, "  ; Para mudar o trajeto, edite os pontos na aba Trajeto.");
  if (rep > 1) L.push("  DECL INT ciclo");
  L.push("  INI", `  $VEL.CP = ${Math.max(0.01, Math.min(2, +o.vel || 0.4))}`);
  if (o.home) L.push("  PTP HOME");
  L.push("  $OUT[1] = FALSE                ; garra aberta no início");
  if (rep > 1) L.push(`  FOR ciclo = 1 TO ${rep}`);
  T.forEach((t, i) => {
    const nm = "T" + (i + 1);
    D.push(`  DECL E6POS ${nm} = ${pos(t, 0)}`);
    if (t.acao === "passar") { L.push("", `${ind}; ${i + 1}. passar por`, `${ind}PTP ${nm}`); return; }
    D.push(`  DECL E6POS ${nm}_APROX = ${pos(t, +o.aprox || 150)}`);
    L.push("", `${ind}; ${i + 1}. ${t.acao}`, `${ind}PTP ${nm}_APROX`, `${ind}LIN ${nm}`, `${ind}$OUT[1] = ${t.acao === "pegar" ? "TRUE " : "FALSE"}           ; ${t.acao === "pegar" ? "fecha" : "abre"} a garra`, `${ind}WAIT SEC 0.3`, `${ind}LIN ${nm}_APROX`);
  });
  if (rep > 1) L.push("  ENDFOR");
  L.push("");
  if (o.home) L.push("  PTP HOME");
  L.push("END");
  p.src = L.join("\n"); p.dat = `DEFDAT ${n}\n  ; pontos marcados com o mouse (aba Trajeto)\n${D.join("\n")}\nENDDAT`;
  p.blocks = null; setFile(S.file); updateNames(); markDirty();
}
function trChanged() { trGenerate(); trRender(); trDraw(); previewPoints(); }
function trRender() {
  const p = cur(); if (!p) return; const T = p.trajeto || [], o = trOpts();
  $("trajN").textContent = `${T.length} ponto(s)`;
  $("trAprox").value = o.aprox; $("trVel").value = o.vel; $("trRep").value = o.rep; $("trHome").checked = !!o.home;
  if (!T.length) { $("trList").innerHTML = `<p class="note">Nenhum ponto ainda. Ligue "Marcar pontos" e clique numa peça no 3D (o robô vai pegá-la) e depois na esteira ou na mesa (ele vai soltar ali). Pode marcar quantos pontos quiser.</p>`; return; }
  $("trList").innerHTML = T.map((t, i) => { const er = trCheck(t);
    return `<div class="trp ${i === trSel ? "sel" : ""}" data-ti="${i}"><span class="num" style="background:#${TRC[t.acao].toString(16).padStart(6, "0")}">${i + 1}</span>
      <select data-tf="acao">${Object.keys(TRN).map(k => `<option value="${k}" ${k === t.acao ? "selected" : ""}>${TRN[k]}</option>`).join("")}</select>
      <span class="xyz">${["x", "y", "z", "a"].map(k => `<span class="pr"><label>${k === "a" ? "giro°" : k.toUpperCase()}</label><input type="number" data-tf="${k}" value="${r1(t[k] || 0)}" step="${k === "a" ? 90 : 5}"></span>`).join("")}</span>
      <span class="bt"><button data-tm="-1" title="Subir na ordem">↑</button><button data-tm="1" title="Descer na ordem">↓</button><button data-tx class="danger" title="Excluir ponto">✕</button></span>
      <span class="st" style="color:${er ? "var(--err)" : "var(--ok)"}">${er ? "⚠ " + esc(er) : "✓ alcançável"}</span></div>`; }).join("") +
    `<p class="note">Clique num ponto da lista para destacá-lo no 3D. Os números podem ser ajustados à mão (mm e graus).</p>`;
}
$("trList").addEventListener("change", e => {
  const f = e.target.dataset.tf, row = e.target.closest("[data-ti]"); if (!f || !row) return;
  const t = cur().trajeto[+row.dataset.ti]; t[f] = f === "acao" ? e.target.value : +e.target.value; trChanged();
});
$("trList").addEventListener("click", e => {
  const row = e.target.closest("[data-ti]"); if (!row) return; const i = +row.dataset.ti, T = cur().trajeto;
  if (e.target.dataset.tm !== undefined) { const j = i + +e.target.dataset.tm; if (j >= 0 && j < T.length) { [T[i], T[j]] = [T[j], T[i]]; trSel = j; trChanged(); } return; }
  if (e.target.dataset.tx !== undefined) { T.splice(i, 1); trSel = -1; if (T.length) trChanged(); else { trRender(); trDraw(); } log("info", `Ponto T${i + 1} excluído; os seguintes foram renumerados.`); return; }
  if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") { trSel = i; trRender(); trDraw(); }
});
[["trAprox", "aprox"], ["trVel", "vel"], ["trRep", "rep"]].forEach(([id, k]) => $(id).onchange = () => { trOpts()[k] = +$(id).value; if ((cur().trajeto || []).length) trChanged(); });
$("trHome").onchange = () => { trOpts().home = $("trHome").checked; if ((cur().trajeto || []).length) trChanged(); };
$("trRun").onclick = () => { if (S.running) return; if (!(cur().trajeto || []).length) return toast("Marque pelo menos um ponto"); resetCell(true); runProgram(false); };
$("trCode").onclick = () => { showPane("prog"); setFile("src"); };
$("trClear").onclick = async () => { const T = cur().trajeto || []; if (!T.length) return; const ok = await ask("Apagar pontos", `Apagar os ${T.length} pontos do trajeto? O programa atual continua no editor e no histórico de versões.`, [{ label: "Cancelar", value: false }, { label: "Apagar", value: true, danger: true }]); if (ok) { cur().trajeto = []; trSel = -1; trRender(); trDraw(); } };
// pontos alvo de clique (esferas invisíveis maiores) e desenho com haste até a superfície
let trPick3D = [];
function surfUnder(x, y, excl) { // superfície abaixo do ponto (objetos e peças soltas)
  let z = 0, nome = "o chão";
  for (const o of cur().scene.objetos) if (Math.abs(x - o.x) < o.w / 2 && Math.abs(y - o.y) < o.d / 2 && o.h > z) { z = o.h; nome = o.nome; }
  for (const q of parts) if (q.parent === root && q !== excl) { const d = pdim(q); if (Math.abs(q.position.x - x) < d.wx / 2 && Math.abs(q.position.y - y) < d.wy / 2 && q.position.z + d.h / 2 > z) { z = q.position.z + d.h / 2; nome = "a peça"; } }
  return { z, nome };
}
function partNear(x, y, z, tol) { let b = null, bd = tol; for (const q of parts) if (q.parent === root) { const d = Math.hypot(q.position.x - x, q.position.y - y, (z === null ? 0 : q.position.z - z)); if (d < bd) { bd = d; b = q; } } return b; }
function heldSize(i) { const T = cur().trajeto; for (let j = i - 1; j >= 0; j--) if (T[j].acao === "pegar") { const q = partNear(T[j].x, T[j].y, T[j].z, 40); return q ? q.userData.size || [50, 50, 50] : [50, 50, 50]; } return [50, 50, 50]; }
function surfaceHit(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  ray.setFromCamera(new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1), camera);
  const free = parts.filter(q => q.parent === root), meshes = []; cellGroup.traverse(o => { if (o.isMesh) meshes.push(o); });
  const h = ray.intersectObjects([...free, ...meshes, floor], false)[0]; if (!h) return null;
  return { w: root.worldToLocal(h.point.clone()), part: free.includes(h.object) ? h.object : null };
}
function trDraw() {
  clearGroup(trGroup); trPick3D = []; const p = cur(); const T = (p && p.trajeto) || []; if (!T.length) { trInfo(); return; } const o = trOpts();
  const path = [];
  T.forEach((t, i) => {
    const bad = !!trCheck(t), c = bad ? 0xff4040 : TRC[t.acao], big = i === trSel;
    const m = new THREE.Mesh(new THREE.SphereGeometry(big ? 18 : 13, 20, 14), new THREE.MeshBasicMaterial({ color: c, depthTest: false, transparent: true, opacity: 0.95 })); m.renderOrder = 20; m.position.set(t.x, t.y, t.z); trGroup.add(m);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(big ? 26 : 20, 20, 14), new THREE.MeshBasicMaterial({ color: 0xffffff, depthTest: false, transparent: true, opacity: big ? 0.35 : 0.18 })); halo.renderOrder = 19; halo.position.copy(m.position); trGroup.add(halo);
    const hit = new THREE.Mesh(new THREE.SphereGeometry(34, 10, 8), new THREE.MeshBasicMaterial({ visible: false })); hit.position.set(t.x, t.y, t.z); hit.userData.ti = i; trGroup.add(hit); trPick3D.push(hit);
    if (big) { const ring = new THREE.Mesh(new THREE.TorusGeometry(30, 3, 8, 32), new THREE.MeshBasicMaterial({ color: 0xffffff })); ring.position.set(t.x, t.y, t.z); trGroup.add(ring); }
    // haste até a superfície e "sombra" no apoio: ajudam a ver altura e posição
    const s = surfUnder(t.x, t.y, t.acao === "pegar" ? partNear(t.x, t.y, t.z, 35) : null);
    const g0 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(t.x, t.y, t.z), new THREE.Vector3(t.x, t.y, s.z + 1)]);
    trGroup.add(new THREE.Line(g0, new THREE.LineBasicMaterial({ color: 0xbfc8d4, transparent: true, opacity: 0.8 })));
    const sh = new THREE.Mesh(new THREE.RingGeometry(10, 22, 28), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.6, side: THREE.DoubleSide })); sh.position.set(t.x, t.y, s.z + 1.5); trGroup.add(sh);
    if (t.acao === "soltar") { // "fantasma" da peça exatamente onde ela vai ficar
      const sz = heldSize(i), g = new THREE.BoxGeometry(sz[0], sz[1], sz[2]);
      const gm = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x43c37a, transparent: true, opacity: big ? 0.32 : 0.14, depthWrite: false })); gm.position.set(t.x, t.y, t.z - 5); gm.rotation.z = (t.a || 0) * RL.D2R; trGroup.add(gm);
      const ed = new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: 0x7dffa8, transparent: true, opacity: big ? 1 : 0.5 })); ed.position.copy(gm.position); ed.rotation.copy(gm.rotation); trGroup.add(ed);
    }
    if (t.acao === "pegar") { const pp = partNear(t.x, t.y, t.z, 35); if (pp) { const d = pp.userData.size || [50, 50, 50], g = new THREE.BoxGeometry(d[0] + 10, d[1] + 10, d[2] + 10);
      const ed = new THREE.LineSegments(new THREE.EdgesGeometry(g), new THREE.LineBasicMaterial({ color: big ? 0xffe14d : 0x8fb8e8, depthTest: false })); ed.renderOrder = 21; ed.position.copy(pp.position); ed.rotation.z = pp.rotation.z; trGroup.add(ed); } }
    const up = t.acao === "passar" ? t.z : t.z + (+o.aprox || 150);
    if (t.acao !== "passar") { const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(t.x, t.y, t.z), new THREE.Vector3(t.x, t.y, up)]); const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color: c, dashSize: 12, gapSize: 8 })); l.computeLineDistances(); trGroup.add(l); }
    path.push(new THREE.Vector3(t.x, t.y, up));
    label(trGroup, `${i + 1} · ${{ pegar: "pega aqui", soltar: "solta aqui", passar: "passa aqui" }[t.acao]}${big ? ` · ${Math.round(t.z - s.z)} mm acima` : ""}`, [t.x, t.y, up + 30], "lbl", "#" + c.toString(16).padStart(6, "0"), "ponto");
  });
  if (path.length > 1) { const g = new THREE.BufferGeometry().setFromPoints(path); const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 20, gapSize: 12, transparent: true, opacity: 0.7 })); l.computeLineDistances(); trGroup.add(l); }
  const ts = T[trSel];
  if (ts && $("trGuides").checked) { // grade milimetrada (linhas a cada 50 mm, mais fortes a cada 100) e guias X/Y no ponto selecionado
    const sz = surfUnder(ts.x, ts.y).z + 1.2, cx = Math.round(ts.x / 50) * 50, cy = Math.round(ts.y / 50) * 50, R0 = 300, pts = [], pts2 = [];
    for (let k = -R0; k <= R0; k += 50) { const arr = (cx + k) % 100 === 0 ? pts2 : pts; arr.push(new THREE.Vector3(cx + k, cy - R0, sz), new THREE.Vector3(cx + k, cy + R0, sz)); const arr2 = (cy + k) % 100 === 0 ? pts2 : pts; arr2.push(new THREE.Vector3(cx - R0, cy + k, sz), new THREE.Vector3(cx + R0, cy + k, sz)); }
    trGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x9fb4c8, transparent: true, opacity: 0.25 })));
    trGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts2), new THREE.LineBasicMaterial({ color: 0xcfe0f0, transparent: true, opacity: 0.5 })));
    const gx = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ts.x - 260, ts.y, ts.z), new THREE.Vector3(ts.x + 260, ts.y, ts.z)]);
    const gy = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ts.x, ts.y - 260, ts.z), new THREE.Vector3(ts.x, ts.y + 260, ts.z)]);
    const lx = new THREE.Line(gx, new THREE.LineBasicMaterial({ color: 0xff6060, depthTest: false })), ly = new THREE.Line(gy, new THREE.LineBasicMaterial({ color: 0x50d070, depthTest: false })); lx.renderOrder = ly.renderOrder = 18; trGroup.add(lx, ly);
    label(trGroup, "X+", [ts.x + 280, ts.y, ts.z], "lbl ax", "#ff6060", "ponto"); label(trGroup, "Y+", [ts.x, ts.y + 280, ts.z], "lbl ax", "#50d070", "ponto");
  }
  trInfo();
}
// painel de leitura (X, Y, Z, altura sobre a superfície, distância da base, alcance)
function trInfo() {
  const box = $("trInfo"), p = cur(), t = p && p.trajeto && p.trajeto[trSel];
  if (!t || (S.pane !== "traj" && !trDrag)) { box.style.display = "none"; return; }
  const pk = t.acao === "pegar" ? partNear(t.x, t.y, t.z, 35) : null, s = surfUnder(t.x, t.y, pk), er = trCheck(t), dist = Math.hypot(t.x, t.y);
  box.style.display = "block";
  box.innerHTML = `<b>Ponto ${trSel + 1} · ${TRN[t.acao]}</b>${trDrag ? ` <span class="tm">${trDrag.mode === "z" ? "arrastando ALTURA" : "arrastando POSIÇÃO"}${trDrag.fine ? " · PRECISÃO" : ""}</span>` : ""}<br>
    X <b>${Math.round(t.x)}</b> · Y <b>${Math.round(t.y)}</b> · Z <b>${Math.round(t.z)}</b> mm<br>
    ${t.acao === "pegar" ? (pk ? `Pega a peça pelo centro · ${Math.round(t.z - s.z)} mm acima de ${esc(s.nome === "o chão" ? "o chão" : s.nome)}<br>` : `<span style="color:#ffb066">Sem peça neste ponto: a garra vai fechar vazia</span><br>`) : `Altura: <b>${Math.round(t.z - s.z)} mm</b> acima de ${esc(s.nome)}${t.acao === "soltar" ? " (a peça fica apoiada)" : ""}<br>`}
    Distância da base do robô: <b>${Math.round(dist)} mm</b><br>
    <span style="color:${er ? "#ff7070" : "#5fe08f"}">${er ? "⚠ " + esc(er) : "✓ alcançável"}</span>
    <div class="tk">Arraste para mover · <b>Shift</b> + arrastar: altura · segure <b>Ctrl</b> para precisão (5× mais lento) · setas: ±5 mm · PgUp/PgDn: altura · F: focar no ponto</div>`;
}
// ----- arrastar pontos -----
let trDrag = null, trDragMode = "xy";
function localRay(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  ray.setFromCamera(new THREE.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1), camera);
  root.updateMatrixWorld(); const inv = root.matrixWorld.clone().invert();
  return ray.ray.clone().applyMatrix4(inv);
}
function hitMarker(ev) { // escolhe o ponto mais próximo do cursor NA TELA (raio de 22 px), mesmo atrás de objetos
  if (!trPick3D.length) return null;
  const r = renderer.domElement.getBoundingClientRect(); let best = null, bd = 22;
  for (const h of trPick3D) { const v = h.position.clone(); root.localToWorld(v); v.project(camera); if (v.z > 1) continue;
    const sx = r.left + (v.x + 1) / 2 * r.width, sy = r.top + (1 - v.y) / 2 * r.height, d = Math.hypot(sx - ev.clientX, sy - ev.clientY);
    if (d < bd) { bd = d; best = h.userData.ti; } }
  return best;
}
function snapPoint(t) {
  if (!$("trSnap").checked) return;
  if (t.acao === "pegar") { // gruda no centro da peça mais próxima
    let best = null, bd = 60; for (const q of parts) if (q.parent === root) { const d = Math.hypot(q.position.x - t.x, q.position.y - t.y); if (d < bd) { bd = d; best = q; } }
    if (best) { t.x = r1(best.position.x); t.y = r1(best.position.y); t.z = r1(best.position.z); t.a = Math.round(best.rotation.z * RL.R2D); }
  } else if (t.acao === "soltar") t.z = r1(surfUnder(t.x, t.y).z + 30); // apoia na superfície (peça 5 mm acima)
}
view.addEventListener("pointerdown", e => {
  if (S.running || e.button !== 0 || e.target !== renderer.domElement) return;
  const i = hitMarker(e); if (i === null) return;
  e.stopPropagation(); e.preventDefault(); renderer.domElement.setPointerCapture(e.pointerId);
  const t = cur().trajeto[i]; trSel = i; trDown = null; controls.enabled = false;
  if (!cur().trSaved) { saveVersion("Antes de arrastar pontos do Trajeto"); }
  const mode = e.shiftKey || trDragMode === "z" ? "z" : "xy";
  let plane;
  if (mode === "xy") plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -t.z);
  else { const d = new THREE.Vector3(); camera.getWorldDirection(d); root.updateMatrixWorld(); d.transformDirection(root.matrixWorld.clone().invert()); d.z = 0; if (d.lengthSq() < 1e-6) d.set(1, 0, 0); d.normalize(); plane = new THREE.Plane().setFromNormalAndCoplanarPoint(d, new THREE.Vector3(t.x, t.y, t.z)); }
  const p0 = localRay(e).intersectPlane(plane, new THREE.Vector3());
  trDrag = { i, mode, plane, start: p0 ? p0.clone() : null, t0: { ...t }, moved: false, hRel: Math.max(60, t.z - surfUnder(t.x, t.y).z) };
  if (S.pane === "traj") trRender(); trDraw();
}, true);
window.addEventListener("pointermove", e => {
  if (!trDrag && trMarking && e.target === renderer.domElement && !S.running) hoverPreview(e); else if (!trMarking && hoverG.visible) hoverG.visible = false;
  if (!trDrag) { // cursor de "mãozinha" sobre os pontos
    if (e.target === renderer.domElement && !S.running && trPick3D.length) { const now = performance.now(); if (now - (trDrag && 0 || window.__trHov || 0) > 60) { window.__trHov = now; renderer.domElement.style.cursor = hitMarker(e) !== null ? "grab" : (trMarking ? "crosshair" : ""); } }
    return;
  }
  const pt = localRay(e).intersectPlane(trDrag.plane, new THREE.Vector3()); if (!pt || !trDrag.start) return;
  const t = cur().trajeto[trDrag.i], fine = e.ctrlKey || e.altKey ? 0.2 : 1; trDrag.moved = true;
  const d = pt.clone().sub(trDrag.last || trDrag.start).multiplyScalar(fine); trDrag.last = pt;
  trDrag.raw = trDrag.raw || { x: trDrag.t0.x, y: trDrag.t0.y, z: trDrag.t0.z }; trDrag.fine = fine < 1;
  const stp = +$("trStep").value || 0, q = v => stp ? Math.round(v / stp) * stp : r1(v);
  if (trDrag.mode === "xy" && fine === 1) { // segue o cursor sobre a superfície (esteira, mesa, palete, peças, chão)
    const h = surfaceHit(e);
    if (h) {
      if (t.acao === "pegar" && h.part && $("trSnap").checked) { t.x = r1(h.part.position.x); t.y = r1(h.part.position.y); t.z = r1(h.part.position.z); t.a = Math.round(h.part.rotation.z * RL.R2D); }
      else { t.x = q(h.w.x); t.y = q(h.w.y);
        if (!$("trSnap").checked) t.z = trDrag.t0.z;
        else if (t.acao === "soltar") t.z = r1(surfUnder(t.x, t.y).z + 30);
        else if (t.acao === "passar") t.z = r1(surfUnder(t.x, t.y).z + trDrag.hRel);
        else snapPoint(t); }
      trDrag.raw = { x: t.x, y: t.y, z: t.z };
    }
  } else if (trDrag.mode === "xy") { trDrag.raw.x += d.x; trDrag.raw.y += d.y; t.x = q(trDrag.raw.x); t.y = q(trDrag.raw.y); t.z = trDrag.t0.z; snapPoint(t); }
  else { trDrag.raw.z = Math.max(0, trDrag.raw.z + d.z); t.z = q(trDrag.raw.z); }
  renderer.domElement.style.cursor = "grabbing"; trDraw(); trLiveRow(trDrag.i);
});
// prévia de onde o próximo clique vai criar o ponto
const hoverG = new THREE.Group(); hoverG.visible = false; root.add(hoverG); let hovT = 0;
function hoverPreview(e) {
  const now = performance.now(); if (now - hovT < 35) return; hovT = now;
  clearGroup(hoverG); const h = surfaceHit(e); if (!h || hitMarker(e) !== null) { hoverG.visible = false; return; }
  const T = cur().trajeto || [], sel = $("trNext").value, pend = T.filter(t => t.acao === "pegar").length > T.filter(t => t.acao === "soltar").length;
  const ac = h.part ? (sel === "auto" ? (pend ? "soltar" : "pegar") : sel) : (sel === "auto" ? (pend ? "soltar" : "passar") : sel);
  const c = TRC[ac], x = h.part ? h.part.position.x : h.w.x, y = h.part ? h.part.position.y : h.w.y, sz = surfUnder(x, y).z;
  const ring = new THREE.Mesh(new THREE.RingGeometry(16, 26, 32), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.9, side: THREE.DoubleSide, depthTest: false })); ring.renderOrder = 22; ring.position.set(x, y, sz + 2); hoverG.add(ring);
  const cross = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x - 40, y, sz + 2), new THREE.Vector3(x + 40, y, sz + 2), new THREE.Vector3(x, y - 40, sz + 2), new THREE.Vector3(x, y + 40, sz + 2)]), new THREE.LineBasicMaterial({ color: c, depthTest: false })); cross.renderOrder = 22; hoverG.add(cross);
  if (h.part && ac === "pegar") { const d = h.part.userData.size || [50, 50, 50], ed = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(d[0] + 10, d[1] + 10, d[2] + 10)), new THREE.LineBasicMaterial({ color: 0xffe14d, depthTest: false })); ed.renderOrder = 22; ed.position.copy(h.part.position); ed.rotation.z = h.part.rotation.z; hoverG.add(ed); }
  if (ac === "soltar") { const s3 = heldSize(T.length), g = new THREE.BoxGeometry(s3[0], s3[1], s3[2]), gm = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.25, depthWrite: false })); gm.position.set(x, y, sz + s3[2] / 2); hoverG.add(gm); }
  label(hoverG, `clique: ${TRN[ac].toLowerCase()} · X ${Math.round(x)} Y ${Math.round(y)}`, [x, y, sz + 70], "lbl", "#" + c.toString(16).padStart(6, "0"), "ponto");
  hoverG.visible = true;
}
function trLiveRow(i) { const row = document.querySelector(`#trList [data-ti="${i}"]`), t = cur().trajeto[i]; if (!row || !t) return; row.querySelectorAll("input[data-tf]").forEach(inp => inp.value = r1(t[inp.dataset.tf] || 0)); }
window.addEventListener("pointerup", () => {
  if (!trDrag) return; const dr = trDrag; trDrag = null; controls.enabled = true; renderer.domElement.style.cursor = "";
  if (dr.moved) { const t = cur().trajeto[dr.i]; trChanged(); log("info", `Ponto T${dr.i + 1} movido para X ${t.x} Y ${t.y} Z ${t.z}.`); } else { trRender(); trDraw(); }
});
// teclado: ajuste fino do ponto selecionado
document.addEventListener("keydown", e => {
  if (S.pane !== "traj" || S.running || trSel < 0 || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  const t = (cur().trajeto || [])[trSel]; if (!t) return; const st = e.shiftKey ? 20 : 5;
  const m = { ArrowUp: ["x", st], ArrowDown: ["x", -st], ArrowLeft: ["y", st], ArrowRight: ["y", -st], PageUp: ["z", st], PageDown: ["z", -st] }[e.key];
  if (!m) return; e.preventDefault(); t[m[0]] = r1(t[m[0]] + m[1]); clearTimeout(window.__trK); trRender(); trDraw(); window.__trK = setTimeout(trChanged, 400);
});
function camOn(target, offset) { const w = new THREE.Vector3(target.x, target.y, target.z); root.localToWorld(w); controls.target.copy(w); camera.position.copy(w.clone().add(new THREE.Vector3(...offset))); controls.update(); document.querySelectorAll("[data-cam]").forEach(b => b.classList.remove("on")); }
const selPt = () => (cur().trajeto || [])[trSel] || (cur().trajeto || [])[0];
$("trTop").onclick = () => { const t = selPt() || { x: 400, y: 0, z: 150 }; camOn(t, [0, 1.3, 0.001]); };
$("trSide").onclick = () => { const t = selPt() || { x: 400, y: 0, z: 150 }; const w = new THREE.Vector3(t.x, t.y, t.z); root.localToWorld(w); const d = new THREE.Vector3(w.x, 0, w.z).normalize(); camOn(t, [d.z * 1.1 + d.x * 0.35, 0.18, -d.x * 1.1 + d.z * 0.35]); };
$("trFocus").onclick = () => { const t = selPt(); if (!t) return toast("Selecione um ponto"); camOn(t, [0.45, 0.4, 0.45]); };
document.addEventListener("keydown", e => { if (S.pane === "traj" && (e.key === "f" || e.key === "F") && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) $("trFocus").click(); });
$("trGuides").onchange = () => trDraw();
$("trNudge").addEventListener("click", e => {
  const b = e.target.closest("[data-nd]"); if (!b || S.running) return; const T = cur().trajeto || []; if (!T.length) return toast("Marque um ponto primeiro");
  if (trSel < 0 || !T[trSel]) trSel = T.length - 1; const t = T[trSel], [k, sg] = b.dataset.nd.split(","), st = k === "a" ? 90 : +$("trNStep").value;
  t[k] = r1((t[k] || 0) + (+sg) * st); if (k === "z") t.z = Math.max(0, t.z);
  trRender(); trDraw(); clearTimeout(window.__trNd); window.__trNd = setTimeout(trChanged, 350);
});
$("trModeXY").onclick = () => { trDragMode = "xy"; $("trModeXY").classList.add("on"); $("trModeZ").classList.remove("on"); };
$("trModeZ").onclick = () => { trDragMode = "z"; $("trModeZ").classList.add("on"); $("trModeXY").classList.remove("on"); };

// ======================= ANÁLISE / ENGENHARIA REVERSA =======================
function renderRevInfo() {
  const p = cur(); $("revOrig").textContent = p && p.original ? `Original guardado: ${(p.original.files || []).join(" + ") || "importação"} em ${dt(p.original.date)}.` : "Este projeto não tem original importado: a comparação usa a primeira versão do histórico.";
}
$("bRevDiff").onclick = () => { const p = cur(); const o = p.original || p.versions[0]; showDiff(p.original ? "Original importado → atual" : "Primeira versão → atual", o, p); };
$("bRevRestore").onclick = async () => {
  const p = cur(); const o = p.original || p.versions[0];
  const ok = await ask("Restaurar original", "Voltar o programa ao original? O estado atual vai para o histórico.", [{ label: "Cancelar", value: false }, { label: "Restaurar", value: true, danger: true }]);
  if (!ok) return; saveVersion("Antes de restaurar o original"); p.src = o.src; p.dat = o.dat; setFile("src"); previewPoints(); markDirty(); toast("Original restaurado");
};
$("bAnalyze").onclick = () => analyze();
async function analyze() {
  const p = cur(); const rep = $("report"); rep.innerHTML = `<p class="note">Analisando…</p>`;
  const pr = RL.parse(p.src, p.dat);
  const code = p.src + "\n" + p.dat;
  const ioIn = [...new Set([...p.src.matchAll(/\$IN\s*\[\s*(\d+)\s*\]/gi)].map(m => +m[1]))].sort((a, b) => a - b);
  const ioOut = [...new Set([...p.src.matchAll(/\$OUT\s*\[\s*(\d+)\s*\]/gi)].map(m => +m[1]))].sort((a, b) => a - b);
  const count = re => (p.src.match(re) || []).length;
  let html = `<h3>Estrutura</h3><table class="t rep">
    <tr><td>Linhas (.src / .dat)</td><td>${p.src.split("\n").length} / ${p.dat.split("\n").length}</td></tr>
    <tr><td>Subprogramas</td><td>${pr.mod && pr.mod.order ? pr.mod.order.map(n => esc(pr.mod.defs[n].display) + "()").join(", ") : "—"}</td></tr>
    <tr><td>Comandos de movimento</td><td>PTP ${count(/^\s*PTP\b/gim)} · LIN ${count(/^\s*LIN\b/gim)} · CIRC ${count(/^\s*CIRC\b/gim)} · REL ${count(/^\s*(PTP|LIN)_REL\b/gim)}</td></tr>
    <tr><td>Controle de fluxo</td><td>IF ${count(/^\s*IF\b/gim)} · FOR ${count(/^\s*FOR\b/gim)} · WHILE ${count(/^\s*WHILE\b/gim)} · LOOP ${count(/^\s*LOOP\b/gim)} · SWITCH ${count(/^\s*SWITCH\b/gim)}</td></tr>
    <tr><td>Entradas usadas</td><td>${ioIn.length ? ioIn.map(n => "$IN[" + n + "]").join(", ") : "nenhuma"}</td></tr>
    <tr><td>Saídas usadas</td><td>${ioOut.length ? ioOut.map(n => "$OUT[" + n + "]").join(", ") : "nenhuma"}</td></tr>
    <tr><td>Formulários inline (FOLD)</td><td>${(code.match(/;FOLD/gi) || []).length}</td></tr></table>`;
  if (pr.errors.length) {
    html += `<h3>Erros de sintaxe (${pr.errors.length})</h3>` + pr.errors.map(e => `<div class="crit no"><b>✗</b><div>${e.loc.file}:${e.loc.line} — ${esc(e.msg)}</div></div>`).join("");
    rep.innerHTML = html; return;
  }
  if (pr.warnings.length) html += `<h3>Instruções não simuladas ou ignoradas (${pr.warnings.length})</h3>` + [...new Map(pr.warnings.map(w => [w.msg, w])).values()].map(w => `<div class="crit"><b style="color:var(--warn)">!</b><div>${w.loc.file}:${w.loc.line} — ${esc(w.msg)}</div></div>`).join("");
  // pontos
  const sc = datScope(p) || {}; const pts = pointsFromScope(sc); const tM = RL.frameToMat(RL.DEFAULT_TOOL);
  html += `<h3>Pontos do .dat (${pts.length})</h3><table class="t rep">` + pts.map(pt => {
    const v = pt.raw; let st = "";
    if (v.__t === "E6AXIS" || v.__t === "AXIS") { const j = ["A1", "A2", "A3", "A4", "A5", "A6"].map(c => v[c]); const bad = j.findIndex((x, i) => x < RL.LIMITS[i][0] || x > RL.LIMITS[i][1]); st = bad >= 0 ? `<span class="badge err">A${bad + 1} fora do limite</span>` : (RL.checkCollision(j, tM) ? `<span class="badge err">colisão</span>` : `<span class="badge ok">ok</span>`); }
    else { const r = RL.ik(RL.mul(RL.frameToMat(v), RL.inv(tM)), RL.HOME); st = !r.ok ? `<span class="badge err">${esc(r.reason)}</span>` : (RL.checkCollision(r.j, tM) ? `<span class="badge err">colisão: ${esc(RL.checkCollision(r.j, tM).obstacle.nome)}</span>` : r.singular ? `<span class="badge warn">singularidade</span>` : `<span class="badge ok">alcançável</span>`); }
    return `<tr><td>${esc(pt.name)}</td><td>X ${fmt(pt.pos[0])} Y ${fmt(pt.pos[1])} Z ${fmt(pt.pos[2])} ${st}</td></tr>`;
  }).join("") + `</table>`;
  // execução a seco
  let j = RL.HOME.slice(); const seq = [], logs = [];
  const m = new RL.Machine(pr, { dry: true, maxStmts: 20000, log: (l, msg, loc) => logs.push({ l, msg, loc }), line() { }, status() { }, getJoints: () => j, setJoints: jj => { j = jj.slice(); }, getIn: () => false, output() { }, getOverride: () => 100, setOverride() { },
    moved: (label, pos, cut) => seq.push({ label, pos, cut }), animate: async () => { } });
  const r = await m.run();
  const errs = logs.filter(x => x.l === "err");
  html += `<h3>Execução simulada (sem animação)</h3><table class="t rep">
    <tr><td>Resultado</td><td>${r === "done" ? `<span class="badge ok">concluído</span>` : `<span class="badge err">parou com erro</span>`}</td></tr>
    <tr><td>Movimentos executados</td><td>${m.motions || 0}</td></tr>
    <tr><td>Tempo de ciclo estimado</td><td>${(m.totalTime || 0).toFixed(1)} s (override 100%, aproximado)</td></tr></table>`;
  if (errs.length) html += errs.map(e => `<div class="crit no"><b>✗</b><div>${e.loc ? `${e.loc.file}:${e.loc.line} — ` : ""}${esc(e.msg)}</div></div>`).join("");
  logs.filter(x => x.l === "warn" || (x.l === "info" && /Análise/.test(x.msg))).slice(0, 12).forEach(x => html += `<div class="crit"><b style="color:var(--warn)">!</b><div>${x.loc ? `${x.loc.file}:${x.loc.line} — ` : ""}${esc(x.msg)}</div></div>`);
  if (seq.length) html += `<h3>Sequência de movimentos reconstruída${seq.length > 80 ? " (primeiros 80)" : ""}</h3><table class="t rep">` + seq.slice(0, 80).map((s, i) => `<tr><td>${i + 1}. ${esc(s.label.trim())}</td><td>X ${fmt(s.pos.X)} Y ${fmt(s.pos.Y)} Z ${fmt(s.pos.Z)}${s.cut ? ` <span class="badge err">colisão</span>` : ""}</td></tr>`).join("") + `</table>`;
  html += `<div class="row" style="margin-top:10px"><button class="pri" id="repRun">▶ Executar com animação</button><button id="repAsk">Pedir explicação ao Professor</button></div>`;
  rep.innerHTML = html;
  $("repRun").onclick = () => { resetCell(true); runProgram(false); };
  $("repAsk").onclick = () => { showPane("ia"); sendChat("Analise o programa aberto como engenharia reversa: explique o que ele faz passo a passo, aponte riscos e sugira melhorias."); };
  log(r === "done" ? "ok" : "warn", `Análise concluída: ${m.motions || 0} movimentos, ~${(m.totalTime || 0).toFixed(1)} s, ${errs.length} erro(s).`);
}

// ======================= PROFESSOR COM IA =======================
const QUICK = ["Explique o programa aberto", "Por que meu robô não chegou à posição programada?", "Qual a diferença entre PTP e LIN?", "Como criar um programa de paletização?", "Como corrigir uma singularidade?", "Crie um exercício para eu praticar"];
$("quick").innerHTML = QUICK.map(q => `<button data-q="${esc(q)}">${esc(q)}</button>`).join("");
$("quick").onclick = e => { if (e.target.dataset.q) sendChat(e.target.dataset.q); };
$("bChatSend").onclick = () => { const t = $("chatIn").value.trim(); if (t) { $("chatIn").value = ""; sendChat(t); } };
$("chatIn").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("bChatSend").click(); } });
$("bChatClear").onclick = () => { S.chat = []; renderChat(); };
function mdLite(t) {
  const parts = t.split(/```(\w*)\n?([\s\S]*?)```/g); let html = "";
  for (let i = 0; i < parts.length; i += 3) {
    html += esc(parts[i]).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/`([^`\n]+)`/g, "<code>$1</code>");
    if (i + 2 < parts.length) { const code = parts[i + 2]; const k = /^\s*(GLOBAL\s+)?DEF\s/im.test(code) ? "src" : /^\s*DEFDAT\s/im.test(code) ? "dat" : null;
      html += `<pre>${esc(code)}</pre>` + (k ? `<button class="sm" data-load="${k}" data-code="${encodeURIComponent(code)}">Carregar no .${k}</button> ` : ""); }
  }
  return html;
}
function renderChat() {
  const c = $("chat");
  if (!S.chat.length) c.innerHTML = `<div class="msg a">Olá! Sou o professor de robótica do Korum. Analiso o programa aberto, explico comandos KRL, ajudo a corrigir erros e crio exemplos que você pode carregar e executar no simulador.${store.settings.apiKey ? "" : "\n\nPara respostas completas, coloque sua chave da API da Anthropic em Ajustes. Sem ela, respondo com o glossário de comandos embutido."}</div>`;
  else c.innerHTML = S.chat.map(m => `<div class="msg ${m.role === "user" ? "u" : "a"}">${m.role === "user" ? esc(m.content) : mdLite(m.content)}</div>`).join("");
  c.scrollTop = c.scrollHeight;
}
$("chat").onclick = e => {
  const b = e.target; if (!b.dataset.load) return; const p = cur(); const code = decodeURIComponent(b.dataset.code);
  saveVersion("Antes de carregar código do Professor"); p[b.dataset.load] = code.replace(/\r\n/g, "\n").trim(); setFile(b.dataset.load); updateNames(); previewPoints(); markDirty(); showPane("prog");
  log("info", `Código do Professor carregado no .${b.dataset.load}. Clique em Verificar e Executar.`);
};
const GLOSS = {
  PTP: "PTP (ponto a ponto): todos os eixos partem e chegam juntos pelo caminho mais rápido para os motores. A ferramenta faz uma curva no espaço. Use longe de peças e obstáculos. Ex.: PTP P1",
  LIN: "LIN (linear): o TCP segue uma linha reta até o destino, com velocidade $VEL.CP (m/s). Use para aproximar e afastar de peças. Ex.: LIN P2",
  CIRC: "CIRC aux, fim: arco de círculo passando pelo ponto auxiliar até o ponto final. Dois CIRC de 180° fazem um círculo completo.",
  LIN_REL: "LIN_REL {Z 50}: move em linha reta somando o deslocamento à posição atual (na BASE; com #TOOL, na direção da ferramenta).",
  PTP_REL: "PTP_REL {A1 30}: soma ângulos aos eixos atuais (ou deslocamento cartesiano, se usar X, Y, Z).",
  INI: "INI: carrega velocidades e acelerações padrão. Deve vir no início do programa.",
  DECL: "DECL tipo nome: declara variável. Tipos: INT, REAL, BOOL, E6POS (ponto cartesiano), E6AXIS (ponto de eixos), FRAME. Ex.: DECL E6POS P1 = {X 500, Y 0, Z 400, A 0, B 90, C 0}",
  E6POS: "E6POS: ponto cartesiano com X, Y, Z (mm) e A, B, C (graus, rotações em Z, Y, X). S e T escolhem a configuração no controlador real.",
  E6AXIS: "E6AXIS: posição dada pelos ângulos A1 a A6. HOME é um E6AXIS.",
  "$TOOL": "$TOOL: sistema da ferramenta ativa (posição do TCP em relação ao flange). Um ponto ensinado com uma ferramenta só é atingido corretamente com a mesma ferramenta ativa.",
  "$BASE": "$BASE: sistema de coordenadas da peça/mesa. Mudar a base desloca todos os pontos cartesianos programados juntos.",
  "$OUT": "$OUT[n] = TRUE/FALSE liga e desliga saídas digitais. No Korum, $OUT[1] comanda a garra.",
  "$IN": "$IN[n] lê entradas digitais (sensores, botões, sinais do CLP). Use WAIT FOR $IN[1] para esperar.",
  WAIT: "WAIT SEC t espera t segundos. WAIT FOR condição espera a condição ficar verdadeira.",
  LOOP: "LOOP ... ENDLOOP repete para sempre. Saia com EXIT.",
  FOR: "FOR i = 1 TO n [STEP s] ... ENDFOR repete com contador (declare DECL INT i).",
  IF: "IF condição THEN ... ELSE ... ENDIF. Em KRL, use parênteses em comparações combinadas: (a > 1) AND (b < 2).",
  SINGULARIDADE: "Singularidade de punho: com A5 ≈ 0°, A4 e A6 ficam alinhados e um pequeno movimento LIN exige giros enormes. Incline a ferramenta (ex.: B 85), use PTP para passar pela região ou mude a posição da peça.",
  HOME: "HOME = {A1 0, A2 -90, A3 90, A4 0, A5 0, A6 0}: posição segura de início e fim de ciclo.",
  OVERRIDE: "Override ($OV_PRO): percentual aplicado a todas as velocidades pelo operador. Teste programas novos com override baixo.",
  INTERRUPT: "INTERRUPT DECL n WHEN condição DO sub() declara uma interrupção; INTERRUPT ON n ativa.",
  TCP: "TCP (Tool Center Point): ponto de trabalho da ferramenta. As posições cartesianas descrevem onde está o TCP.",
  ALCANCE: "Ponto inalcançável: o destino está fora do alcance do braço ou exige um eixo além do limite. Aproxime o ponto da base, reduza a altura ou mude a orientação.",
  COLISAO: "Colisão: alguma parte do robô ou da ferramenta entraria em um objeto. Suba o ponto (Z maior), crie um ponto de aproximação ou altere o cenário.",
};
function offlineAnswer(q) {
  const u = q.toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const hits = Object.entries(GLOSS).filter(([k]) => new RegExp(`(^|[^A-Z_$])${k.replace("$", "\\$")}([^A-Z_]|$)`).test(u));
  let t = "";
  if (/ERRO|NAO CHEGOU|PROBLEMA|FALHA/.test(u)) { const e = S.logTail.filter(l => /^ERRO/.test(l)).slice(-3); t += e.length ? `Últimos erros do console:\n${e.join("\n")}\n\n` : "Não há erros recentes no console.\n\n"; if (e.some(l => /alcance/i.test(l))) hits.push(["", GLOSS.ALCANCE]); if (e.some(l => /COLIS/i.test(l))) hits.push(["", GLOSS.COLISAO]); if (e.some(l => /singular/i.test(l))) hits.push(["", GLOSS.SINGULARIDADE]); }
  if (/EXPLIQUE O PROGRAMA|ANALISE O PROGRAMA/.test(u)) t += "Use a aba Análise: ela lista subprogramas, pontos (alcançáveis ou não), E/S e a sequência de movimentos.\n\n";
  t += hits.length ? hits.map(h => "• " + h[1]).join("\n\n") : "Não encontrei esse assunto no glossário embutido. Tente palavras como PTP, LIN, CIRC, $TOOL, $BASE, WAIT, FOR, singularidade.";
  return t + "\n\n(Resposta do glossário offline. Configure a chave da API em Ajustes para respostas completas do Professor.)";
}
function aiContext() {
  const p = cur(); const c = curPos();
  return `CONTEXTO DO KORUM (gerado automaticamente)
Projeto: ${p.name} (categoria ${p.cat})
Cenário: ${p.scene.objetos.map(o => `${o.nome} [${o.tipo}] centro X${o.x} Y${o.y}, ${o.w}x${o.d}, altura ${o.h}`).join("; ") || "vazio"}; peças (cubos 50 mm): ${p.scene.pecas.map(q => `(${q[0]}, ${q[1]})`).join(" ") || "nenhuma"}
Robô: 6 eixos didático; HOME {A1 0,A2 -90,A3 90,A4 0,A5 0,A6 0}; limites A1±170 A2 -190..45 A3 -120..156 A4±185 A5±120 A6±350; garra em $OUT[1] (TRUE fecha), TCP a 110 mm do flange.
Eixos atuais: ${S.joints.map((v, i) => `A${i + 1} ${v.toFixed(1)}`).join(" ")} | TCP: X ${c.X.toFixed(1)} Y ${c.Y.toFixed(1)} Z ${c.Z.toFixed(1)} A ${c.A.toFixed(1)} B ${c.B.toFixed(1)} C ${c.C.toFixed(1)}
Últimas mensagens do console:
${S.logTail.slice(-12).join("\n") || "(nenhuma)"}
--- ${progName(p.src)}.src ---
${p.src.slice(0, 12000)}
--- ${progName(p.src)}.dat ---
${p.dat.slice(0, 6000)}`;
}
const SYSTEM = `Você é o Professor de Robótica do Korum, um laboratório virtual de robótica industrial para técnicos e engenheiros brasileiros. Responda sempre em português do Brasil, com linguagem técnica e didática, direto ao ponto.
Você ensina programação KRL de robôs industriais de 6 eixos, cinemática, singularidades, diagnóstico e boas práticas de segurança.
O simulador do Korum interpreta este subconjunto de KRL: DEF/END (com parâmetros), DEFDAT/ENDDAT, DECL (INT, REAL, BOOL, E6POS, POS, FRAME, E6AXIS, AXIS, vetores), INI, PTP, LIN, CIRC aux,fim, PTP_REL, LIN_REL (BASE ou #TOOL), IF/ELSE/ENDIF, FOR/ENDFOR, WHILE, REPEAT/UNTIL, LOOP/ENDLOOP, SWITCH/CASE, EXIT, RETURN, WAIT SEC, WAIT FOR, HALT, INTERRUPT DECL/ON/OFF, $IN[n], $OUT[n], $VEL.CP (m/s), $VEL_AXIS[n] (%), $OV_PRO, $BASE, $TOOL, $POS_ACT, $AXIS_ACT, $NULLFRAME, BAS(#INITMOV/#PTP_PARAMS/#CP_PARAMS), SIN COS TAN ACOS ATAN2 SQRT ABS. Aproximações C_PTP/C_DIS são aceitas mas o robô para em cada ponto. SPLINE, TRIGGER, GOTO e DEFFCT não são executados. Em KRL, AND/OR têm prioridade maior que comparações: use parênteses.
Convenções: mm e graus; X para a frente, Z para cima; A,B,C = rotações Z,Y,X; ferramenta apontando para baixo = B 90. Peças são cubos de 50 mm (centro a 25 mm acima da superfície). A garra sempre abre totalmente (120 mm); ajusta-se o fechamento ($GARRA_FECHAMENTO, 0–120 mm: distância entre os dedos ao fechar; precisa ser menor que a largura da peça para prendê-la) e a força ($GARRA_FORCA, 5–200 N); a peça de 50 mm pesa 0,5 kg (precisa de 13 N) e o pacote 100×50×50 pesa 1,2 kg (precisa de 30 N); acima de 120 N o pacote pode amassar. Pegar: TCP a menos de 30 mm do centro da peça e $OUT[1] = TRUE.
Quando escrever um programa, entregue o .src e o .dat em blocos de código separados (\`\`\`krl), com DEF e DEFDAT de mesmo nome, para o aluno carregar e executar no simulador. Use apenas o subconjunto suportado. Verifique alcance (até ~950 mm do ombro, que fica em Z 400) e colisões com o cenário informado.
Quando houver diferença entre o simulador e controladores reais (KSS, iiQKA.OS2 ou outros), diga claramente. Nunca afirme que a simulação garante segurança em um robô real. Se não tiver certeza sobre um detalhe de um controlador específico, diga que é preciso conferir na documentação oficial do fabricante.`;
async function sendChat(text) {
  S.chat.push({ role: "user", content: text }); renderChat();
  if (!store.settings.apiKey) { S.chat.push({ role: "assistant", content: offlineAnswer(text) }); renderChat(); return; }
  const c = $("chat"); const w = document.createElement("div"); w.className = "msg a"; w.textContent = "Pensando…"; c.appendChild(w); c.scrollTop = c.scrollHeight;
  $("bChatSend").disabled = true;
  const msgs = S.chat.slice(-12).map((m, i, arr) => ({ role: m.role, content: i === arr.length - 1 ? aiContext() + "\n\nPERGUNTA DO ALUNO:\n" + m.content : m.content }));
  const r = await platform.ai({ apiKey: store.settings.apiKey, model: store.settings.model || DEFAULT_MODEL, system: SYSTEM, messages: msgs });
  $("bChatSend").disabled = false;
  S.chat.push({ role: "assistant", content: r.error ? `Não consegui falar com a API: ${r.error}\n\nConfira a chave e o nome do modelo em Ajustes.\n\n` + offlineAnswer(text) : r.text });
  renderChat();
}

// ======================= AJUSTES / TEMA =======================
function applyTheme(t) { document.documentElement.dataset.theme = t; sceneTheme(t); }
$("bTheme").onclick = () => { store.settings.theme = store.settings.theme === "claro" ? "escuro" : "claro"; applyTheme(store.settings.theme); markDirty(); if (S.pane === "config") renderConfig(); };
function renderConfig() {
  $("cfgTheme").value = store.settings.theme; $("cfgKey").value = store.settings.apiKey || ""; $("cfgModel").value = store.settings.model || DEFAULT_MODEL;
  $("cfgDir").textContent = store.settings.backupDir || "(Documentos)";
  $("about").innerHTML = `Korum ${esc(APP_VERSION)} — laboratório virtual de robótica industrial. Interpretador KRL, cinemática e cenários próprios; o modelo do robô usa dimensões didáticas. Não envia comandos a robôs reais. KRL é a linguagem dos robôs KUKA; o Korum não é afiliado a nenhum fabricante.`;
}
$("cfgTheme").onchange = () => { store.settings.theme = $("cfgTheme").value; applyTheme(store.settings.theme); markDirty(); };
$("cfgKey").onchange = () => { store.settings.apiKey = $("cfgKey").value.trim(); markDirty(); toast("Chave salva neste computador"); };
$("cfgModel").onchange = () => { store.settings.model = $("cfgModel").value.trim() || DEFAULT_MODEL; markDirty(); };
$("bCfgDir").onclick = async () => { const d = await platform.chooseDir(); if (d) { store.settings.backupDir = d; markDirty(); renderConfig(); renderBackupInfo(); } else if (!K) toast("Disponível no aplicativo instalado"); };
$("bOpenData").onclick = () => platform.openData();

// ======================= NÍVEIS: INICIANTE / PROFISSIONAL =======================
const HINTS = [
  [/fora do alcance/i, "o robô não alcança esse ponto. Use X e Y menores (mais perto da base do robô) ou uma altura Z menor."],
  [/limite do eixo|fora do limite/i, "um dos eixos chegaria ao fim de curso. Tente um ponto mais à frente do robô (X positivo)."],
  [/COLIS/i, "alguma parte do robô bateria num objeto. Suba o ponto (Z maior) ou crie antes um ponto de aproximação acima do objeto."],
  [/não declarad/i, "todo ponto ou variável precisa existir antes de ser usado. Crie no arquivo .dat com DECL ou use o botão ⊕ Ponto para gravar a posição atual."],
  [/singularidade/i, "o punho do robô ficou numa posição \"esticada\" difícil. Troque o LIN por PTP ou incline um pouco a ferramenta (B 85 em vez de B 90)."],
  [/esperado|inesperado|não reconhecida|fora de lugar|sem THEN|sintaxe/i, "parece um erro de digitação na linha indicada (clique no link src:N para ir até ela). Compare com os exemplos: um comando por linha e cada IF/FOR/LOOP fechado com ENDIF/ENDFOR/ENDLOOP."],
  [/Aguardando condição/i, "o programa está esperando um sinal. Clique no botão IN indicado no painel da direita (Entradas $IN)."],
  [/Verificação: \d+ erro/i, "o programa tem erro de escrita e não foi executado. A linha com problema fica vermelha no editor."],
];
function applyNivel(n, silent) {
  store.settings.nivel = n; document.body.classList.toggle("beginner", n === "iniciante");
  document.querySelectorAll("#nivelSw button").forEach(b => b.classList.toggle("on", b.dataset.n === n));
  fillExamples();
  const pro = ["projetos", "cena", "analise", "kcp"];
  if (n === "iniciante" && pro.includes(S.pane)) showPane("inicio");
  if (n !== "iniciante" && S.pane === "inicio") showPane("prog");
  if (!silent) { markDirty(); toast(n === "iniciante" ? "Modo Iniciante: tela simplificada e roteiro guiado" : "Modo Profissional: todas as ferramentas"); }
}
document.querySelectorAll("#nivelSw button").forEach(b => b.onclick = () => { applyNivel(b.dataset.n); if (b.dataset.n === "iniciante") showPane("inicio"); });
document.querySelectorAll("[data-nv]").forEach(b => b.onclick = () => { $("mNivel").classList.remove("on"); applyNivel(b.dataset.nv); showPane(b.dataset.nv === "iniciante" ? "inicio" : "prog"); });
// ---- roteiro "Primeiros passos" ----
const countDecl = d => (d.match(/^\s*DECL\s/gim) || []).length;
const ranSince = c => S.lastRun && S.lastRun.r === "done" && S.lastRun.t > c.t0;
const TOUR = [
  { t: "Conheça o simulador", p: "Este é um robô industrial de 6 eixos, com uma mesa e uma esteira. <b>Arraste o mouse</b> sobre a imagem 3D para girar a vista e use a <b>roda do mouse</b> para aproximar ou afastar.", where: "#view", check: () => S.camMoved },
  { t: "Mova um eixo", p: "No painel da direita, arraste o controle <b>A1</b>. É a base do robô girando. Cada controle de A1 a A6 move uma junta do braço, como o ombro, o cotovelo e o punho de um braço humano.", where: "#axes", check: () => Math.abs(S.joints[0]) > 20 },
  { t: "Volte para HOME", p: "Clique em <b>HOME</b>, acima dos controles. HOME é a posição segura de onde todo programa começa e onde termina.", where: "#bHome", check: () => S.joints.every((v, i) => Math.abs(v - RL.HOME[i]) < 0.5) },
  { t: "Abra seu primeiro programa", p: "Um programa de robô é uma lista de comandos, um por linha, lidos de cima para baixo. Clique no botão abaixo para abrir o exemplo <b>Movimentos básicos</b>.", btn: ["Abrir o exemplo", () => { openExample(EXAMPLES.find(e => e.id === "basico")); showPane("inicio"); }], check: () => cur() && /^basico$/i.test(progName(cur().src)) },
  { t: "Execute o programa", p: "Clique em <b>▶ Executar</b> no topo da tela. A linha em execução fica destacada no editor e o robô cumpre cada comando:<br>• <b>PTP</b> leva o robô pelo caminho mais fácil para os motores (faz uma curva);<br>• <b>LIN</b> leva a garra em linha reta.<br>A linha laranja no 3D mostra o caminho percorrido.", where: "#bRun", check: c => ranSince(c) },
  { t: "Mude um ponto", p: "Os pontos ficam no segundo arquivo, o <b>.dat</b>. Abra <b>Programa</b> na barra da esquerda, clique na aba <b>basico.dat</b> e, na linha do ponto <b>P1</b>, troque <code>Y 300</code> por <code>Y 150</code>. Depois clique em <b>▶ Executar</b> de novo e veja o robô ir a outro lugar.", where: "#tabDat", check: c => cur() && /^basico$/i.test(progName(cur().src)) && !/P1\s*=\s*\{X 450, Y 300,/.test(cur().dat) && ranSince(c) },
  { t: "Ensine um ponto (teach)", p: "Assim os técnicos programam na fábrica: movem o robô até o lugar certo e gravam a posição.<br>1. Use os botões <b>X+</b>, <b>Y+</b> e <b>Z−</b> no painel da direita para mover a garra.<br>2. Abra <b>Programa</b> e clique em <b>⊕ Ponto</b>.<br>O Korum grava a posição no .dat e escreve <code>PTP P1</code> no programa.", where: "#jog", check: c => cur() && countDecl(cur().dat) > c.decl0 },
  { t: "Programe com blocos", p: "Abra <b>Blocos</b> na barra da esquerda e clique em <b>+ Fechar garra</b> ou <b>+ Aguardar</b>. Os blocos montam o programa sem você digitar, e o código KRL é gerado sozinho na aba Programa.", where: "[data-p=blocos]", check: c => cur() && cur().blocks && cur().blocks.length > c.blk0 && cur().blocks.length > 0 },
  { t: "Pegue uma peça", p: "Agora um trabalho de verdade: o robô pega a peça azul da mesa e coloca na esteira. Abra o exemplo e clique em <b>▶ Executar</b>. Repare na linha <code>$OUT[1] = TRUE</code>: é ela que fecha a garra.", btn: ["Abrir o exemplo Pick and place", () => { openExample(EXAMPLES.find(e => e.id === "pick")); showPane("inicio"); }], check: c => cur() && /^pick_place$/i.test(progName(cur().src)) && ranSince(c) },
  { t: "Seu primeiro exercício", p: "Abra <b>Exercícios</b> na barra da esquerda e faça o <b>Primeiro movimento</b>. O Korum executa o seu programa, confere cada item e dá a nota. Se travar, pergunte ao <b>Professor</b>.", where: "[data-p=exerc]", check: () => (store.progress.exercises.x1 || {}).best === 100 },
];
function tourState() { if (!store.progress.tour) store.progress.tour = { i: 0, ctx: null }; const T = store.progress.tour; if (!T.ctx) T.ctx = tourCtx(); return T; }
function tourCtx() { const p = cur(); return { t0: Date.now(), decl0: p ? countDecl(p.dat) : 0, blk0: p && p.blocks ? p.blocks.length : 0 }; }
function tourGo(i) { const T = tourState(); T.i = Math.max(0, Math.min(TOUR.length, i)); T.ctx = tourCtx(); markDirty(); renderTour(); }
function renderTour() {
  const T = tourState(), box = $("tour"); $("tourProg").textContent = `${Math.min(T.i, TOUR.length)}/${TOUR.length}`;
  document.querySelectorAll(".hilite").forEach(e => e.classList.remove("hilite"));
  let html = `<p class="note">Missões curtas para aprender o básico. Cada uma é conferida sozinha: faça o que o cartão pede e ele avança.</p><div class="bar" style="margin:8px 0 12px"><i style="width:${Math.round(100 * T.i / TOUR.length)}%"></i></div>`;
  if (T.i >= TOUR.length) html += `<div class="mission cur"><h4><span class="n">✓</span>Parabéns, você concluiu os primeiros passos!</h4><p>Agora você já sabe mover o robô, ler e executar um programa, mudar e ensinar pontos, usar blocos e pegar peças.</p><p>Próximos passos: a trilha de <b>Cursos</b> (comece pelo Nível 2), os outros <b>Exercícios</b> e, quando se sentir seguro, o modo <b>Profissional</b>, com cenários, modo painel do robô e análise de programas.</p>
    <div class="row"><button class="pri" id="tCur">Abrir Cursos</button><button id="tPro">Mudar para Profissional</button><button id="tAgain">Recomeçar roteiro</button></div></div>`;
  TOUR.forEach((m, i) => {
    const st = i < T.i ? "done" : i === T.i ? "cur" : "";
    if (st === "cur") html += `<div class="mission cur"><h4><span class="n">${i + 1}</span>${m.t}</h4><p>${m.p}</p>${m.btn ? `<div class="row"><button class="pri" id="tBtn">${m.btn[0]}</button></div>` : ""}<div class="row" style="margin-top:10px"><span class="note" style="margin:0;flex:1">⏳ Esperando você fazer a missão…</span>${i > 0 ? `<button class="sm" id="tBack">← Voltar</button>` : ""}<button class="sm" id="tSkip">Pular</button></div></div>`;
    else html += `<div class="mission ${st}"><h4><span class="n">${st === "done" ? "✓" : i + 1}</span>${m.t}</h4></div>`;
  });
  box.innerHTML = html;
  const m = TOUR[T.i];
  if (m && m.btn) $("tBtn").onclick = m.btn[1];
  if ($("tBack")) $("tBack").onclick = () => tourGo(T.i - 1);
  if ($("tSkip")) $("tSkip").onclick = () => tourGo(T.i + 1);
  if ($("tCur")) { $("tCur").onclick = () => showPane("cursos"); $("tPro").onclick = () => { applyNivel("profissional"); showPane("prog"); }; $("tAgain").onclick = () => tourGo(0); }
  if (m && m.where) document.querySelectorAll(m.where).forEach(e => e.classList.add("hilite"));
}
setInterval(() => {
  if (store.settings.nivel !== "iniciante") { document.querySelectorAll(".hilite").forEach(e => e.classList.remove("hilite")); return; }
  const T = tourState(), m = TOUR[T.i]; if (!m) return;
  let ok = false; try { ok = !!m.check(T.ctx); } catch (e) { }
  if (ok) { toast(`✓ Missão concluída: ${m.t}`); log("ok", `Missão ${T.i + 1} concluída: ${m.t}`); tourGo(T.i + 1); if (S.pane !== "inicio") document.querySelector("[data-p=inicio]").classList.add("hilite"); }
}, 600);

// ======================= PAINÉIS REDIMENSIONÁVEIS =======================
document.querySelectorAll(".rz").forEach(h => h.addEventListener("pointerdown", e => {
  e.preventDefault(); h.classList.add("drag"); h.setPointerCapture(e.pointerId); const k = h.dataset.rz, r = document.documentElement;
  const mv = ev => { if (k === "left") r.style.setProperty("--left", Math.max(280, Math.min(900, ev.clientX - 54)) + "px");
    if (k === "right") r.style.setProperty("--right", Math.max(240, Math.min(600, innerWidth - ev.clientX)) + "px");
    if (k === "bottom") r.style.setProperty("--bottom", Math.max(70, Math.min(innerHeight - 200, innerHeight - ev.clientY)) + "px"); };
  const up = () => { h.classList.remove("drag"); h.removeEventListener("pointermove", mv); h.removeEventListener("pointerup", up); };
  h.addEventListener("pointermove", mv); h.addEventListener("pointerup", up);
}));

// ======================= INÍCIO =======================
(async () => {
  try { const raw = await platform.load(); if (raw) { const s = JSON.parse(raw); if (s && Array.isArray(s.projects)) store = Object.assign(store, s, { settings: Object.assign(store.settings, s.settings || {}), progress: Object.assign({ lessons: {}, exercises: {} }, s.progress || {}) }); } }
  catch (e) { log("err", "Não foi possível ler os dados salvos: " + e.message); }
  if (!store.projects.length) { const e = EXAMPLES[0]; newProject({ name: "Exemplo: " + e.title, cat: e.cat, src: e.src, dat: e.dat, scene: SCENES.pick }); }
  if (!cur()) store.currentId = store.projects[0].id;
  setGrip({ fechamento: (store.settings.garra || {}).fechamento, forca: (store.settings.garra || {}).forca }, true);
  applyTheme(store.settings.theme || "escuro"); setTool(RL.DEFAULT_TOOL); setCam("iso"); resize();
  openProject(store.currentId); renderBackupInfo(); setStatus("idle");
  if (store.settings.nivel) { applyNivel(store.settings.nivel, true); if (store.settings.nivel === "iniciante") showPane("inicio"); } else { applyNivel("profissional", true); $("mNivel").classList.add("on"); }
  log("info", `Korum ${APP_VERSION} pronto. ${store.projects.length} projeto(s) na biblioteca. F5 executa, F10 executa passo a passo, Ctrl+S salva uma versão.`);
  initKCP({ setGrip, GR, S, store, cur, RL, $, esc, hlLine, log, toast, ask, askText, openProject, newProject, runProgram, setJoints, quickMove, setOut, resetCell, curPos, tcpWorld,
    parts: () => parts.map(partPos), partsRaw: () => parts, progName, markDirty, persist, saveVersion, previewPoints, makeZip, platform, stamp, safe, showPane, setFile, updateNames, check, EXAMPLES, SCENES, applyScene, openExample, flashObstacle, showHelp: () => $("mHelp").classList.add("on"), APP_VERSION });
  window.__korum = { scr: (x, y, z) => { const v = new THREE.Vector3(x, y, z); root.localToWorld(v); v.project(camera); const r = renderer.domElement.getBoundingClientRect(); return [r.left + (v.x + 1) / 2 * r.width, r.top + (1 - v.y) / 2 * r.height]; }, S, store, runProgram, analyze, evaluate: id => evaluate(EXERCISES.find(x => x.id === id)), startExercise: id => startExercise(EXERCISES.find(x => x.id === id), true), cur, showPane, parts: () => parts.map(partPos), sendChat, krlToBlocks, blocksToKrl, openExample };
})();
