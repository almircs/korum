// Korum — processo principal do Electron
const { app, BrowserWindow, ipcMain, dialog, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

app.commandLine.appendSwitch('lang', 'pt-BR');
const DATA_NAME = 'korum.json';
const KEEP_BACKUPS = 30;
let win = null;

const dataDir = () => app.getPath('userData');
const dataFile = () => path.join(dataDir(), DATA_NAME);
const backupDir = () => path.join(dataDir(), 'backups');

// Uma janela só: abrir o programa de novo traz a janela existente para a frente.
if (!app.requestSingleInstanceLock()) app.quit();
else app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });

function loadData() { try { return fs.readFileSync(dataFile(), 'utf8'); } catch { return null; } }

// Grava num arquivo temporário e depois troca, para nunca deixar o arquivo pela metade.
function saveData(json) {
  fs.mkdirSync(dataDir(), { recursive: true });
  const tmp = dataFile() + '.tmp';
  fs.writeFileSync(tmp, json, 'utf8');
  fs.renameSync(tmp, dataFile());
  dailyBackup(json);
}

// Uma cópia automática por dia (estado mais recente do dia), guardando as últimas 30.
function dailyBackup(json) {
  try {
    fs.mkdirSync(backupDir(), { recursive: true });
    const d = new Date();
    const stamp = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const file = path.join(backupDir(), `korum-${stamp}.json`);
    fs.writeFileSync(file + '.tmp', json, 'utf8');
    fs.renameSync(file + '.tmp', file);
    const all = fs.readdirSync(backupDir()).filter(f => /^korum-\d{4}-\d{2}-\d{2}\.json$/.test(f)).sort();
    for (const old of all.slice(0, Math.max(0, all.length - KEEP_BACKUPS))) fs.unlinkSync(path.join(backupDir(), old));
  } catch { /* cópia automática é opcional */ }
}

ipcMain.handle('data:load', () => loadData());
ipcMain.on('data:save', (event, json) => {
  try { saveData(json); event.returnValue = true; } catch { event.returnValue = false; }
});
ipcMain.on('app:version', e => { e.returnValue = app.getVersion(); });

ipcMain.handle('file:save', async (event, name, data, dir) => {
  const ext = path.extname(name).slice(1).toLowerCase();
  const labels = { zip: 'Backup do Korum', src: 'Programa KRL', dat: 'Dados KRL', json: 'Arquivo JSON' };
  const base = dir && fs.existsSync(dir) ? dir : app.getPath('documents');
  const res = await dialog.showSaveDialog(win, {
    title: 'Salvar arquivo', defaultPath: path.join(base, name),
    filters: [{ name: labels[ext] || 'Arquivo', extensions: [ext || '*'] }, { name: 'Todos os arquivos', extensions: ['*'] }]
  });
  if (res.canceled || !res.filePath) return { saved: false };
  fs.writeFileSync(res.filePath, typeof data === 'string' ? Buffer.from(data, 'utf8') : Buffer.from(data));
  return { saved: true, path: res.filePath };
});
ipcMain.handle('app:chooseDir', async () => {
  const res = await dialog.showOpenDialog(win, { title: 'Pasta para os backups do Korum', properties: ['openDirectory', 'createDirectory'] });
  return res.canceled || !res.filePaths.length ? null : res.filePaths[0];
});
ipcMain.handle('app:openDataFolder', () => shell.openPath(dataDir()));

// Professor com IA: a chamada sai do processo principal (a chave nunca vai para outro lugar).
ipcMain.handle('ai:ask', async (event, req) => {
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': req.apiKey, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: req.model, max_tokens: 2000, system: req.system, messages: req.messages })
    });
    const j = await r.json();
    if (!r.ok) return { error: (j.error && j.error.message) || `HTTP ${r.status}` };
    return { text: (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n') };
  } catch (e) { return { error: e.message }; }
});

function buildMenu() {
  const isMac = process.platform === 'darwin';
  const template = [
    ...(isMac ? [{ label: 'Korum', submenu: [
      { role: 'about', label: 'Sobre o Korum' }, { type: 'separator' },
      { role: 'hide', label: 'Ocultar' }, { role: 'hideOthers', label: 'Ocultar outros' }, { role: 'unhide', label: 'Mostrar todos' },
      { type: 'separator' }, { role: 'quit', label: 'Sair' }] }] : []),
    { label: 'Arquivo', submenu: [
      { label: 'Abrir pasta dos dados', click: () => shell.openPath(dataDir()) },
      { label: 'Abrir pasta das cópias automáticas', click: () => { fs.mkdirSync(backupDir(), { recursive: true }); shell.openPath(backupDir()); } },
      { type: 'separator' },
      isMac ? { role: 'close', label: 'Fechar janela' } : { role: 'quit', label: 'Sair' }] },
    { label: 'Editar', submenu: [
      { role: 'undo', label: 'Desfazer' }, { role: 'redo', label: 'Refazer' }, { type: 'separator' },
      { role: 'cut', label: 'Recortar' }, { role: 'copy', label: 'Copiar' }, { role: 'paste', label: 'Colar' },
      { role: 'selectAll', label: 'Selecionar tudo' }] },
    { label: 'Exibir', submenu: [
      { role: 'reload', label: 'Recarregar' }, { type: 'separator' },
      { role: 'resetZoom', label: 'Tamanho normal' }, { role: 'zoomIn', label: 'Aumentar' }, { role: 'zoomOut', label: 'Diminuir' },
      { type: 'separator' }, { role: 'togglefullscreen', label: 'Tela cheia' }] }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

function createWindow() {
  win = new BrowserWindow({
    width: 1500, height: 920, minWidth: 1100, minHeight: 680,
    title: 'Korum', icon: path.join(__dirname, 'build', 'icon.png'), backgroundColor: '#0f1216',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, nodeIntegration: false, sandbox: true, spellcheck: false }
  });
  win.loadFile(path.join(__dirname, 'app', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => { if (/^https?:/.test(url)) shell.openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file:')) { e.preventDefault(); if (/^https?:/.test(url)) shell.openExternal(url); } });
  win.on('closed', () => { win = null; });
}

app.whenReady().then(() => {
  buildMenu(); createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
