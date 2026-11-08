## Como instalar

**Windows** — baixe `Instalar-Korum-Windows.exe`, dê dois cliques e siga o instalador.
Se aparecer o aviso azul "O Windows protegeu o computador", clique em **Mais informações → Executar assim mesmo**.

**Mac com chip Apple (M1 a M4)** — baixe `Korum-Mac-chip-Apple-M1-a-M4.zip`, abra o arquivo e arraste o **Korum** para a pasta **Aplicativos**.
Na primeira vez, o Mac avisa que não consegue verificar o Korum, porque ele não tem assinatura paga da Apple. Para liberar:
- **macOS 15 Sequoia ou mais novo:** tente abrir o Korum uma vez e feche o aviso. Depois vá em **Ajustes do Sistema → Privacidade e Segurança**, role até o fim e clique em **Abrir Mesmo Assim** ao lado do aviso do Korum.
- **macOS 14 Sonoma ou mais antigo:** clique no Korum com o botão direito → **Abrir** → **Abrir**.
- **Se nada disso aparecer** (ou o Mac disser que o app está danificado): abra o **Terminal** e rode `xattr -dr com.apple.quarantine /Applications/Korum.app`.

**Mac com processador Intel** — mesmo procedimento com `Korum-Mac-Intel.zip`.

## Novidades da versão 1.8.1 — Garra: fechamento e força
- A garra agora **abre sempre totalmente (120 mm)**; o que se ajusta é o **fechamento** (0–120 mm, distância entre os dedos quando a garra fecha) e a **força** (5–200 N)
- Fechamento maior ou igual à largura da peça: os dedos não encostam e a peça não é presa (o console diz qual valor usar)
- Aumentar o fechamento com a peça presa solta a peça
- No programa: `$GARRA_FECHAMENTO = 40` e `$GARRA_FORCA = 50` (substitui `$GARRA_ABERTURA`)
- IHM do Modo Painel: fechamento ±10 mm e força ±10 N

## Versão 1.8.0 — Garra com abertura e força ajustáveis
- Novo bloco **Garra** no painel da direita: **Abertura** (20–120 mm) e **Força** (5–200 N) reguláveis à mão, botões **Abrir** e **Fechar** e informação da peça mais próxima (tamanho, peso e força necessária)
- A simulação respeita os ajustes:
  - peça mais larga que a abertura não é pega (os dedos batem na peça)
  - força abaixo da necessária para o peso: a peça escorrega (peça de 50 mm = 0,5 kg → 13 N; pacote = 1,2 kg → 30 N)
  - reduzir a força com a peça presa faz ela cair
  - acima de 120 N no pacote aparece aviso de que pode amassar
- No programa KRL: `$GARRA_ABERTURA = 80` e `$GARRA_FORCA = 50` (variáveis do Korum que simulam uma garra elétrica)
- IHM do Modo Painel (Ctrl+F12 → garra): força ±10 N e abertura ±10 mm
- Os dedos da garra abrem conforme a abertura ajustada e fecham na largura da peça

## Versão 1.7.0 — Posicionar pontos ficou mais fácil
- **O ponto segue o mouse sobre a superfície:** ao arrastar, ele vai exatamente para onde o cursor aponta na esteira, mesa, palete, peça ou chão (antes andava num plano invisível na altura do ponto). Segure Ctrl para o modo de precisão
- **Prévia antes de clicar:** no modo Marcar pontos, um alvo colorido segue o mouse e diz o que o clique vai fazer ("clique: soltar · X 300 Y −525"), com a peça-fantasma no lugar
- **Fantasma da peça:** cada ponto de soltar mostra uma caixa transparente exatamente onde a peça vai ficar (já girada); o ponto de pegar contorna em amarelo a peça que será pega
- **Ajuste fino por botões:** X+/X−, Y+/Y−, subir/descer e girar 90°, com passo de 1, 5, 10 ou 50 mm
- Rótulos mais claros: "pega aqui", "solta aqui", "passa aqui"; o painel avisa se o ponto de pegar não tem peça

