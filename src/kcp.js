// ===================================================================
//  Korum — Modo Painel (painel de programação estilo controlador KRC)
//  Didático: imita o fluxo de trabalho de um painel real (navegador,
//  editor com seta de execução, mensagens com confirmação, modos de
//  operação, tecla Start segurada em T1/T2, jog, grupos de usuário,
//  ajuste dos eixos e IHM da célula), sem marcas de fabricante.
// ===================================================================
export function initKCP(api) {
  const { S, RL, $, esc, hlLine, log, cur } = api;
  const root = document.getElementById("p-kcp");
  const K = {
    mode: "T1", drives: false, enable: false, user: "Operador", runMode: "GO", screen: "nav", coord: "EIXOS",
    msgs: [], msgNo: 0, msgSel: -1, selected: false, openEdit: false, editFile: "src", navFolder: "prog", navSel: null,
    hmiGroup: 1, hmiRow: 0, unmastered: new Set(), masterSel: 0, cycles: 0, startHeld: false, jog: null, extPrev: false,
    varName: "$POS_ACT", bco: true, hStatus: "", manualBusy: false, lastRelMsg: 0,
  };
  const OV = [1, 3, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const manual = () => K.mode === "T1" || K.mode === "T2";
  const running = () => !!S.machine;
  const isExpert = () => K.user === "Expert";
  const ROBOT = "KORUM_R1";

  // ---------------- mensagens ----------------
  const SRC = { err: "INTERP", warn: "INTERP", info: "SISTEMA", ok: "SISTEMA", run: "INTERP" };
  function msg(type, text, src) { // type: info | quit | state
    K.msgNo++; K.msgs.push({ no: 100 + (K.msgNo % 900), type, text, src: src || "KCP", time: new Date().toTimeString().slice(0, 8), ack: type !== "quit" });
    if (K.msgs.length > 80) K.msgs.shift();
    K.msgSel = K.msgs.length - 1; renderMsgs();
  }
  S.onLog = (lvl, text, loc) => {
    if (S.pane !== "kcp") return;
    if (lvl === "run") return;
    msg(lvl === "err" ? "quit" : lvl === "warn" ? "state" : "info", (loc && loc.line ? `[${loc.file}:${loc.line}] ` : "") + text, /COLIS/i.test(text) ? "MOVIMENTO" : SRC[lvl]);
  };
  const unacked = () => K.msgs.filter(m => !m.ack).length;
  function ack(all) {
    if (all) K.msgs.forEach(m => m.ack = true);
    else { const m = K.msgs.slice().reverse().find(x => !x.ack); if (m) m.ack = true; }
    K.msgs = K.msgs.filter(m => !m.ack || m.type !== "quit"); K.msgSel = K.msgs.length - 1; renderMsgs();
  }

  // ---------------- estrutura da tela ----------------
  root.innerHTML = `<div class="kpanel" id="kcp">
    <div class="k-tb"><span class="k-ico">▣</span><span>${ROBOT}</span><span class="k-tbt">Painel de programação · Ctrl+F12 = IHM da célula</span></div>
    <div class="k-menu" id="kMenu"></div>
    <div class="k-row"><div class="k-main" id="kMain"></div><div class="k-side" id="kSide"></div></div>
    <div class="k-msgs" id="kMsgs"></div>
    <div class="k-status" id="kStatus"></div>
    <div class="k-soft" id="kSoft"></div>
    <div class="k-pop" id="kPop"></div>
  </div>`;
  const kMain = $("kMain"), kSide = $("kSide"), kSoft = $("kSoft"), kPop = $("kPop");

  // ---------------- menus ----------------
  const MENUS = {
    "Arquivo": [["Abrir (editar)", () => navOpen()], ["Arquivar projeto (.zip)", () => archive()], ["Renomear projeto", () => rename()], ["Novo programa", () => navNew()]],
    "Programa": [["Selecionar", () => navSelect()], ["Cancelar seleção", () => deselect()], ["Resetar programa", () => resetProg()], ["-"],
      ["Modo de execução GO (contínuo)", () => setRun("GO")], ["Modo de execução MSTEP (por movimento)", () => setRun("MSTEP")], ["Modo de execução ISTEP (por instrução)", () => setRun("ISTEP")]],
    "Configurar": [["Grupo de usuário…", () => go("user")], ["Modo de operação (chave)…", () => go("mode")], ["Ferramenta e base ativas", () => go("pos")]],
    "Monitor": [["Entradas/saídas digitais", () => go("io")], ["Variável", () => go("var")], ["Posição atual", () => go("pos")], ["Confirmar todas as mensagens", () => ack(true)]],
    "Setup": [["Ajustar eixos (mastering)", () => go("master")], ["Limites de software", () => go("lim")]],
    "Comandos": [["Mover para HOME", () => manualFn(() => moveJ(RL.HOME, "HOME"))], ["Navegador", () => go("nav")], ["Programa selecionado", () => go("edit")]],
    "Tecnologia": [["IHM da célula (Ctrl+F12)", () => go("hmi")], ["Formação da camada", () => go("form")], ["Contadores", () => go("cont")]],
    "Ajuda": [["Ajuda dos comandos KRL", () => api.showHelp()], ["Sobre o modo painel", () => go("about")]],
  };
  $("kMenu").innerHTML = Object.keys(MENUS).map(k => `<span data-m="${k}">${k}</span>`).join("");
  $("kMenu").onclick = e => {
    const k = e.target.dataset.m; if (!k) return;
    const r = e.target.getBoundingClientRect(), rr = $("kcp").getBoundingClientRect();
    kPop.innerHTML = MENUS[k].map((it, i) => it[0] === "-" ? `<hr>` : `<div data-i="${i}"><u>${(i + 1) % 10}</u> ${esc(it[0])}</div>`).join("");
    kPop.style.left = (r.left - rr.left) + "px"; kPop.style.top = (r.bottom - rr.top) + "px"; kPop.style.display = "block"; kPop.dataset.m = k; e.stopPropagation();
  };
  kPop.onclick = e => { const d = e.target.closest("[data-i]"); if (!d) return; kPop.style.display = "none"; MENUS[kPop.dataset.m][+d.dataset.i][1](); };
  document.addEventListener("click", () => kPop.style.display = "none");

  // ---------------- teclas laterais ----------------
  function renderSide() {
    const ax = K.coord === "EIXOS" ? ["A1", "A2", "A3", "A4", "A5", "A6"] : ["X", "Y", "Z", "A", "B", "C"];
    const st = S.machine ? S.machine.state : "";
    const html = `
      <button class="k-key k-mode" data-k="mode" title="Chave de modo de operação">${K.mode}</button>
      <button class="k-key ${K.drives ? "on" : "off"}" data-k="drv" title="Acionamentos (contator)">Acion.<br><b>${K.drives ? "I" : "0"}</b></button>
      <button class="k-key ${K.enable ? "en" : ""}" data-k="ena" title="Botão de habilitação (necessário em T1/T2)">Habil.<br><b>${K.enable ? "▣" : "□"}</b></button>
      <button class="k-key k-start ${st === "running" ? "on" : ""}" data-k="start" title="${manual() ? "Segure para mover (T1/T2)" : "Partida"}">▶<br>Start</button>
      <button class="k-key k-stop" data-k="stop" title="Stop">■<br>Stop</button>
      <div class="k-ov"><button class="k-key" data-k="ov-">−</button><div><small>${K.jog !== null ? "HOV" : "POV"}</small><b>${S.pov}%</b></div><button class="k-key" data-k="ov+">+</button></div>
      <button class="k-key k-coord" data-k="coord" title="Sistema de coordenadas do jog">${{ EIXOS: "Eixos", BASE: "Base", TOOL: "Ferram." }[K.coord]}</button>
      ${ax.map((a, i) => `<div class="k-jog"><button class="k-key" data-j="${i}" data-s="-1">−</button><span>${a}</span><button class="k-key" data-j="${i}" data-s="1">+</button></div>`).join("")}
      <div class="k-rm">${K.runMode}</div>`;
    if (html !== K.sideHtml) { K.sideHtml = html; kSide.innerHTML = html; }
  }
  kSide.addEventListener("click", e => {
    const b = e.target.closest("[data-k]"); if (!b) return; const k = b.dataset.k;
    if (k === "mode") go("mode");
    if (k === "drv") { K.drives = !K.drives; if (!K.drives) { if (running()) S.machine.pause(); msg("quit", "Contator dos acionamentos desligado", "ACIONAM."); } else { ackDrives(); msg("info", "Acionamentos ligados", "ACIONAM."); } }
    if (k === "ena") { K.enable = !K.enable; if (!K.enable && manual() && running()) { S.machine.pause(); msg("state", "Botão de habilitação liberado — movimento parado"); } }
    if (k === "stop") { if (running()) { S.machine.pause(); msg("state", "Programa parado pela tecla Stop"); } stopJog(); }
    if (k === "ov-" || k === "ov+") { let i = OV.findIndex(v => v >= S.pov); if (i < 0) i = OV.length - 1; i = Math.max(0, Math.min(OV.length - 1, i + (k === "ov+" ? 1 : (OV[i] === S.pov ? -1 : 0)))); S.pov = OV[i]; $("pov").value = S.pov; $("povv").textContent = S.pov + "%"; }
    if (k === "coord") K.coord = { EIXOS: "BASE", BASE: "TOOL", TOOL: "EIXOS" }[K.coord];
    refresh();
  });
  function ackDrives() { K.msgs.forEach(m => { if (/acionamentos desligado/i.test(m.text)) m.ack = true; }); K.msgs = K.msgs.filter(m => !(m.ack && m.type === "quit")); }
  // Start segurado
  kSide.addEventListener("pointerdown", e => {
    const b = e.target.closest("[data-k=start]"); if (b) { e.preventDefault(); b.setPointerCapture(e.pointerId); startDown(); return; }
    const j = e.target.closest("[data-j]"); if (j) { e.preventDefault(); j.setPointerCapture(e.pointerId); startJog(+j.dataset.j, +j.dataset.s); }
  });
  kSide.addEventListener("pointerup", e => { if (e.target.closest("[data-k=start]")) startUp(); if (e.target.closest("[data-j]")) stopJog(); });
  kSide.addEventListener("pointercancel", () => { startUp(); stopJog(); });
  document.addEventListener("pointerup", () => { if (K.startHeld) startUp(); if (K.jog !== null) stopJog(); });
  window.addEventListener("blur", () => { if (K.startHeld) startUp(); stopJog(); });

  function startDown() {
    K.startHeld = true;
    if (K.mode === "EXT") return msg("state", "Modo EXT: a partida vem do CLP (entrada $IN[8])");
    if (!K.selected) return msg("state", "Nenhum programa selecionado (Navegador → Selecionar)");
    if (unacked()) return msg("state", "Confirme as mensagens (Ackn.) antes de continuar");
    if (manual() && !K.enable) return msg("state", "Pressione o botão de habilitação (Habil.) antes do Start");
    if (!K.drives) return msg("quit", "Acionamentos desligados — ligue com a tecla Acion.", "ACIONAM.");
    if (running()) { cont(); refresh(); return; }
    launch();
  }
  function startUp() {
    if (!K.startHeld) return; K.startHeld = false;
    if (manual() && running() && S.machine.state === "running") { S.machine.pause(); if (Date.now() - K.lastRelMsg > 4000) { msg("state", "Tecla Start liberada — em " + K.mode + " o robô só se move com Start pressionado"); K.lastRelMsg = Date.now(); } refresh(); }
  }
  function cont() {
    const m = S.machine; if (!m) return;
    if (m.stepGo) { if (K.runMode === "ISTEP") m.step(); else m.resume(); }
    else if (m.state === "paused") { m.state = "running"; if (K.runMode !== "ISTEP") m.stepMode = false; }
  }
  async function launch() {
    S.tcpLimit = K.mode === "T1" ? 250 : 0;
    go("edit");
    const r = await api.runProgram(K.runMode === "ISTEP");
    S.tcpLimit = 0;
    if (r === "done") { K.cycles++; K.bco = true; msg("info", "Fim do programa — cursor volta ao início", "INTERP"); }
    refresh();
  }
  S.onMoved = () => {
    if (S.pane !== "kcp" || !S.machine) return;
    if (K.bco) { K.bco = false; msg("info", "Coincidência de bloco alcançada (BCO)", "MOVIMENTO"); }
    if (K.runMode === "MSTEP") S.machine.pause();
  };
  S.kcpCheck = () => {
    if (S.pane !== "kcp") return null;
    if (K.unmastered.size) return `Ação inadmissível: eixo ${[...K.unmastered].map(i => "A" + (i + 1)).join(", ")} não ajustado`;
    if (!K.drives) return "Acionamentos desligados";
    return null;
  };
  // EXT: partida pela entrada 8 (borda de subida)
  setInterval(() => {
    if (S.pane !== "kcp") return;
    const v = !!S.ins[8];
    if (K.mode === "EXT" && v && !K.extPrev) {
      if (!K.selected) msg("state", "EXT: partida recebida, mas nenhum programa está selecionado");
      else if (!K.drives) msg("quit", "EXT: acionamentos desligados", "ACIONAM.");
      else if (unacked()) msg("state", "EXT: há mensagens a confirmar");
      else if (running()) cont(); else launch();
    }
    K.extPrev = v; renderStatus(); if (["io", "var", "pos", "form", "cont", "hmi"].includes(K.screen)) liveUpdate();
  }, 150);

  // ---------------- jog ----------------
  function startJog(i, sg) {
    if (running()) return msg("state", "Jog não permitido com programa em execução");
    if (!manual()) return msg("state", "Jog só nos modos T1/T2");
    if (!K.drives) return msg("quit", "Acionamentos desligados", "ACIONAM.");
    if (!K.enable) return msg("state", "Pressione o botão de habilitação (Habil.)");
    if (K.coord !== "EIXOS" && K.unmastered.size) return msg("state", "Jog cartesiano inadmissível com eixo não ajustado");
    stopJog(); let last = performance.now();
    K.jog = setInterval(() => {
      if (!K.drives || !K.enable) { msg("state", "Jog interrompido", "MOVIMENTO"); return stopJog(); }
      const now = performance.now(), dt = Math.min(0.1, (now - last) / 1000); last = now; const f = S.pov / 100;
      let j = S.joints.slice();
      if (K.coord === "EIXOS") {
        j[i] += sg * 30 * f * dt; const [lo, hi] = RL.LIMITS[i];
        if (j[i] < lo || j[i] > hi) { j[i] = Math.max(lo, Math.min(hi, j[i])); api.setJoints(j, false); msg("state", `Limite de software A${i + 1}${sg > 0 ? "+" : "−"}`, "MOVIMENTO"); return stopJog(); }
      } else {
        const d = { X: 0, Y: 0, Z: 0, A: 0, B: 0, C: 0 }, k = "XYZABC"[i];
        d[k] = sg * (i < 3 ? (K.mode === "T1" ? 250 : 400) * f : 30 * f) * dt;
        const base = RL.frameToMat(S.base), tool = RL.frameToMat(S.tool), cm = RL.mul(RL.inv(base), api.tcpWorld()); let M;
        if (K.coord === "TOOL") M = RL.mul(cm, RL.frameToMat(d));
        else { const rc = cm.slice(); rc[3] = rc[7] = rc[11] = 0; M = RL.mul(RL.frameToMat({ A: d.A, B: d.B, C: d.C }), rc); M[3] = cm[3] + d.X; M[7] = cm[7] + d.Y; M[11] = cm[11] + d.Z; }
        const r = RL.ik(RL.mul(base, RL.mul(M, RL.inv(tool))), S.joints);
        if (!r.ok) { msg("state", "Jog parado: " + r.reason, "MOVIMENTO"); return stopJog(); }
        if (Math.max(...r.j.map((v, q) => Math.abs(v - S.joints[q]))) > 8) { msg("state", "Jog parado: singularidade de punho", "MOVIMENTO"); return stopJog(); }
        j = r.j;
      }
      const col = RL.checkCollision(j, RL.frameToMat(S.tool));
      if (col) { api.flashObstacle(col.obstacle.id); msg("quit", `Colisão: ${col.part} encostaria em ${col.obstacle.nome}`, "MOVIMENTO"); return stopJog(); }
      api.setJoints(j, false);
    }, 30);
  }
  function stopJog() { if (K.jog !== null) { clearInterval(K.jog); K.jog = null; } }

  // ---------------- movimentos manuais da IHM ----------------
  function manualFn(fn) {
    if (running()) return setH("H010 Programa em execução — função manual bloqueada", true);
    if (!manual()) return setH("H029 Funções manuais só nos modos T1/T2", true);
    if (!K.drives) return setH("H030 Acionamentos desligados", true);
    if (!K.enable) return setH("H031 Pressione o botão de habilitação", true);
    if (K.manualBusy) return;
    K.manualBusy = true; setH("H012 Função manual em execução", false);
    Promise.resolve(fn()).finally(() => { K.manualBusy = false; setH(""); liveUpdate(); });
  }
  function moveJ(jt, nome) {
    return new Promise(res => {
      const j0 = S.joints.slice(), dmax = Math.max(...jt.map((v, i) => Math.abs(v - j0[i]))); if (dmax < 0.01) return res(true);
      const T = Math.max(0.3, dmax / (90 * S.pov / 100)); let t = 0, last = performance.now(); const tool = RL.frameToMat(S.tool);
      const step = now => {
        if (!K.drives || !K.enable) { msg("state", "Função manual interrompida", "IHM"); return res(false); }
        t += Math.max(0, (now - last) / 1000); last = now; const u = Math.min(1, t / T), s = u - Math.sin(2 * Math.PI * u) / (2 * Math.PI);
        const j = j0.map((v, i) => v + (jt[i] - v) * s); const col = RL.checkCollision(j, tool);
        if (col) { api.flashObstacle(col.obstacle.id); msg("quit", `${nome}: colisão de ${col.part} com ${col.obstacle.nome}`, "IHM"); return res(false); }
        api.setJoints(j, false); if (u < 1) requestAnimationFrame(step); else res(true);
      };
      requestAnimationFrame(step);
    });
  }
  function moveTCP(pos, nome) {
    const F = RL.mul(RL.frameToMat(pos), RL.inv(RL.frameToMat(S.tool))), r = RL.ik(F, S.joints);
    if (!r.ok) { msg("quit", `${nome}: ${r.reason}`, "IHM"); return false; }
    return moveJ(r.j, nome);
  }
  const findObj = t => (cur().scene.objetos || []).find(o => o.tipo === t);
  function conveyorAdvance() {
    const e = findObj("esteira"); if (!e) return setH("H040 Não há esteira neste cenário", true);
    const pp = api.parts(), ps = api.partsRaw().filter((p, i) => Math.abs(pp[i].x - e.x) < e.w / 2 && Math.abs(pp[i].y - e.y) < e.d / 2 && Math.abs(pp[i].z - (e.h + 25)) < 6);
    if (!ps.length) return setH("H041 Nenhuma peça sobre a esteira", true);
    return new Promise(res => { let t = 0, last = performance.now(); const xmax = e.x + e.w / 2 - 28;
      const st = now => { const dt = (now - last) / 1000; last = now; t += dt; ps.forEach(p => { p.position.x = Math.min(xmax, p.position.x + 100 * dt); }); if (t < 1) requestAnimationFrame(st); else res(); };
      requestAnimationFrame(st); });
  }
  const HMI = {
    1: { t: "Funções manuais garra", rows: [
      { l: ["Abrir garra", () => api.setOut(1, false)], r: ["Fechar garra", () => api.setOut(1, true)] },
      { l: ["Girar garra −90°", () => { const j = S.joints.slice(); j[5] -= 90; return j[5] < RL.LIMITS[5][0] ? setH("H050 Limite A6", true) : moveJ(j, "Girar garra"); }], r: ["Girar garra +90°", () => { const j = S.joints.slice(); j[5] += 90; return j[5] > RL.LIMITS[5][1] ? setH("H050 Limite A6", true) : moveJ(j, "Girar garra"); }] },
      { l: ["Garra para baixo 50 mm", () => { const p = api.curPos(); p.Z -= 50; return moveTCP(p, "Garra para baixo"); }], r: ["Garra para cima 50 mm", () => { const p = api.curPos(); p.Z += 50; return moveTCP(p, "Garra para cima"); }] },
    ] },
    2: { t: "Funções manuais robô", rows: [
      { l: ["Robô para HOME", () => moveJ(RL.HOME, "HOME")], r: ["Robô p/ pos. manutenção", () => moveJ([0, -110, 140, 0, -20, 0], "Manutenção")] },
      { l: ["Robô p/ espera mesa", () => { const m = findObj("mesa"); return m ? moveTCP({ X: m.x, Y: m.y, Z: m.h + 250, A: 0, B: 90, C: 0 }, "Espera mesa") : setH("H040 Não há mesa", true); }],
        r: ["Robô p/ espera esteira", () => { const m = findObj("esteira"); return m ? moveTCP({ X: m.x, Y: m.y, Z: m.h + 250, A: 0, B: 90, C: 0 }, "Espera esteira") : setH("H040 Não há esteira", true); }] },
      { l: ["Robô p/ espera palete", () => { const m = findObj("palete"); return m ? moveTCP({ X: m.x, Y: m.y, Z: m.h + 280, A: 0, B: 90, C: 0 }, "Espera palete") : setH("H040 Não há palete", true); }], r: null },
    ] },
    3: { t: "Funções manuais peças e esteira", rows: [
      { l: ["Repor peças (posição inicial)", () => { api.resetCell(true); msg("info", "Peças repostas, robô em HOME", "IHM"); }], r: ["Esteira avançar 100 mm", () => conveyorAdvance()] },
      { l: ["Esteira de entrada desligar", () => { const e = (cur().scene.objetos || []).find(o => o.motor); if (!e) return setH("H040 Não há esteira motorizada", true); api.setOut(e.motor, false); }], r: ["Esteira de entrada ligar", () => { const e = (cur().scene.objetos || []).find(o => o.motor); if (!e) return setH("H040 Não há esteira motorizada", true); api.setOut(e.motor, true); }] },
    ] },
    4: { t: "Funções manuais sinais", rows: [2, 3, 4, 5, 6, 7, 8].map(n => ({ l: [`$OUT[${n}] desligar`, () => api.setOut(n, false)], r: [`$OUT[${n}] ligar`, () => api.setOut(n, true)] })) },
  };
  function setH(t, warn) { K.hStatus = t; K.hWarn = !!warn; if (warn) msg("state", t, "IHM"); if (K.screen === "hmi") renderMain(); }

  // ---------------- navegação entre telas ----------------
  function go(sc) { K.screen = sc; renderMain(); renderSoft(); }
  function refresh() { renderSide(); renderStatus(); renderMain(); renderSoft(); }

  function renderStatus() {
    const st = S.machine ? S.machine.state : null;
    const R = !K.selected ? "g" : st === "running" ? "ok" : st === "paused" ? "w" : "e";
    const p = cur(), ip = S.curLine && S.machine ? S.curLine.line : (K.selected ? 1 : "");
    const sh = `<span>Num</span><span class="k-sir"><i class="ok">S</i><i class="${K.drives ? "ok" : "e"}">I</i><i class="${R}">R</i></span>
      <span class="k-pn">${K.selected ? esc(api.progName(p.src).toUpperCase()) : "—"}</span><span>IP=${ip}</span><span><b>${K.mode}</b></span><span>${K.runMode}</span>
      <span>${K.jog !== null ? "HOV" : "POV"} ${S.pov}%</span><span>${ROBOT}</span><span>${K.user}</span><span>${new Date().toTimeString().slice(0, 5)}</span>`;
    if (sh !== K.statusHtml) { K.statusHtml = sh; $("kStatus").innerHTML = sh; }
  }
  function renderMsgs() {
    const ic = { info: "ⓘ", quit: "⛔", state: "⚠" };
    $("kMsgs").innerHTML = `<table><tr><th></th><th>Hora</th><th>Nº</th><th>Origem</th><th>Mensagem</th></tr>${K.msgs.slice(-40).map((m, i, a) => `<tr class="${m.type} ${i === a.length - 1 ? "sel" : ""}"><td>${ic[m.type]}</td><td>${m.time}</td><td>${m.no}</td><td>${esc(m.src)}</td><td>${esc(m.text)}</td></tr>`).join("")}</table>`;
    $("kMsgs").scrollTop = 1e6;
  }
  function softkeys(list) { kSoft.innerHTML = list.map((s, i) => s ? `<button data-s="${i}" ${s[2] === false ? "disabled" : ""}>${esc(s[0])}</button>` : `<button disabled></button>`).join(""); kSoft.onclick = e => { const b = e.target.closest("[data-s]"); if (b) list[+b.dataset.s][1](); }; }
  const ACK = [["Ackn.", () => ack(false)], ["Ackn. todos", () => ack(true)]];
  function renderSoft() {
    const back = ["Voltar", () => go(K.selected ? "edit" : "nav")];
    const s = K.screen;
    if (s === "nav") softkeys([["Novo", navNew, isExpert()], ["Selecionar", navSelect], ["Duplicar", navDup], ["Arquivar", archive], ["Apagar", navDel, isExpert()], ["Abrir", navOpen, isExpert()], ...ACK]);
    else if (s === "edit" && K.openEdit) softkeys([["Fechar", closeEdit], [K.editFile === "src" ? "Ver .dat" : "Ver .src", () => { saveEdit(); K.editFile = K.editFile === "src" ? "dat" : "src"; renderMain(); renderSoft(); }], ["Navegador", () => { closeEdit(); go("nav"); }], null, null, null, ...ACK]);
    else if (s === "edit") softkeys([["Navegador", () => go("nav")], ["Cancelar seleção", deselect, !running()], ["Resetar programa", resetProg], ["IHM célula", () => go("hmi")], null, null, ...ACK]);
    else if (s === "hmi") softkeys([["Stop robô", () => { if (running()) S.machine.pause(); }], ["Formação", () => go("form")], ["Contadores", () => go("cont")], ["Programa", () => go(K.selected ? "edit" : "nav")], null, null, ...ACK]);
    else if (s === "master") softkeys([["Desajustar", () => { if (!isExpert()) return msg("state", "Desajustar exige grupo Expert"); if (running()) return; K.unmastered.add(K.masterSel); msg("state", `Eixo A${K.masterSel + 1} desajustado`, "AJUSTE"); renderMain(); }, isExpert()],
      ["Ajustar (EMT)", () => { if (!K.unmastered.has(K.masterSel)) return msg("info", `A${K.masterSel + 1} já está ajustado`, "AJUSTE"); if (!manual()) return msg("state", "Ajuste só em T1/T2", "AJUSTE"); K.unmastered.delete(K.masterSel); msg("info", `Ajuste padrão (EMT) do eixo A${K.masterSel + 1} concluído`, "AJUSTE"); renderMain(); }], back, null, null, null, ...ACK]);
    else softkeys([back, null, null, null, null, null, ...ACK]);
  }

  // ---------------- telas ----------------
  function renderMain() {
    const s = K.screen, p = cur(); kMain.onclick = null; kMain.onkeydown = null;
    if (s === "nav") {
      const rows = K.navFolder === "prog" ? store().projects.flatMap(q => ["src", "dat"].map(ext => ({ id: q.id, n: api.progName(q.src), ext, com: q.name, dt: q.updated, cat: q.cat })))
        : K.navFolder === "ex" ? EX().map(e => ({ id: "ex:" + e.id, n: (e.src.match(/DEF\s+(\w+)/i) || [])[1], ext: "src", com: e.title, dt: "", cat: e.cat })) : [];
      kMain.innerHTML = `<div class="k-nav"><div class="k-tree"><div class="k-filter">Filtro: Detalhe</div>
        <div>🖥 ${ROBOT} (KRC:\\)</div><div class="ind">📁 R1</div>
        <div class="ind2 ${K.navFolder === "prog" ? "on" : ""}" data-f="prog">📂 Programa</div><div class="ind2 ${K.navFolder === "ex" ? "on" : ""}" data-f="ex">📂 Exemplos</div>
        <div class="ind2" data-f="mada">📁 Mada</div><div class="ind2" data-f="sys">📁 System</div><div class="ind">📁 STEU</div><div>💾 (ARQUIVO:\\)</div></div>
        <div class="k-list"><div class="k-lh">Conteúdo de: ${{ prog: "Programa", ex: "Exemplos", mada: "Mada", sys: "System" }[K.navFolder]}</div>
        <table><tr><th>Nome</th><th>Ext</th><th>Comentário</th><th>Alterado</th></tr>${rows.map(r => `<tr data-id="${r.id}" class="${K.navSel === r.id ? "sel" : ""}${K.selected && cur() && r.id === cur().id ? " act" : ""}"><td>${r.ext === "src" ? "📄" : "🗒"} ${esc(r.n)}</td><td>${r.ext}</td><td>${esc(r.com)}</td><td>${r.dt ? new Date(r.dt).toLocaleDateString("pt-BR") : ""}</td></tr>`).join("")}</table>
        ${K.navFolder === "mada" || K.navFolder === "sys" ? `<p class="k-note">Pasta do sistema (dados de máquina). Somente leitura no simulador.</p>` : ""}</div>
        <div class="k-cnt">${rows.length} objeto(s)</div></div>`;
      kMain.querySelector(".k-tree").onclick = e => { const f = e.target.closest("[data-f]"); if (f) { K.navFolder = f.dataset.f; K.navSel = null; renderMain(); } };
      kMain.querySelector(".k-list").onclick = e => { const r = e.target.closest("[data-id]"); if (r) { K.navSel = r.dataset.id; renderMain(); } };
      kMain.querySelector(".k-list").ondblclick = e => { const r = e.target.closest("[data-id]"); if (r) { K.navSel = r.dataset.id; navSelect(); } };
    } else if (s === "edit") {
      if (!K.selected || !p) { kMain.innerHTML = `<div class="k-empty">Nenhum programa selecionado.<br>Abra o Navegador e use Selecionar.</div>`; return; }
      const n = api.progName(p.src).toUpperCase();
      if (K.openEdit) {
        kMain.innerHTML = `<div class="k-ed"><textarea id="kTa" spellcheck="false">${esc(p[K.editFile])}</textarea><div class="k-path">KRC:\\R1\\PROGRAMA\\${n}.${K.editFile.toUpperCase()} · editando (Expert)</div></div>`;
        return;
      }
      const lines = p.src.split("\n"), cl = S.curLine && S.curLine.file === "src" && S.machine ? S.curLine.line : (lines.findIndex(l => /^\s*(GLOBAL\s+)?DEF\s/i.test(l)) + 1);
      kMain.innerHTML = `<div class="k-ed"><div class="k-code" id="kCode">${lines.map((l, i) => `<div class="${i + 1 === cl ? "ip" : ""}"><span class="ln">${i + 1}</span><span class="ar">${i + 1 === cl ? "➡" : ""}</span>${hlLine(l) || " "}</div>`).join("")}</div><div class="k-path">KRC:\\R1\\PROGRAMA\\${n}.SRC · Ln ${cl}, Col 0</div></div>`;
      const c = $("kCode"), el = c.querySelector(".ip"); if (el) { const top = el.offsetTop - c.clientHeight / 3; if (Math.abs(c.scrollTop - top) > c.clientHeight / 3) c.scrollTop = top; }
    } else if (s === "hmi") {
      const g = HMI[K.hmiGroup], st = K.hStatus || (running() ? "H010 Robô em ciclo automático" : "H007 Robô esperando por função manual ou automático");
      kMain.innerHTML = `<div class="k-hmi"><div class="k-htop"><span class="k-hsel">≡ Menu</span><span class="k-ht">${esc(g.t)}</span><span>${new Date().toLocaleDateString("pt-BR")} ${new Date().toTimeString().slice(0, 8)}</span></div>
        <div class="k-hst ${K.hWarn ? "warn" : ""}">${esc(st)}</div><div class="k-hform">${formText()}</div>
        <div class="k-hbody"><div class="k-hrows">${Array.from({ length: 8 }, (_, i) => { const r = g.rows[i]; return `<div class="k-hr" data-r="${i}"><i>${r ? "⊘" : ""}</i><span class="${r && K.hmiRow === i ? "yl" : ""}">${r && r.l ? esc(r.l[0]) : ""}</span><span class="${r && K.hmiRow === i ? "cy" : ""}">${r && r.r ? esc(r.r[0]) : ""}</span><i>${r ? "⊘" : ""}</i></div>`; }).join("")}</div>
        <div class="k-hpm"><button data-pm="-1" title="Executa a função da esquerda (amarela)">−</button><button data-pm="1" title="Executa a função da direita (ciano)">+</button></div></div>
        <div class="k-hgroups">${Object.entries(HMI).map(([k, v]) => `<button data-g="${k}" class="${+k === K.hmiGroup ? "on" : ""}">${k} ${esc(v.t.replace("Funções manuais ", ""))}</button>`).join("")}</div></div>`;
      kMain.querySelector(".k-hrows").onclick = e => { const r = e.target.closest("[data-r]"); if (r && g.rows[+r.dataset.r]) { K.hmiRow = +r.dataset.r; renderMain(); } };
      kMain.querySelector(".k-hgroups").onclick = e => { const b = e.target.closest("[data-g]"); if (b) { K.hmiGroup = +b.dataset.g; K.hmiRow = 0; renderMain(); } };
      kMain.querySelector(".k-hpm").onclick = e => { const b = e.target.closest("[data-pm]"); if (!b) return; const r = g.rows[K.hmiRow]; const a = r && (+b.dataset.pm < 0 ? r.l : r.r); if (a) manualFn(a[1]); };
    } else if (s === "io") {
      const NI = { 1: "Partida / seleção bit 1", 2: "Seleção bit 2 / parar ciclos", 3: "Seleção bit 3", 5: "Cortina de luz", 6: "Peça reprovada (inspeção)", 7: "Encerrar (CLP)", 8: "Partida externa (EXT)" };
      const NO = { 1: "Garra fechar", 2: "Robô pronto", 3: "Tocha / em ciclo", 4: "Cola / máquina / ciclo ok", 5: "Câmera", 8: "Alarme / falha" };
      kMain.innerHTML = `<div class="k-io"><div><div class="k-lh">Entradas digitais</div><table>${Array.from({ length: 8 }, (_, i) => i + 1).map(n => `<tr data-in="${n}"><td><i class="k-led ${S.ins[n] ? "on" : ""}"></i></td><td>$IN[${n}]</td><td>${NI[n] || ""}</td></tr>`).join("")}</table><p class="k-note">Clique para simular o sinal.</p></div>
        <div><div class="k-lh">Saídas digitais</div><table>${Array.from({ length: 16 }, (_, i) => i + 1).map(n => `<tr data-out="${n}"><td><i class="k-led ${S.outs[n] ? "on" : ""}"></i></td><td>$OUT[${n}]</td><td>${NO[n] || ""}</td></tr>`).join("")}</table><p class="k-note">Forçar saída: Expert, modo manual, sem programa rodando.</p></div></div>`;
      kMain.onclick = e => {
        const a = e.target.closest("[data-in]"), b = e.target.closest("[data-out]");
        if (a) { const n = +a.dataset.in; S.ins[n] = !S.ins[n]; const btn = $("ins").children[n - 1]; if (btn) btn.classList.toggle("on", S.ins[n]); renderMain(); }
        if (b) { const n = +b.dataset.out; if (!isExpert() || !manual() || running()) return msg("state", "Forçar saída: exige Expert, T1/T2 e programa parado"); api.setOut(n, !S.outs[n]); renderMain(); }
      };
    } else if (s === "var") {
      kMain.innerHTML = `<div class="k-var"><div class="k-lh">Monitor de variável</div><div class="k-vr"><label>Nome</label><input id="kVn" value="${esc(K.varName)}" spellcheck="false"><button id="kVb">Mostrar</button></div>
        <div class="k-vr"><label>Valor atual</label><div id="kVv" class="k-vv"></div></div>
        <div class="k-vq">${["$POS_ACT", "$AXIS_ACT", "$OUT[1]", "$IN[1]", "$VEL.CP", "$TOOL", "$BASE", "$OV_PRO"].map(v => `<button data-v="${v}">${v}</button>`).join("")}</div>
        <p class="k-note">Também mostra variáveis do programa (.dat e, com o programa rodando, as do módulo). Ex.: P_PEGA_A, P_PEGA_A.Z</p></div>`;
      const show = () => { K.varName = $("kVn").value.trim(); liveUpdate(); };
      $("kVb").onclick = show; $("kVn").onkeydown = e => { if (e.key === "Enter") show(); };
      kMain.querySelector(".k-vq").onclick = e => { const v = e.target.dataset.v; if (v) { $("kVn").value = v; show(); } };
      liveUpdate();
    } else if (s === "pos") {
      kMain.innerHTML = `<div class="k-io"><div><div class="k-lh">Posição cartesiana (BASE)</div><table id="kPc"></table><p class="k-note">Ferramenta: {X ${S.tool.X}, Y ${S.tool.Y}, Z ${S.tool.Z}}<br>Base: {X ${S.base.X}, Y ${S.base.Y}, Z ${S.base.Z}, A ${S.base.A}}</p></div><div><div class="k-lh">Posição dos eixos</div><table id="kPa"></table></div></div>`;
      liveUpdate();
    } else if (s === "master" || s === "lim") {
      kMain.innerHTML = `<div class="k-var"><div class="k-lh">${s === "master" ? "Ajuste dos eixos (mastering)" : "Limites de software"}</div><table class="k-mt">${RL.LIMITS.map((l, i) => `<tr data-ax="${i}" class="${s === "master" && K.masterSel === i ? "sel" : ""}"><td>A${i + 1}</td>${s === "master" ? `<td>${K.unmastered.has(i) ? `<b class="e">NÃO AJUSTADO</b>` : `<b class="ok">ajustado</b>`}</td>` : `<td>${l[0]}°</td><td>${l[1]}°</td><td>atual ${S.joints[i].toFixed(1)}°</td>`}</tr>`).join("")}</table>
        <p class="k-note">${s === "master" ? "Com um eixo desajustado, o robô não executa programas nem jog cartesiano (só jog por eixos). Desajustar exige o grupo Expert; Ajustar só em T1/T2." : "Limites didáticos do robô simulado."}</p></div>`;
      if (s === "master") kMain.querySelector(".k-mt").onclick = e => { const r = e.target.closest("[data-ax]"); if (r) { K.masterSel = +r.dataset.ax; renderMain(); } };
    } else if (s === "user") {
      kMain.innerHTML = `<div class="k-dlg"><b>Grupo de usuário</b><p>Grupo atual: <b>${K.user}</b></p><p>Selecione um novo grupo:</p>
        <div class="k-vq">${["Operador", "Usuário", "Expert"].map(u => `<button data-u="${u}" class="${u === K.user ? "on" : ""}">${u}</button>`).join("")}</div>
        <div id="kPw" style="display:none"><p>Digite a senha do grupo Expert:</p><input type="password" id="kPwi"> <button id="kPwb">OK</button><p class="k-note">Senha padrão do simulador: <code>korum</code></p></div>
        <p class="k-note">Operador e Usuário selecionam e executam programas. Expert também cria, edita, apaga, desajusta eixos e força saídas.</p></div>`;
      kMain.querySelector(".k-vq").onclick = e => { const u = e.target.dataset.u; if (!u) return; if (u === "Expert") { $("kPw").style.display = "block"; $("kPwi").focus(); } else { K.user = u; msg("info", `Grupo de usuário: ${u}`, "SISTEMA"); refresh(); } };
      const okPw = () => { if ($("kPwi").value === "korum") { K.user = "Expert"; msg("info", "Grupo de usuário: Expert", "SISTEMA"); refresh(); } else { msg("state", "Senha incorreta", "SISTEMA"); $("kPwi").value = ""; } };
      kMain.onclick = e => { if (e.target.id === "kPwb") okPw(); }; kMain.onkeydown = e => { if (e.target.id === "kPwi" && e.key === "Enter") okPw(); };
    } else if (s === "mode") {
      const D = { T1: "Manual com velocidade reduzida: TCP no máximo 250 mm/s. Segure Start e mantenha a habilitação.", T2: "Manual com velocidade programada (teste). Segure Start e mantenha a habilitação.", AUT: "Automático: um toque em Start executa. Habilitação não é usada.", EXT: "Automático externo: o CLP dá a partida pela entrada $IN[8] (borda de subida)." };
      kMain.innerHTML = `<div class="k-dlg"><b>Chave de modo de operação</b><div class="k-modes">${Object.keys(D).map(m => `<button data-md="${m}" class="${m === K.mode ? "on" : ""}"><b>${m}</b><small>${D[m]}</small></button>`).join("")}</div>
        <p class="k-note">Trocar de modo para o programa em execução, como no controlador real.</p></div>`;
      kMain.querySelector(".k-modes").onclick = e => { const b = e.target.closest("[data-md]"); if (!b) return; const m = b.dataset.md; if (m === K.mode) return;
        if (running()) { S.machine.stop(); msg("state", "Troca de modo: programa parado", "SISTEMA"); }
        K.mode = m; stopJog(); msg("info", `Modo de operação: ${m}`, "SISTEMA"); if (m === "AUT" || m === "EXT") K.enable = false; refresh(); };
    } else if (s === "form") {
      kMain.innerHTML = `<div class="k-var"><div class="k-lh">Visualizando formação da camada</div><div id="kForm"></div></div>`; liveUpdate();
    } else if (s === "cont") {
      kMain.innerHTML = `<div class="k-var"><div class="k-lh">Variáveis 1–8</div><table class="k-ct" id="kCt"></table><div class="k-vq"><button id="kCz">Zerar contador de ciclos</button></div></div>`;
      $("kCz").onclick = () => { K.cycles = 0; liveUpdate(); }; liveUpdate();
    } else if (s === "about") {
      kMain.innerHTML = `<div class="k-dlg"><b>Modo painel</b><p>Reproduz, de forma didática, o fluxo de trabalho de um painel de programação de robô industrial: navegador de arquivos, seleção e execução de programas com a seta de execução, mensagens com confirmação, modos T1/T2/AUT/EXT, tecla Start segurada nos modos manuais, botão de habilitação, jog, override, grupos de usuário, ajuste de eixos, monitor de E/S e variáveis e uma IHM de célula (Ctrl+F12).</p><p class="k-note">Não é o software de nenhum fabricante e não se comunica com robôs reais.</p></div>`;
    }
  }
  function formText() {
    const pal = findObj("palete"); if (!pal) return `Cenário: ${esc(cur().scene.nome || "")}`;
    const f = pallet(pal); return `Palete: ${f.total} peça(s) · ${f.layers.filter(n => n).length} camada(s)`;
  }
  function pallet(pal) {
    const layers = new Array(16).fill(0); let total = 0;
    api.parts().forEach(q => { if (Math.abs(q.x - pal.x) < pal.w / 2 && Math.abs(q.y - pal.y) < pal.d / 2) { const L = Math.round((q.z - (pal.h + 25)) / 50); if (L >= 0 && L < 16) { layers[L]++; total++; } } });
    return { layers, total };
  }
  function fmtV(v) {
    if (v === undefined) return "(sem valor)"; if (typeof v === "boolean") return v ? "TRUE" : "FALSE"; if (typeof v === "number") return String(Math.round(v * 1000) / 1000);
    if (v && v.__in) return "use $IN[n]"; if (Array.isArray(v)) return "[" + v.slice(1, 17).map(fmtV).join(", ") + "]";
    if (typeof v === "object") return "{" + Object.entries(v).filter(([k]) => k !== "__t").map(([k, x]) => `${k} ${fmtV(x)}`).join(", ") + "}"; return String(v);
  }
  function evalVar(text) {
    try {
      let m = S.machine;
      if (!m) { const p = cur(), pr = RL.parse(p.src, p.dat); const mod = pr.errors.length ? { mod: { defs: {}, order: [], dat: [] } } : pr;
        m = new RL.Machine(mod, { getJoints: () => S.joints, getIn: n => !!S.ins[n], getOverride: () => S.pov, setOverride() { }, log() { }, line() { }, status() { }, output() { } });
        m.sys.OUT = S.outs; m.sys.TOOL = Object.assign({ __t: "FRAME" }, S.tool); m.sys.BASE = Object.assign({ __t: "FRAME" }, S.base);
        for (const d of mod.mod.dat) { try { if (!d.compat) m.declare(d, m.modScope); } catch (e) { } } }
      return fmtV(RL.evalExpr(m, text.toUpperCase().startsWith("$") ? text : text));
    } catch (e) { return "⚠ " + e.message; }
  }
  function liveUpdate() {
    const s = K.screen;
    if (s === "var" && $("kVv")) $("kVv").textContent = evalVar(K.varName);
    if (s === "pos" && $("kPc")) { const p = api.curPos(); $("kPc").innerHTML = "XYZABC".split("").map(k => `<tr><td>${k}</td><td>${p[k].toFixed(2)}</td><td>${"XYZ".includes(k) ? "mm" : "°"}</td></tr>`).join(""); $("kPa").innerHTML = S.joints.map((v, i) => `<tr><td>A${i + 1}</td><td>${v.toFixed(2)}</td><td>°</td></tr>`).join(""); }
    if (s === "form" && $("kForm")) {
      const pal = findObj("palete");
      if (!pal) { $("kForm").innerHTML = `<p class="k-note">Este cenário não tem palete. Abra um exemplo de paletização (T13, T14 ou "Paletização 2×2").</p>`; return; }
      const f = pallet(pal);
      $("kForm").innerHTML = `<div class="k-pal">${f.layers.map((n, i) => ({ n, i })).reverse().map(({ n, i }) => `<div class="${n ? "full" : ""}"><span>${i}</span><b style="width:${Math.min(100, n * 25)}%"></b><em>${n ? n + " peça(s)" : ""}</em></div>`).join("")}<div class="wood"></div></div>
        <p class="k-note">Camadas 0 a 15 do palete. Verde = camada com peças. Total: ${f.total} peça(s).</p>`;
    }
    if (s === "cont" && $("kCt")) {
      const pal = findObj("palete"), est = findObj("esteira"), ps = api.parts();
      const inObj = (q, o) => o && Math.abs(q.x - o.x) < o.w / 2 && Math.abs(q.y - o.y) < o.d / 2;
      const rows = [["Peças no palete", pal ? ps.filter(q => inObj(q, pal)).length : "—", pal ? ps.length : "—"], ["Camadas no palete", pal ? pallet(pal).layers.filter(n => n).length : "—", "—"],
        ["Peças na esteira", est ? ps.filter(q => inObj(q, est)).length : "—", "—"], ["Peça na garra", S.outs[1] ? "garra fechada" : "garra aberta", "—"], ["Ciclos de programa concluídos", K.cycles, "—"], ["Override", S.pov + " %", "—"]];
      $("kCt").innerHTML = `<tr><th></th><th>Atual</th><th>Nominal</th></tr>` + rows.map(r => `<tr><td>${r[0]}</td><td class="a">${r[1]}</td><td class="n">${r[2]}</td></tr>`).join("");
    }
    if (s === "io" && kMain.querySelector(".k-io")) { kMain.querySelectorAll("[data-in]").forEach(r => r.querySelector(".k-led").classList.toggle("on", !!S.ins[+r.dataset.in])); kMain.querySelectorAll("[data-out]").forEach(r => r.querySelector(".k-led").classList.toggle("on", !!S.outs[+r.dataset.out])); }
    if (s === "hmi" && kMain.querySelector(".k-hform")) kMain.querySelector(".k-hform").innerHTML = formText();
  }

  // ---------------- ações do navegador ----------------
  const store = () => api.store; const EX = () => api.EXAMPLES;
  function navTarget() {
    if (!K.navSel) { msg("state", "Selecione um arquivo na lista"); return null; }
    if (K.navSel.startsWith("ex:")) { const e = EX().find(x => x.id === K.navSel.slice(3)); api.openExample(e); api.showPane("kcp"); K.navFolder = "prog"; K.navSel = cur().id; return cur(); }
    return store().projects.find(p => p.id === K.navSel);
  }
  function navSelect() {
    if (running()) return msg("state", "Pare o programa antes de selecionar outro");
    const p = navTarget(); if (!p) return; if (p.id !== store().currentId) api.openProject(p.id);
    const pr = api.check(false); if (!pr) { K.selected = false; msg("quit", "Programa com erros de compilação — corrija no editor", "INTERP"); refresh(); return; }
    K.selected = true; K.openEdit = false; K.bco = true; S.curLine = null; msg("info", `Programa ${api.progName(p.src).toUpperCase()} selecionado`, "INTERP"); go("edit"); renderStatus();
  }
  function deselect() { if (running()) return msg("state", "Pare o programa antes de cancelar a seleção"); K.selected = false; S.curLine = null; msg("info", "Seleção cancelada", "INTERP"); go("nav"); renderStatus(); }
  function resetProg() { if (running()) { S.machine.stop(); } K.bco = true; S.curLine = null; msg("info", "Programa resetado — seta no início", "INTERP"); refresh(); }
  function navOpen() {
    if (!isExpert()) return msg("state", "Abrir para edição exige o grupo Expert (Configurar → Grupo de usuário)");
    if (running()) return msg("state", "Não é possível editar com o programa em execução");
    const p = K.screen === "nav" ? navTarget() : cur(); if (!p) return; if (p.id !== store().currentId) api.openProject(p.id);
    K.selected = true; K.openEdit = true; K.editFile = (K.navSel && K.screen === "nav" && kMain.querySelector("tr.sel td:nth-child(2)") && kMain.querySelector("tr.sel td:nth-child(2)").textContent === "dat") ? "dat" : "src"; go("edit");
  }
  function saveEdit() { const t = $("kTa"); if (!t) return; const p = cur(); if (p[K.editFile] !== t.value) { api.saveVersion("Antes de editar no painel"); p[K.editFile] = t.value; api.markDirty(); api.setFile(K.editFile); api.updateNames(); api.previewPoints(); } }
  function closeEdit() { saveEdit(); K.openEdit = false; const pr = api.check(false); if (!pr) msg("quit", "Erros de compilação — veja o console do editor principal", "INTERP"); else msg("info", "Programa salvo", "INTERP"); go("edit"); }
  async function navNew() {
    if (!isExpert()) return msg("state", "Criar programa exige o grupo Expert");
    const name = await api.askText("Novo programa", "Nome do módulo (sem espaços):", "novo_prog"); if (!name) return;
    const n = name.replace(/[^A-Za-z0-9_]/g, "_").replace(/^(\d)/, "_$1").slice(0, 24) || "novo_prog";
    const p = api.newProject({ name: n, cat: "Movimentação básica", src: `DEF ${n}()\n  INI\n  PTP HOME\n\n  PTP HOME\nEND`, dat: `DEFDAT ${n}\n\nENDDAT`, scene: cur() ? cur().scene : api.SCENES.pick });
    K.navFolder = "prog"; K.navSel = p.id; api.openProject(p.id); msg("info", `Módulo ${n.toUpperCase()} criado`, "NAVEGADOR"); renderMain();
  }
  function navDup() { const p = navTarget(); if (!p) return; const c = JSON.parse(JSON.stringify(p)); c.id = Date.now().toString(36); c.name = p.name + " (cópia)"; store().projects.unshift(c); api.markDirty(); K.navSel = c.id; msg("info", "Projeto duplicado", "NAVEGADOR"); renderMain(); }
  async function navDel() {
    if (!isExpert()) return msg("state", "Apagar exige o grupo Expert"); const p = navTarget(); if (!p) return;
    if (K.selected && p.id === cur().id) return msg("state", "Não é possível apagar o programa selecionado");
    const ok = await api.ask("Apagar", `Apagar <b>${esc(p.name)}</b>?`, [{ label: "Cancelar", value: false }, { label: "Apagar", value: true, danger: true }]); if (!ok) return;
    store().projects = store().projects.filter(x => x !== p); api.store.projects = store().projects; api.markDirty(); K.navSel = null; msg("info", "Projeto apagado", "NAVEGADOR"); renderMain();
  }
  async function archive() { const p = K.screen === "nav" && K.navSel && !K.navSel.startsWith("ex:") ? store().projects.find(x => x.id === K.navSel) : cur(); if (!p) return; const data = await api.makeZip([p], "projeto"); const r = await api.platform.saveFile(`korum-${api.safe(p.name)}-${api.stamp()}.zip`, data); if (r && r.saved) msg("info", `Arquivado: ${r.path}`, "ARQUIVO"); }
  async function rename() { const p = cur(); if (!p) return; const n = await api.askText("Renomear", "Novo nome do projeto:", p.name); if (n) { p.name = n; $("projName").value = n; api.markDirty(); renderMain(); } }
  function setRun(m) { K.runMode = m; if (S.machine) { S.machine.stepMode = m === "ISTEP"; } msg("info", `Modo de execução: ${m}`, "INTERP"); refresh(); }

  // ---------------- teclado ----------------
  document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "F12") { e.preventDefault(); if (S.pane !== "kcp") api.showPane("kcp"); go("hmi"); }
  });
  setInterval(() => { if (S.pane === "kcp") { if (!K.startHeld && K.jog === null) renderSide(); if (K.screen === "edit" && !K.openEdit && S.machine && S.curLine && S.curLine.line !== K.lastIp) { K.lastIp = S.curLine.line; renderMain(); } } }, 200);

  S.kcpShow = () => { refresh(); renderMsgs(); if (!K.msgs.length) { msg("info", "Painel pronto. Ligue os acionamentos (Acion.), selecione um programa no Navegador e use Start.", "SISTEMA"); msg("quit", "Contator dos acionamentos desligado", "ACIONAM."); } };
  refresh();
}
