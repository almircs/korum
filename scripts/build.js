// Gera a pasta app/ (o que o Electron abre) a partir de src/, core.js e data.js
const fs = require("fs"), path = require("path"), esbuild = require("esbuild");
const R = p => path.join(__dirname, "..", p);
fs.mkdirSync(R("app/fonts"), { recursive: true });
esbuild.buildSync({ entryPoints: [R("src/ui.js")], bundle: true, format: "iife", minify: true, target: "chrome120", outfile: R("app/ui.bundle.js"), legalComments: "none" });
for (const f of ["core.js", "data.js"]) fs.copyFileSync(R(f), R("app/" + f));
fs.copyFileSync(R("src/index.html"), R("app/index.html"));
fs.copyFileSync(R("build/icon-256.png"), R("app/icon.png"));
const F = { "plex-sans-400": "ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2", "plex-sans-500": "ibm-plex-sans/files/ibm-plex-sans-latin-500-normal.woff2", "plex-sans-600": "ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2", "plex-mono-400": "ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2", "plex-mono-600": "ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff2" };
for (const [k, v] of Object.entries(F)) fs.copyFileSync(R("node_modules/@fontsource/" + v), R(`app/fonts/${k}.woff2`));
console.log("app/ gerado");