## Versão 1.6.1 — Posicionar pontos com mais precisão
- **Corrigido:** a tela cheia (⛶) ficava vazia. Agora mostra o simulador; Esc ou ⛶ volta
- **Pegar o ponto ficou mais fácil:** o ponto é escolhido pela proximidade do cursor na tela e aparece sempre, mesmo atrás de peças e objetos (com um halo branco)
- **Precisão:** segure **Ctrl** ao arrastar para mover 5× mais devagar; **passo do arraste** (livre, 1, 5, 10, 25 ou 50 mm, padrão 5 mm)
- **Visão:** grade milimetrada (linhas a cada 50 mm) e guias X/Y no ponto selecionado; botões **Ver de cima**, **Ver de lado** e **Focar no ponto** (tecla F)
- Os números da lista acompanham o ponto durante o arraste

## Versão 1.6.0 — Arrastar pontos do Trajeto
- Os pontos do Trajeto agora podem ser **arrastados no 3D**: arrastar move a posição (X Y); **Shift + arrastar** (ou o botão "Altura (Z)") sobe e desce
- **Grudar na peça / superfície**: o ponto de pegar gruda no centro da peça mais próxima; o de soltar fica apoiado na superfície onde for solto
- Painel de leitura no canto do 3D: X, Y, Z, **altura acima da superfície**, **distância da base do robô** e se o ponto é alcançável
- Cada ponto tem uma **haste até a superfície** e uma marca no apoio, para enxergar altura e posição; ponto fora do alcance fica vermelho
- Ajuste fino pelo teclado: setas = 5 mm (Shift = 20 mm), PgUp/PgDn = altura

## Versão 1.5.0 — Trajeto por pontos
- Nova aba **Trajeto** (nos modos Iniciante e Profissional): ligue **Marcar pontos** e clique no simulador 3D
  - clique numa **peça** = pegar; clique na **esteira, mesa, palete ou chão** = soltar (ou passar por, se a garra estiver vazia)
  - o programa KRL é escrito sozinho: aproximação por cima (PTP), descida e subida em linha reta (LIN), garra abrindo e fechando
- Lista de pontos para **trocar a ação, ajustar X/Y/Z e giro, mudar a ordem e excluir**; cada ponto mostra se é alcançável ou se haveria colisão
- Trajeto desenhado no 3D (pontos numerados, linhas de aproximação e caminho)
- Opções: altura de aproximação, velocidade, repetir o ciclo e começar/terminar em HOME
- Botão **Reiniciar célula e executar**

## Versão 1.4.0 — Modo Iniciante e Profissional
- Ao abrir o Korum pela primeira vez, você escolhe **Iniciante** ou **Profissional**. Dá para trocar a qualquer momento no botão no topo da tela
- **Iniciante:** tela simplificada (sem Projetos, Cenário, Análise e Painel; jog só em X, Y e Z; "Velocidade" no lugar de "Override"), exemplos selecionados e **dicas em linguagem simples** no console quando dá erro
- Roteiro guiado **Primeiros passos** com 10 missões conferidas sozinhas: girar a vista, mover um eixo, HOME, abrir e executar um programa, mudar um ponto, ensinar um ponto, programar com blocos, pegar uma peça e fazer o primeiro exercício. A missão atual destaca na tela onde clicar
- **Profissional:** todas as ferramentas, como antes

## Versão 1.3.0 — Linha de pacotes
- Novo cenário **Linha de pacotes**: esteira de entrada motorizada (`$OUT[6]`) que traz pacotes de garrafas com filme, acumula no batente e liga o sensor `$IN[1]` sozinha, e um palete
- **T21 · Esteira com pacotes e palete de camadas cruzadas**: 3 camadas de 8 pacotes, camada do meio girada 90°
- **T22 · Esteira: contar pacotes com o sensor**
- Peças agora podem ter tamanhos diferentes e mantêm o giro ao serem soltas (empilhamento cruzado)
- IHM do painel: ligar e desligar a esteira de entrada

