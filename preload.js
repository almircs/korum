// Ponte segura entre a janela e o disco: só estas funções ficam visíveis para a página.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('korum', {
  version: ipcRenderer.sendSync('app:version'),
  load: () => ipcRenderer.invoke('data:load'),
  saveSync: (json) => ipcRenderer.sendSync('data:save', json),
  saveFile: (name, data, dir) => ipcRenderer.invoke('file:save', name, data, dir),
  chooseDir: () => ipcRenderer.invoke('app:chooseDir'),
  openDataFolder: () => ipcRenderer.invoke('app:openDataFolder'),
  ai: (req) => ipcRenderer.invoke('ai:ask', req)
});
