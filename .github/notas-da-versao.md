## Como instalar

**Windows** — baixe `Instalar-Korum-Windows.exe`, dê dois cliques e siga o instalador.
Se aparecer o aviso azul "O Windows protegeu o computador", clique em **Mais informações → Executar assim mesmo**.

**Mac com chip Apple (M1 a M4)** — baixe `Korum-Mac-chip-Apple-M1-a-M4.zip`, abra o arquivo e arraste o **Korum** para a pasta **Aplicativos**.
Na primeira vez, o Mac avisa que não consegue verificar o Korum, porque ele não tem assinatura paga da Apple. Para liberar:
- **macOS 15 Sequoia ou mais novo:** tente abrir o Korum uma vez e feche o aviso. Depois vá em **Ajustes do Sistema → Privacidade e Segurança**, role até o fim e clique em **Abrir Mesmo Assim** ao lado do aviso do Korum.
- **macOS 14 Sonoma ou mais antigo:** clique no Korum com o botão direito → **Abrir** → **Abrir**.
- **Se nada disso aparecer** (ou o Mac disser que o app está danificado): abra o **Terminal** e rode `xattr -dr com.apple.quarantine /Applications/Korum.app`.

**Mac com processador Intel** — mesmo procedimento com `Korum-Mac-Intel.zip`.

## Novidades da versão 1.1.0
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
