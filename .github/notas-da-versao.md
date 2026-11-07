## Como instalar

**Windows** — baixe `Instalar-Korum-Windows.exe`, dê dois cliques e siga o instalador.
Se aparecer o aviso azul "O Windows protegeu o computador", clique em **Mais informações → Executar assim mesmo**.

**Mac com chip Apple (M1 a M4)** — baixe `Korum-Mac-chip-Apple-M1-a-M4.zip`, abra o arquivo e arraste o **Korum** para a pasta **Aplicativos**.
Na primeira vez, o Mac avisa que não consegue verificar o Korum, porque ele não tem assinatura paga da Apple. Para liberar:
- **macOS 15 Sequoia ou mais novo:** tente abrir o Korum uma vez e feche o aviso. Depois vá em **Ajustes do Sistema → Privacidade e Segurança**, role até o fim e clique em **Abrir Mesmo Assim** ao lado do aviso do Korum.
- **macOS 14 Sonoma ou mais antigo:** clique no Korum com o botão direito → **Abrir** → **Abrir**.
- **Se nada disso aparecer** (ou o Mac disser que o app está danificado): abra o **Terminal** e rode `xattr -dr com.apple.quarantine /Applications/Korum.app`.

**Mac com processador Intel** — mesmo procedimento com `Korum-Mac-Intel.zip`.

## Novidades da versão 1.3.0 — Linha de pacotes
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
