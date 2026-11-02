# Korum

Laboratório virtual de robótica industrial para Windows e Mac. O aluno escreve um programa KRL de verdade, e um robô de 6 eixos em 3D executa cada comando: PTP, LIN, CIRC, subprogramas, laços, entradas e saídas, garra e peças.

Inclui programação por blocos, biblioteca de projetos com versões e backup, trilha de cursos em 5 níveis, exercícios com nota automática, editor de cenários, análise/engenharia reversa de programas importados e um Professor com IA.

> Simulação educacional. O modelo do robô usa dimensões didáticas aproximadas e não é reprodução de nenhum modelo comercial. O Korum não envia comandos a robôs reais, não valida segurança e não é afiliado a nenhum fabricante. KRL é a linguagem dos robôs KUKA.

## Estrutura
- `core.js`: cinemática (direta e inversa), parser e interpretador KRL, planejamento de trajetória e colisão. Sem dependências.
- `data.js`: cenários, exemplos, aulas dos cursos e exercícios (com os critérios de avaliação).
- `src/index.html` e `src/ui.js`: interface (Three.js para o 3D, JSZip para os backups).
- `scripts/build.js`: gera a pasta `app/` (o que o programa abre). Rode `npm run build` depois de editar.
- `main.js` e `preload.js`: o programa Electron (janela, gravação em disco, cópia diária, diálogos, chamada da IA).

## Onde ficam os dados
- Windows: `%APPDATA%\Korum\korum.json`
- Mac: `~/Library/Application Support/Korum/korum.json`

Cópias automáticas dos últimos 30 dias na subpasta `backups`. A chave da API do Professor fica gravada só nesse arquivo.

## Desenvolvimento
```
npm install
npm run build      # gera app/
npm start          # abre o programa
npm run dist:win   # instalador Windows (rodar no Windows)
npm run dist:mac   # app para Mac (rodar no Mac)
```

## Instaladores
A ação **Gerar instaladores** (aba Actions) roda quando a versão em `package.json` muda, ou manualmente. Ela publica na página **Releases**:
- `Instalar-Korum-Windows.exe`
- `Korum-Mac-chip-Apple-M1-a-M4.zip` e `Korum-Mac-Intel.zip`

Para lançar uma versão nova: altere `version` no `package.json`, descreva as novidades em `.github/notas-da-versao.md` e envie para a branch `main`.