## Versão 1.2.0 — Modo Painel
Novo botão **Painel** na barra da esquerda: uma tela no estilo do painel de programação do controlador, ao lado do robô 3D.
- Menus Arquivo, Programa, Configurar, Monitor, Setup, Comandos, Tecnologia e Ajuda
- **Navegador** (pastas Programa e Exemplos) com Novo, Selecionar, Duplicar, Arquivar, Apagar e Abrir
- Programa selecionado com a **seta de execução** e IP na barra de status; edição no painel (grupo Expert)
- **Janela de mensagens** com hora, número, origem e confirmação (**Ackn.** / **Ackn. todos**); mensagens que exigem confirmação bloqueiam a partida
- Barra de status com **S I R**, programa, IP, modo, modo de execução, POV/HOV, robô, grupo de usuário e hora
- **Modos T1, T2, AUT e EXT**: em T1/T2 é preciso o botão de habilitação e **segurar Start** (soltou, parou); T1 limita a ferramenta a 250 mm/s; em EXT a partida vem do CLP ($IN[8])
- Modos de execução **GO, MSTEP e ISTEP**; mensagem de coincidência de bloco (BCO) no primeiro movimento
- **Jog contínuo** por eixos, base ou ferramenta; override em degraus (1, 3, 5, 10 … 100 %)
- **Grupos de usuário** Operador, Usuário e Expert (senha `korum`)
- **Ajuste dos eixos** (desajustar / ajustar EMT) e limites de software
- **Monitor** de entradas/saídas, de variável (inclusive pontos do .dat) e de posição atual
- **IHM da célula (Ctrl+F12)**: funções manuais em pares amarelo/ciano executadas pelas teclas − e +, linha de status Hxxx, formação da camada do palete e contadores

## Versão 1.1.1
- Corrigido: com "Pontos" desligado, os nomes dos pontos (S1, T_APROX…) voltavam a aparecer ao executar ou editar o programa
- Novo botão **Vista limpa** no simulador: esconde legendas, pontos, trajetória, eixos de referência e avisos, deixando só o robô, a célula e as peças (bom para vídeo e apresentação). Clique de novo para voltar

## Versão 1.1.0
- 20 programas de teste novos (T01 a T20) no menu Exemplos, agrupados por categoria: movimentação, velocidades, $BASE/$TOOL, hélice com SIN/COS, E/S e seleção de programa pelo CLP, REPEAT, INTERRUPT, vetores, soldagem, aplicação de cola, paletização em 2 camadas, despaletização, alimentação de máquina CNC, inspeção com câmera, montagem com encaixe lento, célula completa com handshake e dois de diagnóstico (singularidade e limites)
- 3 cenários novos: Soldagem, Despaletização e Inspeção com câmera
- Os mesmos programas como arquivos .src/.dat na pasta `exemplos` do repositório

## Versão 1.0.0
- Simulador 3D de robô industrial de 6 eixos com cinemática direta e inversa, limites de eixo, singularidades e detecção de colisão
- Editor KRL (.src e .dat) com destaque de sintaxe e interpretador real: PTP, LIN, CIRC, LIN_REL, subprogramas, IF/FOR/WHILE/LOOP/SWITCH, WAIT, E/S, $BASE e $TOOL, INTERRUPT
- Execução contínua, passo a passo, pausa e override; linha atual destacada
- Programação por blocos que gera KRL (e lê KRL de volta)
- Biblioteca de projetos por categoria, salvamento automático, histórico de versões, comparação e restauração
- Backup completo ou por projeto em .zip com verificação de integridade; cópia automática diária
- Trilha de cursos em 5 níveis e 7 exercícios com avaliação automática
- Editor de cenário: mesas, esteiras, paletes, máquinas e peças
- Análise e engenharia reversa: importa programas com FOLDs, verifica pontos, simula sem animação e compara com o original
- Professor de robótica com IA (usa a sua chave da API da Anthropic) e glossário offline
- Temas Escuro e Claro
