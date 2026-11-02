// ================== DADOS: cenários, exemplos, cursos e exercícios ==================
const SCENES = {
  pick: { nome: "Pick and place (mesa + esteira)", objetos: [
    { tipo: "mesa", nome: "Mesa A", x: 575, y: 0, w: 350, d: 500, h: 150 },
    { tipo: "esteira", nome: "Esteira B", x: 300, y: -525, w: 440, d: 310, h: 150 }],
    pecas: [[575, 0]] },
  palete: { nome: "Paletização (mesa + palete)", objetos: [
    { tipo: "mesa", nome: "Mesa A", x: 525, y: 0, w: 250, d: 500, h: 150 },
    { tipo: "palete", nome: "Palete", x: 250, y: -500, w: 320, d: 320, h: 120 }],
    pecas: [[500, -150], [500, -50], [500, 50], [500, 150]] },
  maquina: { nome: "Alimentação de máquina", objetos: [
    { tipo: "mesa", nome: "Mesa A", x: 575, y: 0, w: 350, d: 500, h: 150 },
    { tipo: "maquina", nome: "Máquina CNC", x: 0, y: 600, w: 420, d: 300, h: 420 },
    { tipo: "bloco", nome: "Dispositivo", x: 0, y: 420, w: 160, d: 60, h: 160 }],
    pecas: [[575, 0], [575, 120]] },
  vazia: { nome: "Célula vazia", objetos: [], pecas: [] },
};

const EXAMPLES = [
{ id: "pick", cat: "Pick and Place", scene: "pick", title: "Pick and place (mesa → esteira)", src:
`DEF pick_place()
  ; Retira a peça da Mesa A e deposita na Esteira B
  ; A garra é comandada por $OUT[1]: TRUE fecha, FALSE abre
  INI
  $VEL.CP = 0.3              ; velocidade linear (m/s)
  PTP HOME
  $OUT[1] = FALSE            ; abre a garra

  PTP P_APROX_A              ; aproximação acima da peça
  LIN P_PEGA_A               ; desce em linha reta
  $OUT[1] = TRUE             ; fecha a garra
  WAIT SEC 0.4
  LIN P_APROX_A              ; sobe com a peça

  PTP P_APROX_B              ; vai até a esteira
  LIN P_SOLTA_B
  $OUT[1] = FALSE            ; solta a peça
  WAIT SEC 0.3
  LIN_REL {Z 140}            ; afasta 140 mm para cima

  PTP HOME
END`, dat:
`DEFDAT pick_place
  DECL E6POS P_APROX_A = {X 575, Y 0, Z 320, A 0, B 90, C 0}
  DECL E6POS P_PEGA_A = {X 575, Y 0, Z 175, A 0, B 90, C 0}
  DECL E6POS P_APROX_B = {X 300, Y -525, Z 320, A 0, B 90, C 0}
  DECL E6POS P_SOLTA_B = {X 300, Y -525, Z 180, A 0, B 90, C 0}
ENDDAT` },

{ id: "basico", cat: "Movimentação básica", scene: "pick", title: "Movimentos básicos: PTP e LIN", src:
`DEF basico()
  ; PTP: cada eixo vai pelo caminho mais rápido (trajetória curva)
  ; LIN: a ferramenta segue uma linha reta no espaço
  ; Ative "Trajetória" no visualizador para comparar.
  INI
  PTP HOME
  PTP P1
  LIN P2
  PTP P1                     ; mesma distância, caminho diferente
  PTP HOME
END`, dat:
`DEFDAT basico
  DECL E6POS P1 = {X 450, Y 300, Z 450, A 0, B 90, C 0}
  DECL E6POS P2 = {X 450, Y -300, Z 450, A 0, B 90, C 0}
ENDDAT` },

{ id: "quadrado", cat: "Movimentação básica", scene: "pick", title: "Quadrado com FOR e LIN_REL", src:
`DEF quadrado()
  DECL INT i
  DECL REAL lado
  INI
  lado = 200
  $VEL.CP = 0.2
  PTP HOME
  PTP CANTO
  FOR i = 1 TO 2
    LIN_REL {X lado}
    LIN_REL {Y lado}
    LIN_REL {X -lado}
    LIN_REL {Y -lado}
    lado = lado / 2          ; segunda volta com metade do lado
  ENDFOR
  PTP HOME
END`, dat:
`DEFDAT quadrado
  DECL E6POS CANTO = {X 380, Y -100, Z 400, A 0, B 90, C 0}
ENDDAT` },

{ id: "circ", cat: "Movimentação básica", scene: "pick", title: "Círculo com CIRC", src:
`DEF circulo()
  ; CIRC ponto_auxiliar, ponto_final
  ; Dois CIRC de 180° formam um círculo completo
  INI
  $VEL.CP = 0.25
  PTP HOME
  PTP C_INICIO
  CIRC C_AUX1, C_MEIO
  CIRC C_AUX2, C_INICIO
  PTP HOME
END`, dat:
`DEFDAT circulo
  DECL E6POS C_INICIO = {X 450, Y 0, Z 450, A 0, B 90, C 0}
  DECL E6POS C_AUX1 = {X 600, Y 150, Z 450, A 0, B 90, C 0}
  DECL E6POS C_MEIO = {X 750, Y 0, Z 450, A 0, B 90, C 0}
  DECL E6POS C_AUX2 = {X 600, Y -150, Z 450, A 0, B 90, C 0}
ENDDAT` },

{ id: "ciclo", cat: "Integração com sensores", scene: "pick", title: "Ciclo com E/S: LOOP, WAIT FOR, subprogramas", src:
`DEF ciclo()
  ; Clique em IN 1 (painel E/S) para liberar cada ciclo.
  ; Ative IN 2 para encerrar após o ciclo atual.
  DECL INT ciclos
  INI
  ciclos = 0
  PTP HOME
  $OUT[1] = FALSE
  LOOP
    WAIT FOR $IN[1]
    pegar(P_A)
    soltar(P_B)
    pegar(P_B)
    soltar(P_A)
    ciclos = ciclos + 1
    $OUT[2] = TRUE           ; sinaliza ciclo concluído
    WAIT SEC 0.2
    $OUT[2] = FALSE
    IF $IN[2] THEN
      EXIT
    ENDIF
  ENDLOOP
  PTP HOME
END

DEF pegar(alvo)
  PTP alvo
  LIN_REL {Z -145}
  $OUT[1] = TRUE
  WAIT SEC 0.3
  LIN_REL {Z 145}
END

DEF soltar(alvo)
  PTP alvo
  LIN_REL {Z -140}
  $OUT[1] = FALSE
  WAIT SEC 0.3
  LIN_REL {Z 140}
END`, dat:
`DEFDAT ciclo
  ; pontos 145 mm acima das posições de pega/depósito
  DECL E6POS P_A = {X 575, Y 0, Z 320, A 0, B 90, C 0}
  DECL E6POS P_B = {X 300, Y -525, Z 320, A 0, B 90, C 0}
ENDDAT` },

{ id: "palete", cat: "Paletização", scene: "palete", title: "Paletização 2×2 com FOR", src:
`DEF paletizar()
  ; Pega 4 peças em fila na mesa e monta uma camada 2x2 no palete
  DECL INT i
  DECL E6POS PEGA, SOLTA
  INI
  $VEL.CP = 0.4
  PTP HOME
  $OUT[1] = FALSE
  FOR i = 1 TO 4
    ; posição da peça i na mesa (passo de 100 mm em Y)
    PEGA = MESA_1
    PEGA.Y = MESA_1.Y + (i - 1) * 100
    ; posição i no palete: colunas em X, linhas em Y
    SOLTA = PALETE_1
    IF (i == 2) OR (i == 4) THEN
      SOLTA.X = PALETE_1.X + 100
    ENDIF
    IF i > 2 THEN
      SOLTA.Y = PALETE_1.Y + 100
    ENDIF
    PTP PEGA
    LIN_REL {Z -145}
    $OUT[1] = TRUE
    WAIT SEC 0.3
    LIN_REL {Z 145}
    PTP SOLTA
    LIN_REL {Z -170}
    $OUT[1] = FALSE
    WAIT SEC 0.2
    LIN_REL {Z 170}
  ENDFOR
  PTP HOME
END`, dat:
`DEFDAT paletizar
  ; pontos de aproximação (Z 320) da 1a peça e da 1a posição do palete
  DECL E6POS MESA_1 = {X 500, Y -150, Z 320, A 0, B 90, C 0}
  DECL E6POS PALETE_1 = {X 200, Y -550, Z 320, A 0, B 90, C 0}
ENDDAT` },

{ id: "diag", cat: "Aplicações avançadas", scene: "pick", title: "Diagnóstico: encontre os erros", src:
`DEF diagnostico()
  ; Este programa tem problemas de propósito.
  ; Execute, leia o console e corrija um de cada vez.
  INI
  PTP HOME
  PTP P_LONGE                ; erro 1: ponto fora do alcance
  LIN P_MESA                 ; erro 2: a ferramenta colide com a mesa
  PTP HOME
END`, dat:
`DEFDAT diagnostico
  DECL E6POS P_LONGE = {X 1200, Y 0, Z 500, A 0, B 90, C 0}
  DECL E6POS P_MESA = {X 575, Y 120, Z 120, A 0, B 90, C 0}
ENDDAT` },

{ id: "kuka", cat: "Aplicações avançadas", scene: "pick", title: "Programa importado (formato com FOLDs)", src:
`&ACCESS RVP
&REL 3
DEF prog_importado( )
;FOLD INI;%{PE}
  ;FOLD BASISTECH INI
    GLOBAL INTERRUPT DECL 3 WHEN $STOPMESS==TRUE DO IR_STOPM ( )
    INTERRUPT ON 3
    BAS (#INITMOV,0 )
  ;ENDFOLD (BASISTECH INI)
;ENDFOLD (INI)

;FOLD PTP HOME  Vel= 100 % DEFAULT;%{PE}
$BWDSTART = FALSE
PDAT_ACT=PDEFAULT
FDAT_ACT=FHOME
BAS (#PTP_PARAMS,100 )
$H_POS=XHOME
PTP  XHOME
;ENDFOLD

;FOLD PTP P1 Vel=60 % PDAT1 Tool[1] Base[0];%{PE}
$BWDSTART=FALSE
PDAT_ACT=PPDAT1
FDAT_ACT=FP1
BAS(#PTP_PARAMS,60)
PTP XP1
;ENDFOLD

;FOLD LIN P2 Vel=0.2 m/s CPDAT1 Tool[1] Base[0];%{PE}
$BWDSTART=FALSE
LDAT_ACT=LCPDAT1
FDAT_ACT=FP2
BAS(#CP_PARAMS,0.2)
LIN XP2
;ENDFOLD

;FOLD PTP HOME  Vel= 100 % DEFAULT;%{PE}
BAS (#PTP_PARAMS,100 )
PTP  XHOME
;ENDFOLD
END`, dat:
`&ACCESS RVP
&REL 3
DEFDAT  prog_importado
;FOLD EXTERNAL DECLARATIONS;%{PE}
EXT  BAS (BAS_COMMAND  :IN,REAL  :IN )
;ENDFOLD (EXTERNAL DECLARATIONS)
DECL E6POS XP1={X 520.0,Y 220.0,Z 420.0,A 0.0,B 90.0,C 0.0,S 2,T 35,E1 0.0,E2 0.0,E3 0.0,E4 0.0,E5 0.0,E6 0.0}
DECL FDAT FP1={TOOL_NO 1,BASE_NO 0,IPO_FRAME #BASE,POINT2[] " "}
DECL PDAT PPDAT1={VEL 60.0,ACC 100.0,APO_DIST 100.0}
DECL E6POS XP2={X 520.0,Y -220.0,Z 420.0,A 0.0,B 90.0,C 0.0,S 2,T 35,E1 0.0,E2 0.0,E3 0.0,E4 0.0,E5 0.0,E6 0.0}
DECL FDAT FP2={TOOL_NO 1,BASE_NO 0,IPO_FRAME #BASE,POINT2[] " "}
DECL LDAT LCPDAT1={VEL 0.2,ACC 100.0,APO_DIST 100.0}
DECL PDAT PDEFAULT={VEL 100.0,ACC 100.0,APO_DIST 100.0}
DECL FDAT FHOME={TOOL_NO 0,BASE_NO 0,IPO_FRAME #BASE,POINT2[] " "}
ENDDAT` },
];

// ---------------- Trilha de cursos ----------------
const ex = id => EXAMPLES.find(e => e.id === id);
const COURSES = [
{ nivel: 1, titulo: "Fundamentos", aulas: [
  { id: "f1", titulo: "Conhecendo o robô industrial", html: `
<p>Um robô industrial de seis eixos é um braço articulado em série: cada eixo é um motor com redutor que gira uma parte do braço em relação à anterior. Juntos, os seis eixos permitem posicionar a ferramenta em qualquer ponto do espaço de trabalho, com qualquer orientação (dentro dos limites).</p>
<p>O conjunto completo tem três partes: o <b>manipulador</b> (o braço), o <b>controlador</b> (armário com o computador, os acionamentos e a segurança) e o <b>teach pendant</b> (painel portátil do operador). O Korum simula o manipulador e o interpretador de programas do controlador.</p>
<p><b>Experimente:</b> no painel da direita, mova cada eixo pelos controles deslizantes e observe qual parte do braço se movimenta.</p>` },
  { id: "f2", titulo: "Estrutura mecânica e os seis eixos", html: `
<table><tr><td>A1</td><td>Rotação da base (gira o robô inteiro em torno do eixo vertical)</td></tr>
<tr><td>A2</td><td>Braço (levanta e abaixa o braço principal)</td></tr>
<tr><td>A3</td><td>Antebraço (dobra o cotovelo)</td></tr>
<tr><td>A4</td><td>Rotação do punho (gira o antebraço em torno do próprio eixo)</td></tr>
<tr><td>A5</td><td>Articulação do punho (dobra o punho)</td></tr>
<tr><td>A6</td><td>Rotação do flange (gira a ferramenta)</td></tr></table>
<p>Os eixos A1, A2 e A3 definem <b>onde</b> o punho está. Os eixos A4, A5 e A6 definem <b>como</b> a ferramenta está orientada. Como os três eixos do punho se cruzam num ponto (punho esférico), o cálculo da posição pode ser separado do cálculo da orientação.</p>
<p>A posição <b>HOME</b> do simulador é {A1 0, A2 -90, A3 90, A4 0, A5 0, A6 0}: braço na vertical e antebraço na horizontal.</p>` },
  { id: "f3", titulo: "Sistemas de coordenadas", html: `
<p>O robô trabalha com vários sistemas de coordenadas:</p>
<ul><li><b>Eixos (articular)</b>: os seis ângulos A1 a A6, em graus.</li>
<li><b>WORLD / ROBROOT</b>: origem na base do robô. No Korum, X aponta para a frente, Y para a esquerda e Z para cima.</li>
<li><b>BASE</b> (<code>$BASE</code>): sistema da peça ou da mesa de trabalho. Mudar a BASE desloca todos os pontos programados juntos.</li>
<li><b>TOOL</b> (<code>$TOOL</code>): sistema da ferramenta, com origem no TCP.</li></ul>
<p>Uma posição cartesiana tem 6 valores: X, Y, Z (mm) e A, B, C (graus). A, B e C são rotações em torno de Z, Y e X, nessa ordem. Com a ferramenta apontando para baixo, use <code>B 90</code>.</p>` },
  { id: "f4", titulo: "Movimentação manual (jog)", html: `
<p>Antes de programar, o técnico movimenta o robô manualmente para conhecer o espaço de trabalho e ensinar pontos.</p>
<ul><li><b>Jog por eixos</b>: um eixo de cada vez. É o modo mais seguro para sair de posições difíceis.</li>
<li><b>Jog cartesiano na BASE</b>: o TCP anda em X, Y ou Z do sistema da base.</li>
<li><b>Jog na FERRAMENTA</b>: o TCP anda na direção da própria ferramenta. Útil para aproximar e afastar de uma peça.</li></ul>
<p><b>Experimente:</b> escolha "FERRAMENTA" no painel e use X+ e X-: a garra avança e recua na direção em que aponta. Depois use <b>Gravar ponto</b> para salvar a pose no programa.</p>` },
  { id: "f5", titulo: "Segurança básica", html: `
<p>Num robô real, a segurança vem antes de qualquer programa:</p>
<ul><li>Teste programas novos em modo manual de velocidade reduzida (T1), com o botão de habilitação (enabling) e a parada de emergência ao alcance.</li>
<li>Nunca entre na célula com o robô em modo automático. As proteções (cercas, cortinas de luz, scanners) existem para isso.</li>
<li>Verifique cada ponto novo com override baixo e passo a passo.</li>
<li>Conheça os limites de software dos eixos e as zonas de trabalho configuradas.</li></ul>
<p>No Korum você pode simular esse hábito: reduza o <b>Override</b> e use o botão <b>Passo</b>. Lembre-se de que a simulação não substitui o procedimento de segurança da sua empresa nem a documentação do fabricante.</p>` },
]},
{ nivel: 2, titulo: "Programação", aulas: [
  { id: "p1", titulo: "Introdução ao KRL: arquivos SRC e DAT", html: `
<p>Um programa KRL tem dois arquivos com o mesmo nome:</p>
<ul><li><code>.src</code>: as instruções, dentro de <code>DEF nome() ... END</code>.</li>
<li><code>.dat</code>: os dados (pontos, variáveis), dentro de <code>DEFDAT nome ... ENDDAT</code>.</li></ul>
<pre>DEF meu_programa()
  INI
  PTP HOME
  PTP P1
END</pre>
<p>Comentários começam com <code>;</code>. Maiúsculas e minúsculas são equivalentes. <code>INI</code> carrega velocidades e acelerações padrão.</p>`, exemplo: "basico" },
  { id: "p2", titulo: "Comandos PTP e LIN", html: `
<p><b>PTP</b> (ponto a ponto): todos os eixos partem e chegam juntos. É o movimento mais rápido, mas a ferramenta faz uma curva no espaço. Use para deslocamentos livres.</p>
<p><b>LIN</b> (linear): o TCP segue uma reta. Use para aproximar e afastar de peças, para soldar, aplicar cola e em qualquer caso em que o caminho importa.</p>
<p><b>CIRC</b> faz um arco que passa por um ponto auxiliar: <code>CIRC AUX, FIM</code>.</p>
<p>Abra o exemplo, ative <b>Trajetória</b> e compare o caminho do PTP com o do LIN entre os mesmos pontos.</p>`, exemplo: "basico" },
  { id: "p3", titulo: "Velocidade e aproximação", html: `
<ul><li><code>$VEL_AXIS[1..6]</code>: velocidade dos eixos em % para PTP.</li>
<li><code>$VEL.CP</code>: velocidade linear do TCP em m/s para LIN e CIRC.</li>
<li><b>Override</b> (<code>$OV_PRO</code>): percentual aplicado a tudo pelo operador.</li></ul>
<p><b>Aproximação</b> (<code>C_PTP</code>, <code>C_DIS</code>): o robô começa o próximo movimento antes de chegar exatamente ao ponto, arredondando o canto e ganhando tempo de ciclo. O Korum aceita essas palavras, mas nesta versão o robô ainda para exatamente em cada ponto (o console avisa).</p>` },
  { id: "p4", titulo: "Programas e subprogramas", html: `
<p>Divida o trabalho em subprogramas com parâmetros:</p>
<pre>DEF ciclo()
  pegar(P_A)
END

DEF pegar(alvo)
  PTP alvo
  LIN_REL {Z -145}
END</pre>
<p>Subprogramas evitam repetição e deixam o programa legível. No Korum, vários <code>DEF</code> podem ficar no mesmo arquivo <code>.src</code>. O primeiro é o programa principal.</p>`, exemplo: "ciclo" },
  { id: "p5", titulo: "Variáveis e estruturas condicionais", html: `
<p>Declare antes de usar: <code>DECL INT contador</code>, <code>DECL REAL lado</code>, <code>DECL BOOL ok</code>, <code>DECL E6POS P</code>.</p>
<p>Componentes de pontos podem ser alterados: <code>P.Z = P.Z + 50</code>.</p>
<pre>IF $IN[1] THEN
  PTP P1
ELSE
  PTP P2
ENDIF
FOR i = 1 TO 4
  ...
ENDFOR</pre>
<p><b>Atenção:</b> em KRL, <code>AND</code> e <code>OR</code> têm prioridade maior que as comparações. Escreva <code>IF (i &gt; 2) AND (j &lt; 5) THEN</code>, com parênteses.</p>`, exemplo: "quadrado" },
]},
{ nivel: 3, titulo: "Aplicações industriais", aulas: [
  { id: "a1", titulo: "Pick and place", html: `
<p>O ciclo clássico de manipulação:</p>
<ol><li>PTP até um ponto de <b>aproximação</b> acima da peça.</li>
<li>LIN para descer até a posição de pega.</li>
<li>Fechar a garra e aguardar o tempo de fechamento.</li>
<li>LIN para subir, PTP até o destino, LIN para descer, abrir a garra, LIN para subir.</li></ol>
<p>Os movimentos perto da peça são sempre LIN e lentos. Os deslocamentos longe dela podem ser PTP e rápidos.</p>`, exemplo: "pick" },
  { id: "a2", titulo: "Garras e entradas/saídas digitais", html: `
<p>O robô conversa com o mundo por sinais digitais:</p>
<ul><li><code>$OUT[n] = TRUE</code> liga uma saída (válvula da garra, lâmpada, sinal para o CLP).</li>
<li><code>$IN[n]</code> lê uma entrada (sensor de peça, botão, sinal do CLP).</li>
<li><code>WAIT FOR $IN[1]</code> espera a entrada ficar verdadeira.</li></ul>
<p>No Korum, <code>$OUT[1]</code> comanda a garra e as entradas IN 1 a IN 8 são acionadas por você no painel de E/S. Em uma célula real, sempre confirme com um sensor que a garra fechou antes de mover a peça.</p>`, exemplo: "ciclo" },
  { id: "a3", titulo: "Paletização", html: `
<p>Paletizar é repetir o mesmo movimento com um deslocamento calculado para cada posição. Em vez de ensinar um ponto para cada caixa, ensine o primeiro e calcule os outros:</p>
<pre>SOLTA = PALETE_1
SOLTA.X = PALETE_1.X + coluna * passo_x
SOLTA.Y = PALETE_1.Y + linha * passo_y
SOLTA.Z = PALETE_1.Z + camada * altura</pre>
<p>O exemplo monta uma camada 2×2 usando <code>FOR</code> e <code>IF</code>.</p>`, exemplo: "palete" },
  { id: "a4", titulo: "Sensores e sincronismo com a célula", html: `
<p>Um robô quase nunca trabalha sozinho. Ele precisa esperar a peça chegar, a máquina abrir a porta, o operador liberar o ciclo. Para isso o programa usa <code>WAIT FOR</code> (bloqueia até a condição) ou <code>IF</code> (decide sem bloquear).</p>
<p>Para reagir a um evento a qualquer momento, use interrupções: <code>INTERRUPT DECL 1 WHEN $IN[5] DO parada()</code> seguido de <code>INTERRUPT ON 1</code>.</p>` },
]},
{ nivel: 4, titulo: "Engenharia avançada", aulas: [
  { id: "e1", titulo: "Cinemática direta e inversa", html: `
<p><b>Cinemática direta</b>: dados os seis ângulos, onde está a ferramenta? Há sempre uma única resposta, calculada multiplicando as transformações de cada elo.</p>
<p><b>Cinemática inversa</b>: dada a posição desejada da ferramenta, quais ângulos levam até ela? Pode haver <b>várias soluções</b> (cotovelo para cima ou para baixo, punho invertido, base girada 180°) ou <b>nenhuma</b> (fora do alcance ou além do limite de um eixo).</p>
<p>No controlador real, os valores <b>S</b> (Status) e <b>T</b> (Turn) de um ponto escolhem qual solução usar. O Korum escolhe a solução mais próxima da posição atual e avisa quando o ponto é impossível.</p>
<p><b>Experimente:</b> no painel "Mover TCP para", digite X 1200 e veja a mensagem.</p>` },
  { id: "e2", titulo: "Singularidades", html: `
<p>Singularidade é uma posição em que dois eixos ficam alinhados e o robô perde um grau de liberdade. A mais comum é a <b>singularidade de punho</b>: com A5 = 0°, os eixos A4 e A6 giram em torno da mesma linha, e infinitas combinações dão a mesma orientação.</p>
<p>Perto dela, um movimento LIN pequeno pode exigir giros enormes de A4 e A6. O controlador para com erro, e o Korum também avisa ("passagem por singularidade").</p>
<p><b>Como evitar:</b> incline levemente a ferramenta (por exemplo, B 85 em vez de B 90), use PTP para passar pela região ou reposicione a peça.</p>` },
  { id: "e3", titulo: "Otimização de trajetórias e tempo de ciclo", html: `
<ul><li>Use PTP longe das peças e LIN só onde o caminho importa.</li>
<li>Reduza deslocamentos verticais desnecessários: aproximação de 50 a 150 mm costuma bastar.</li>
<li>Use aproximação (<code>C_PTP</code>, <code>C_DIS</code>) em pontos de passagem.</li>
<li>Evite posições próximas de limites de eixos e de singularidades, que obrigam a reduzir velocidade.</li></ul>
<p>A <b>Análise</b> do Korum estima o tempo de ciclo e a quantidade de movimentos do programa.</p>` },
  { id: "e4", titulo: "Comunicação industrial e integração com CLPs", html: `
<p>Na célula, o CLP costuma ser o mestre. Ele escolhe o programa, dá a partida e recebe os sinais de estado do robô. A troca é feita por redes industriais (Profinet, EtherNet/IP, EtherCAT, Profibus em instalações mais antigas) mapeadas como entradas e saídas no controlador.</p>
<p>Um padrão comum de troca é: o CLP envia o número do programa e um pulso de partida; o robô responde "em execução", "ciclo concluído" e "em falha". Pratique esse padrão com <code>SWITCH</code> lendo as entradas.</p>` },
  { id: "e5", titulo: "Diagnóstico e manutenção", html: `
<p>Roteiro para diagnosticar um robô que não chega onde deveria:</p>
<ol><li>Leia a mensagem completa: qual linha, qual ponto, qual eixo.</li>
<li>Verifique se a ferramenta (<code>$TOOL</code>) e a base (<code>$BASE</code>) ativas são as que o ponto espera.</li>
<li>Confira se o ponto foi ensinado com outra ferramenta ou base.</li>
<li>Execute passo a passo com override baixo até a linha do problema.</li>
<li>Compare com a última versão que funcionava.</li></ol>
<p>O modo <b>Análise</b> do Korum faz parte disso automaticamente: verifica todos os pontos e executa o programa sem animação para encontrar erros.</p>`, exemplo: "diag" },
]},
{ nivel: 5, titulo: "Tecnologias modernas", aulas: [
  { id: "m1", titulo: "Novas gerações de sistemas de controle", html: `
<p>Os fabricantes estão migrando de sistemas de controle tradicionais, programados quase só em linguagem textual no teach pendant, para plataformas com sistema operacional moderno, controlador virtual, programação por instruções guiadas e integração nativa com software externo.</p>
<p>O que muda para o técnico: os conceitos (eixos, coordenadas, PTP/LIN, E/S, segurança) continuam os mesmos. Mudam as ferramentas e a forma de editar. Sempre confira na documentação oficial do fabricante quais comandos e versões o seu controlador suporta.</p>` },
  { id: "m2", titulo: "Simulação e programação offline", html: `
<p>Programação offline é criar e testar o programa no computador, com o modelo da célula, sem parar a produção. Depois o programa é transferido ao robô e os pontos são ajustados no local (calibração).</p>
<p>Vantagens: menos tempo de máquina parada, teste de alcance e colisões antes da instalação e estimativa de tempo de ciclo. Limitação: o mundo real tem tolerâncias, então os pontos críticos sempre precisam de ajuste fino.</p>
<p>O Korum é um laboratório didático desse conceito. Ferramentas profissionais usam modelos dimensionais oficiais e o controlador virtual do fabricante.</p>` },
  { id: "m3", titulo: "ROS 2 e integração com sistemas externos", html: `
<p>O ROS 2 (Robot Operating System) é um conjunto de bibliotecas e ferramentas de código aberto para robótica: comunicação entre processos, planejamento de movimento, visão e simulação. Vários fabricantes publicam drivers que permitem comandar seus robôs a partir do ROS 2.</p>
<p>Ele é usado quando a aplicação exige decisões em tempo real a partir de sensores: pegar objetos em posições aleatórias, desviar de obstáculos e coordenar vários robôs.</p>` },
  { id: "m4", titulo: "Visão computacional, IA e robótica colaborativa", html: `
<ul><li><b>Visão</b>: uma câmera localiza a peça e envia a correção de posição ao robô. No programa, isso equivale a alterar um FRAME ou a <code>$BASE</code> antes de pegar.</li>
<li><b>IA</b>: classificação de peças, inspeção de defeitos e geração assistida de programas. O Professor IA do Korum é um exemplo de apoio ao programador.</li>
<li><b>Robôs colaborativos</b>: trabalham perto de pessoas com limitação de força e velocidade. Exigem análise de risco da aplicação inteira, não só do robô.</li></ul>` },
]},
];

// ---------------- Exercícios com avaliação automática ----------------
const near = (p, t, tol = 3) => p && Math.hypot(p.X - t.X, p.Y - t.Y, p.Z - t.Z) <= tol;
const atHome = j => j.every((v, i) => Math.abs(v - [0, -90, 90, 0, 0, 0][i]) < 0.6);
const onObj = (pc, o) => pc && Math.abs(pc.x - o.x) < o.w / 2 && Math.abs(pc.y - o.y) < o.d / 2 && Math.abs(pc.z - (o.h + 25)) < 6;
const moves = ctx => ctx.events.filter(e => e.t === "move");
const EXERCISES = [
{ id: "x1", titulo: "Primeiro movimento", nivel: "Fundamentos", scene: "vazia",
  alvos: [{ nome: "ALVO", X: 500, Y: 300, Z: 500 }],
  enunciado: "Leve o TCP até o ALVO (X 500, Y 300, Z 500, ferramenta para baixo: B 90) e volte para HOME.",
  src: "DEF exercicio1()\n  INI\n  PTP HOME\n  ; declare o ponto no .dat e mova até ele aqui\n\n  PTP HOME\nEND",
  dat: "DEFDAT exercicio1\n  ; exemplo: DECL E6POS ALVO = {X ..., Y ..., Z ..., A 0, B 90, C 0}\nENDDAT",
  criterios: [
    { txt: "O TCP chegou ao ALVO (±3 mm)", dica: "Declare DECL E6POS ALVO = {X 500, Y 300, Z 500, A 0, B 90, C 0} no .dat e use PTP ALVO.", f: c => moves(c).some(m => near(m.pos, { X: 500, Y: 300, Z: 500 })) },
    { txt: "O programa termina em HOME", dica: "Termine com PTP HOME.", f: c => atHome(c.joints) },
    { txt: "Execução sem erros", dica: "Leia a mensagem de erro no console.", f: c => c.result === "done" }] },
{ id: "x2", titulo: "Linha reta", nivel: "Programação", scene: "vazia",
  alvos: [{ nome: "A", X: 450, Y: -250, Z: 400 }, { nome: "B", X: 450, Y: 250, Z: 400 }],
  enunciado: "Vá até o ponto A com PTP e depois até o ponto B em linha reta (LIN). Pontos: A {X 450, Y -250, Z 400, B 90} e B {X 450, Y 250, Z 400, B 90}. Termine em HOME.",
  src: "DEF exercicio2()\n  INI\n  PTP HOME\n\n  PTP HOME\nEND", dat: "DEFDAT exercicio2\nENDDAT",
  criterios: [
    { txt: "Chegou ao ponto A", dica: "Declare o ponto A no .dat.", f: c => moves(c).some(m => near(m.pos, { X: 450, Y: -250, Z: 400 })) },
    { txt: "Movimento de A até B feito com LIN", dica: "Depois de chegar em A, use LIN B (não PTP).", f: c => { const m = moves(c); return m.some((x, i) => i > 0 && /^\s*LIN/i.test(x.label) && near(x.pos, { X: 450, Y: 250, Z: 400 }) && near(m[i - 1].pos, { X: 450, Y: -250, Z: 400 })); } },
    { txt: "Termina em HOME", dica: "Use PTP HOME no final.", f: c => atHome(c.joints) },
    { txt: "Execução sem erros", dica: "Veja o console.", f: c => c.result === "done" }] },
{ id: "x3", titulo: "Quadrado de 200 mm", nivel: "Programação", scene: "vazia",
  alvos: [{ nome: "Q1", X: 500, Y: -100, Z: 300 }, { nome: "Q2", X: 700, Y: -100, Z: 300 }, { nome: "Q3", X: 700, Y: 100, Z: 300 }, { nome: "Q4", X: 500, Y: 100, Z: 300 }],
  enunciado: "Desenhe um quadrado de 200 mm com movimentos LIN passando pelos quatro cantos Q1 a Q4 (Z 300, ferramenta para baixo) e volte ao canto inicial. Dica: LIN_REL.",
  src: "DEF exercicio3()\n  INI\n  PTP HOME\n\n  PTP HOME\nEND", dat: "DEFDAT exercicio3\nENDDAT",
  criterios: [
    ...[[500, -100], [700, -100], [700, 100], [500, 100]].map(([x, y], k) => ({ txt: `Passou pelo canto Q${k + 1} (${x}, ${y}) com LIN`, dica: "Comece em Q1 com PTP e use LIN ou LIN_REL entre os cantos.", f: c => moves(c).some(m => /^\s*LIN/i.test(m.label) && near(m.pos, { X: x, Y: y, Z: 300 })) })),
    { txt: "Execução sem erros", dica: "Veja o console.", f: c => c.result === "done" }] },
{ id: "x4", titulo: "Pick and place", nivel: "Aplicações", scene: "pick",
  enunciado: "Retire a peça da Mesa A (centro X 575, Y 0, Z 175) e deposite-a na Esteira B (X 300, Y -525). Desça e suba em linha reta perto da peça, deixe a garra aberta e o robô em HOME no final.",
  src: "DEF exercicio4()\n  INI\n  PTP HOME\n  $OUT[1] = FALSE\n\n  PTP HOME\nEND", dat: "DEFDAT exercicio4\nENDDAT",
  criterios: [
    { txt: "A peça está sobre a Esteira B", dica: "Solte a peça com $OUT[1] = FALSE a poucos milímetros da esteira (Z 175 a 185).", f: c => onObj(c.parts[0], c.scene.objetos.find(o => o.tipo === "esteira")) },
    { txt: "Descida até a peça feita com LIN", dica: "Use PTP até um ponto acima (Z 320) e LIN para descer.", f: c => moves(c).some(m => /^\s*LIN/i.test(m.label) && m.pos.Z < 200 && Math.hypot(m.pos.X - 575, m.pos.Y) < 10) },
    { txt: "Garra aberta no final", dica: "Termine com $OUT[1] = FALSE.", f: c => !c.outs[1] },
    { txt: "Sem colisões e sem erros", dica: "Leia o console: há colisão ou ponto inalcançável?", f: c => c.result === "done" },
    { txt: "Termina em HOME", dica: "PTP HOME no final.", f: c => atHome(c.joints) }] },
{ id: "x5", titulo: "Partida pelo operador", nivel: "Aplicações", scene: "pick",
  enunciado: "Faça o mesmo pick and place, mas o robô só pode sair de HOME depois que o operador ativar a entrada $IN[1]. Durante o teste, clique em IN 1 quando o console pedir.",
  src: "DEF exercicio5()\n  INI\n  PTP HOME\n  $OUT[1] = FALSE\n\n  PTP HOME\nEND", dat: "DEFDAT exercicio5\nENDDAT",
  criterios: [
    { txt: "Espera $IN[1] antes de sair de HOME", dica: "Coloque WAIT FOR $IN[1] logo após o primeiro PTP HOME.", f: c => { const iw = c.events.findIndex(e => e.t === "wait" && /\$IN\s*\[\s*1\s*\]/i.test(e.text)); const im = c.events.findIndex(e => e.t === "move" && !atHome(e.joints)); return iw >= 0 && (im < 0 || iw < im); } },
    { txt: "A peça está sobre a Esteira B", dica: "Veja o exercício de pick and place.", f: c => onObj(c.parts[0], c.scene.objetos.find(o => o.tipo === "esteira")) },
    { txt: "Sem erros", dica: "Veja o console.", f: c => c.result === "done" }] },
{ id: "x6", titulo: "Paletização 2×2", nivel: "Aplicações", scene: "palete",
  enunciado: "Transfira as 4 peças da mesa para o palete formando uma camada 2×2 (passo de 100 mm). Use uma estrutura de repetição (FOR, WHILE ou LOOP) em vez de repetir o código 4 vezes.",
  src: "DEF exercicio6()\n  DECL INT i\n  INI\n  PTP HOME\n  $OUT[1] = FALSE\n\n  PTP HOME\nEND", dat: "DEFDAT exercicio6\n  DECL E6POS MESA_1 = {X 500, Y -150, Z 320, A 0, B 90, C 0}\n  DECL E6POS PALETE_1 = {X 200, Y -550, Z 320, A 0, B 90, C 0}\nENDDAT",
  criterios: [
    { txt: "As 4 peças estão sobre o palete", dica: "Solte cada peça a 0–10 mm acima do palete (topo em Z 120, centro da peça em Z 145).", f: c => { const p = c.scene.objetos.find(o => o.tipo === "palete"); return c.parts.length === 4 && c.parts.every(pc => onObj(pc, p)); } },
    { txt: "Peças em posições diferentes (sem empilhar)", dica: "Calcule X e Y de cada posição a partir de PALETE_1.", f: c => c.parts.every((a, i) => c.parts.every((b, j) => i === j || Math.hypot(a.x - b.x, a.y - b.y) > 60)) },
    { txt: "Usa estrutura de repetição", dica: "Use FOR i = 1 TO 4 ... ENDFOR.", f: c => /^\s*(FOR|WHILE|LOOP|REPEAT)\b/im.test(c.src) },
    { txt: "Sem erros", dica: "Veja o console.", f: c => c.result === "done" }] },
{ id: "x7", titulo: "Corrija o programa", nivel: "Diagnóstico", scene: "pick",
  enunciado: "O programa abaixo deveria levar a peça para a esteira, mas tem três defeitos. Encontre e corrija sem reescrever tudo.",
  src: "DEF exercicio7()\n  INI\n  PTP HOME\n  $OUT[1] = TRUE\n  PTP P_APROX\n  LIN P_PEGA\n  $OUT[1] = TRUE\n  WAIT SEC 0.3\n  LIN P_APROX\n  PTP P_ESTEIRA\n  LIN_REL {Z -140}\n  $OUT[1] = FALSE\n  LIN_REL {Z 140}\n  PTP HOME\nEND",
  dat: "DEFDAT exercicio7\n  DECL E6POS P_APROX = {X 575, Y 0, Z 320, A 0, B 90, C 0}\n  DECL E6POS P_PEGA = {X 575, Y 0, Z 135, A 0, B 90, C 0}\n  DECL E6POS P_ESTEIRA = {X 300, Y -1525, Z 320, A 0, B 90, C 0}\nENDDAT",
  criterios: [
    { txt: "A peça está sobre a Esteira B", dica: "Confira as coordenadas do ponto P_ESTEIRA (Y).", f: c => onObj(c.parts[0], c.scene.objetos.find(o => o.tipo === "esteira")) },
    { txt: "Sem colisões e sem erros", dica: "P_PEGA está abaixo do tampo da mesa? A peça tem centro em Z 175.", f: c => c.result === "done" },
    { txt: "A garra estava aberta antes de descer até a peça", dica: "Antes de LIN P_PEGA a garra precisa estar aberta ($OUT[1] = FALSE).", f: c => { const g = c.events.filter(e => e.t === "grip"); return g.some(e => e.ok); } }] },
];

// ================== Pacote de programas de teste (v1.1) ==================
Object.assign(SCENES, {
  soldagem: { nome: "Soldagem (mesa + peça)", objetos: [
    { tipo: "mesa", nome: "Mesa A", x: 575, y: 0, w: 350, d: 500, h: 150 },
    { tipo: "bloco", nome: "Peça a soldar", x: 575, y: 0, w: 200, d: 150, h: 230 }], pecas: [] },
  despalete: { nome: "Despaletização (palete + esteira)", objetos: [
    { tipo: "palete", nome: "Palete", x: 250, y: -500, w: 320, d: 320, h: 120 },
    { tipo: "esteira", nome: "Esteira", x: 575, y: 150, w: 300, d: 440, h: 150 }],
    pecas: [[200, -550], [300, -550], [200, -450], [300, -450]] },
  inspecao: { nome: "Inspeção (mesa + câmera + esteira)", objetos: [
    { tipo: "mesa", nome: "Mesa A", x: 575, y: 0, w: 350, d: 500, h: 150 },
    { tipo: "esteira", nome: "Esteira B", x: 300, y: -525, w: 440, d: 310, h: 150 },
    { tipo: "bloco", nome: "Câmera", x: 250, y: 380, w: 100, d: 100, h: 600 }], pecas: [[575, 0]] },
});

const P = (n, x, y, z, b = 90) => `  DECL E6POS ${n} = {X ${x}, Y ${y}, Z ${z}, A 0, B ${b}, C 0}`;
EXAMPLES.push(
{ id: "b01", cat: "Movimentação básica", scene: "vazia", title: "T01 · Eixo por eixo (E6AXIS)", src:
`DEF t01_eixos()
  ; Move um eixo de cada vez com agregados parciais de E6AXIS.
  ; Observe no painel da direita qual eixo muda em cada linha.
  DECL INT i
  INI
  PTP HOME
  PTP {A1 60}
  PTP {A1 -60}
  PTP {A1 0}
  PTP {A2 -60}                 ; braço inclina para a frente
  PTP {A3 60}                  ; cotovelo
  PTP {A2 -90, A3 90}
  PTP {A5 60}                  ; dobra o punho
  PTP {A4 90}                  ; gira o antebraço
  PTP {A6 180}                 ; gira a flange
  PTP {A4 0, A5 0, A6 0}
  FOR i = 1 TO 4               ; giro relativo da base: 4 x 30 graus
    PTP_REL {A1 30}
  ENDFOR
  PTP HOME
END`, dat: `DEFDAT t01_eixos\nENDDAT` },

{ id: "b02", cat: "Movimentação básica", scene: "vazia", title: "T02 · Retângulo calculado com variáveis", src:
`DEF t02_retangulo()
  ; Um único ponto ensinado (CANTO); os outros são calculados.
  DECL E6POS P
  DECL REAL larg, comp
  INI
  larg = 300
  comp = 200
  $VEL.CP = 0.25
  PTP HOME
  P = CANTO
  PTP P
  P.Y = P.Y + larg
  LIN P
  P.X = P.X + comp
  LIN P
  P.Y = P.Y - larg
  LIN P
  P.X = P.X - comp
  LIN P
  PTP HOME
END`, dat: `DEFDAT t02_retangulo\n${P("CANTO", 450, -150, 350)}\nENDDAT` },

{ id: "b03", cat: "Movimentação básica", scene: "vazia", title: "T03 · Velocidades ($VEL.CP e eixos)", src:
`DEF t03_velocidades()
  ; O mesmo trajeto LIN com 3 velocidades guardadas num vetor,
  ; depois um PTP com velocidade de eixos reduzida.
  DECL INT i
  DECL REAL v[3]
  INI
  v[1] = 0.1
  v[2] = 0.3
  v[3] = 0.8
  PTP HOME
  FOR i = 1 TO 3
    $VEL.CP = v[i]
    PTP PA
    LIN PB
    LIN PA
  ENDFOR
  BAS(#PTP_PARAMS, 30)         ; eixos a 30 %
  PTP PB
  BAS(#PTP_PARAMS, 100)
  PTP HOME
END`, dat: `DEFDAT t03_velocidades\n${P("PA", 500, -250, 450)}\n${P("PB", 500, 250, 450)}\nENDDAT` },

{ id: "b04", cat: "Movimentação básica", scene: "vazia", title: "T04 · $BASE e $TOOL", src:
`DEF t04_base_tool()
  ; O mesmo subprograma desenha um quadrado em duas BASES diferentes:
  ; os pontos são relativos à base ativa.
  INI
  $VEL.CP = 0.3
  PTP HOME
  $BASE = {X 400, Y -250, Z 300, A 0, B 0, C 0}
  quadrado()
  $BASE = {X 400, Y 100, Z 300, A 30, B 0, C 0}   ; base girada 30 graus
  quadrado()
  $BASE = $NULLFRAME
  ; Mesmo destino com duas ferramentas: veja o robô mudar de pose
  $TOOL = $NULLFRAME           ; TCP no centro da flange
  PTP {X 500, Y 0, Z 500, A 0, B 90, C 0}
  $TOOL = {X 110, Y 0, Z 0, A 0, B 0, C 0}        ; TCP na ponta da garra
  PTP {X 500, Y 0, Z 500, A 0, B 90, C 0}
  PTP HOME
END

DEF quadrado()
  PTP {X 0, Y 0, Z 100, A 0, B 90, C 0}
  LIN {X 0, Y 0, Z 0}
  LIN {X 150, Y 0, Z 0}
  LIN {X 150, Y 150, Z 0}
  LIN {X 0, Y 150, Z 0}
  LIN {X 0, Y 0, Z 0}
  LIN {X 0, Y 0, Z 100}
END`, dat: `DEFDAT t04_base_tool\nENDDAT` },

{ id: "b05", cat: "Movimentação básica", scene: "vazia", title: "T05 · Hélice com SIN e COS", src:
`DEF t05_helice()
  ; 3 voltas de raio 120 mm subindo 40 mm por volta (72 pontos LIN)
  DECL INT i
  DECL REAL ang, raio
  DECL E6POS P
  INI
  raio = 120
  $VEL.CP = 0.4
  PTP HOME
  P = CENTRO
  P.X = CENTRO.X + raio
  PTP P
  FOR i = 1 TO 72
    ang = i * 15
    P.X = CENTRO.X + raio * COS(ang)
    P.Y = CENTRO.Y + raio * SIN(ang)
    P.Z = CENTRO.Z + i * 40 / 24
    LIN P
  ENDFOR
  PTP HOME
END`, dat: `DEFDAT t05_helice\n${P("CENTRO", 550, 0, 300)}\nENDDAT` },

{ id: "i01", cat: "Integração com sensores", scene: "vazia", title: "T06 · Sequência de luzes (WHILE e FOR)", src:
`DEF t06_luzes()
  ; Acende as saídas 2 a 8 em sequência, 3 voltas. Observe o painel de E/S.
  DECL INT n, volta
  INI
  PTP HOME
  volta = 0
  WHILE volta < 3
    FOR n = 2 TO 8
      $OUT[n] = TRUE
      WAIT SEC 0.15
      $OUT[n] = FALSE
    ENDFOR
    volta = volta + 1
  ENDWHILE
  FOR n = 2 TO 8
    $OUT[n] = TRUE
  ENDFOR
  WAIT SEC 1
  FOR n = 2 TO 8
    $OUT[n] = FALSE
  ENDFOR
END`, dat: `DEFDAT t06_luzes\nENDDAT` },

{ id: "i02", cat: "Integração com sensores", scene: "vazia", title: "T07 · Seleção de programa pelo CLP (SWITCH)", src:
`DEF t07_selecao()
  ; As entradas 1 a 3 formam o número do programa (1, 2 ou 3).
  ; Ligue as entradas e depois IN 8 (partida). Desligue IN 8 para o próximo ciclo.
  ; IN 7 encerra. $OUT[2] = robô pronto; $OUT[8] = número inválido.
  DECL INT prog
  INI
  PTP HOME
  LOOP
    $OUT[2] = TRUE
    WAIT FOR $IN[8] OR $IN[7]
    IF $IN[7] THEN
      EXIT
    ENDIF
    $OUT[2] = FALSE
    prog = 0
    IF $IN[1] THEN
      prog = prog + 1
    ENDIF
    IF $IN[2] THEN
      prog = prog + 2
    ENDIF
    IF $IN[3] THEN
      prog = prog + 4
    ENDIF
    SWITCH prog
    CASE 1
      PTP POS_1
    CASE 2
      PTP POS_2
    CASE 3
      PTP POS_3
    DEFAULT
      $OUT[8] = TRUE
      WAIT SEC 1
      $OUT[8] = FALSE
    ENDSWITCH
    PTP HOME
    WAIT FOR NOT $IN[8]
  ENDLOOP
  $OUT[2] = FALSE
  PTP HOME
END`, dat: `DEFDAT t07_selecao\n${P("POS_1", 500, -300, 400)}\n${P("POS_2", 600, 0, 400)}\n${P("POS_3", 500, 300, 400)}\nENDDAT` },

{ id: "i03", cat: "Integração com sensores", scene: "vazia", title: "T08 · Ciclos até o operador parar (REPEAT)", src:
`DEF t08_repeat()
  ; Vai e volta até IN 2 ser ativada ou completar 5 ciclos.
  ; A condição é testada no FIM de cada ciclo.
  DECL INT ciclos
  INI
  ciclos = 0
  PTP HOME
  REPEAT
    PTP PA
    PTP PB
    ciclos = ciclos + 1
  UNTIL $IN[2] OR (ciclos >= 5)
  PTP HOME
END`, dat: `DEFDAT t08_repeat\n${P("PA", 450, -300, 450)}\n${P("PB", 450, 300, 450)}\nENDDAT` },

{ id: "i04", cat: "Integração com sensores", scene: "vazia", title: "T09 · Interrupção de segurança (INTERRUPT)", src:
`DEF t09_interrupt()
  ; Uma interrupção vigia IN 5 (simula uma cortina de luz).
  ; Ative IN 5 durante o ciclo: parada() sinaliza o alarme e espera IN 5 desligar.
  DECL INT i
  INI
  INTERRUPT DECL 10 WHEN $IN[5] DO parada()
  INTERRUPT ON 10
  PTP HOME
  FOR i = 1 TO 6
    PTP PA
    LIN PB
  ENDFOR
  INTERRUPT OFF 10
  PTP HOME
END

DEF parada()
  $OUT[8] = TRUE
  WAIT FOR NOT $IN[5]
  $OUT[8] = FALSE
END`, dat: `DEFDAT t09_interrupt\n${P("PA", 500, -250, 400)}\n${P("PB", 500, 250, 400)}\nENDDAT` },

{ id: "i05", cat: "Movimentação básica", scene: "vazia", title: "T10 · Vetor de alturas", src:
`DEF t10_vetores()
  ; Um vetor guarda 5 alturas; o robô toca cada ponto e sobe de novo.
  DECL REAL alt[5]
  DECL INT i
  DECL E6POS P
  INI
  alt[1] = 250
  alt[2] = 350
  alt[3] = 450
  alt[4] = 350
  alt[5] = 250
  $VEL.CP = 0.4
  PTP HOME
  P = LINHA
  FOR i = 1 TO 5
    P.Y = LINHA.Y + (i - 1) * 100
    P.Z = alt[i]
    PTP P
    LIN_REL {Z -80}
    LIN_REL {Z 80}
  ENDFOR
  PTP HOME
END`, dat: `DEFDAT t10_vetores\n${P("LINHA", 450, -200, 300)}\nENDDAT` },

{ id: "a01", cat: "Soldagem", scene: "soldagem", title: "T11 · Cordão de solda em volta da peça", src:
`DEF t11_soldagem()
  ; Cordão de filete em volta da base da peça e uma costura no topo
  ; com canto arredondado (CIRC). $OUT[3] = tocha ligada.
  ; Numa célula real a tocha trabalha inclinada ~45 graus; aqui ela fica vertical.
  INI
  PTP HOME
  PTP S_APROX
  $VEL.CP = 0.3
  LIN S1
  $OUT[3] = TRUE               ; abre o arco
  WAIT SEC 0.3
  $VEL.CP = 0.08               ; velocidade de soldagem (~4,8 m/min)
  LIN S2
  LIN S3
  LIN S4
  LIN S1
  $OUT[3] = FALSE              ; fecha o arco
  $VEL.CP = 0.3
  LIN S_APROX
  PTP T_APROX
  LIN T1
  $OUT[3] = TRUE
  $VEL.CP = 0.08
  LIN T2
  CIRC T_AUX, T3
  LIN T4
  $OUT[3] = FALSE
  $VEL.CP = 0.3
  LIN_REL {Z 100}
  PTP HOME
END`, dat: `DEFDAT t11_soldagem
${P("S_APROX", 463, -87, 260)}
${P("S1", 463, -87, 160)}
${P("S2", 687, -87, 160)}
${P("S3", 687, 87, 160)}
${P("S4", 463, 87, 160)}
${P("T_APROX", 500, -50, 320)}
${P("T1", 500, -50, 235)}
${P("T2", 620, -50, 235)}
${P("T_AUX", 641.2, -41.2, 235)}
${P("T3", 650, -20, 235)}
${P("T4", 650, 50, 235)}
ENDDAT` },

{ id: "a02", cat: "Operações de montagem", scene: "pick", title: "T12 · Aplicação de cola (contorno com cantos arredondados)", src:
`DEF t12_cola()
  ; Contorno retangular 210 x 300 mm com cantos de raio 40 mm (4 LIN + 4 CIRC)
  ; $OUT[4] = válvula de cola. Bico 10 mm acima da mesa.
  INI
  PTP HOME
  PTP G_APROX
  $VEL.CP = 0.3
  LIN G1
  $OUT[4] = TRUE
  $VEL.CP = 0.12
  LIN G2
  CIRC G2A, G3
  LIN G4
  CIRC G4A, G5
  LIN G6
  CIRC G6A, G7
  LIN G8
  CIRC G8A, G1
  $OUT[4] = FALSE
  $VEL.CP = 0.3
  LIN G_APROX
  PTP HOME
END`, dat: `DEFDAT t12_cola
${P("G_APROX", 510, -150, 260)}
${P("G1", 510, -150, 160)}
${P("G2", 640, -150, 160)}
${P("G2A", 668.3, -138.3, 160)}
${P("G3", 680, -110, 160)}
${P("G4", 680, 110, 160)}
${P("G4A", 668.3, 138.3, 160)}
${P("G5", 640, 150, 160)}
${P("G6", 510, 150, 160)}
${P("G6A", 481.7, 138.3, 160)}
${P("G7", 470, 110, 160)}
${P("G8", 470, -110, 160)}
${P("G8A", 481.7, -138.3, 160)}
ENDDAT` },

{ id: "a03", cat: "Paletização", scene: "palete", title: "T13 · Paletização em 2 camadas", src:
`DEF t13_palete_camadas()
  ; 4 peças da mesa formam 2 camadas de 2 peças no palete.
  ; A altura de descida é calculada pela camada.
  DECL INT camada, col, n
  DECL REAL desce
  DECL E6POS PEGA, SOLTA
  INI
  $VEL.CP = 0.5
  PTP HOME
  $OUT[1] = FALSE
  n = 0
  FOR camada = 1 TO 2
    FOR col = 1 TO 2
      n = n + 1
      PEGA = MESA_1
      PEGA.Y = MESA_1.Y + (n - 1) * 100
      SOLTA = PALETE_1
      SOLTA.X = PALETE_1.X + (col - 1) * 100
      desce = 170 - (camada - 1) * 50
      PTP PEGA
      LIN_REL {Z -145}
      $OUT[1] = TRUE
      WAIT SEC 0.3
      LIN_REL {Z 145}
      PTP SOLTA
      LIN_REL {Z -desce}
      $OUT[1] = FALSE
      WAIT SEC 0.2
      LIN_REL {Z desce}
    ENDFOR
  ENDFOR
  PTP HOME
END`, dat: `DEFDAT t13_palete_camadas\n${P("MESA_1", 500, -150, 320)}\n${P("PALETE_1", 200, -550, 320)}\nENDDAT` },

{ id: "a04", cat: "Paletização", scene: "despalete", title: "T14 · Despaletização para a esteira", src:
`DEF t14_despaletizar()
  ; Retira as 4 peças do palete (2 x 2) e coloca em fila na esteira.
  DECL INT lin, col, n
  DECL E6POS PEGA, SOLTA
  INI
  $VEL.CP = 0.5
  PTP HOME
  $OUT[1] = FALSE
  n = 0
  FOR lin = 1 TO 2
    FOR col = 1 TO 2
      n = n + 1
      PEGA = PALETE_1
      PEGA.X = PALETE_1.X + (col - 1) * 100
      PEGA.Y = PALETE_1.Y + (lin - 1) * 100
      SOLTA = ESTEIRA_1
      SOLTA.Y = ESTEIRA_1.Y + (n - 1) * 90
      PTP PEGA
      LIN_REL {Z -175}
      $OUT[1] = TRUE
      WAIT SEC 0.3
      LIN_REL {Z 175}
      PTP SOLTA
      LIN_REL {Z -140}
      $OUT[1] = FALSE
      WAIT SEC 0.2
      LIN_REL {Z 140}
    ENDFOR
  ENDFOR
  PTP HOME
END`, dat: `DEFDAT t14_despaletizar\n${P("PALETE_1", 200, -550, 320)}\n${P("ESTEIRA_1", 575, 0, 320)}\nENDDAT` },

{ id: "a05", cat: "Alimentação de máquinas", scene: "maquina", title: "T15 · Alimentação de máquina CNC", src:
`DEF t15_maquina()
  ; Para cada peça: pega na mesa, coloca no dispositivo da máquina,
  ; sinaliza o ciclo ($OUT[4]), espera a usinagem, retira e guarda na área de prontas.
  INI
  $VEL.CP = 0.5
  PTP HOME
  $OUT[1] = FALSE
  pegar(BRUTA_1, 145)
  maquinar()
  soltar(PRONTA_1, 140)
  pegar(BRUTA_2, 145)
  maquinar()
  soltar(PRONTA_2, 140)
  PTP HOME
END

DEF maquinar()
  soltar(DISPOSITIVO, 135)
  PTP SEGURA                   ; fora da área da máquina
  $OUT[4] = TRUE               ; inicia o ciclo da máquina
  WAIT SEC 1.5                 ; tempo de usinagem (simulado)
  $OUT[4] = FALSE
  pegar(DISPOSITIVO, 135)
END

DEF pegar(alvo:IN, desce:IN)
  PTP alvo
  LIN_REL {Z -desce}
  $OUT[1] = TRUE
  WAIT SEC 0.3
  LIN_REL {Z desce}
END

DEF soltar(alvo:IN, desce:IN)
  PTP alvo
  LIN_REL {Z -desce}
  $OUT[1] = FALSE
  WAIT SEC 0.2
  LIN_REL {Z desce}
END`, dat: `DEFDAT t15_maquina
${P("BRUTA_1", 575, 0, 320)}
${P("BRUTA_2", 575, 120, 320)}
${P("DISPOSITIVO", 0, 420, 320)}
${P("SEGURA", 350, 250, 450)}
${P("PRONTA_1", 500, -150, 320)}
${P("PRONTA_2", 620, -150, 320)}
ENDDAT` },

{ id: "a06", cat: "Inspeção", scene: "inspecao", title: "T16 · Inspeção com câmera e refugo", src:
`DEF t16_inspecao()
  ; Pega a peça, mostra à câmera em 3 posições (giro de 90 graus)
  ; e decide: aprovada vai para a esteira; reprovada volta para a área de refugo.
  ; Ative IN 6 antes da inspeção para simular uma peça REPROVADA.
  DECL INT k
  INI
  $VEL.CP = 0.4
  PTP HOME
  $OUT[1] = FALSE
  PTP PECA
  LIN_REL {Z -145}
  $OUT[1] = TRUE
  WAIT SEC 0.3
  LIN_REL {Z 145}
  PTP CAMERA
  FOR k = 1 TO 3
    $OUT[5] = TRUE             ; dispara a câmera
    WAIT SEC 0.4
    $OUT[5] = FALSE
    IF k < 3 THEN
      LIN_REL {A 90}           ; gira a peça 90 graus
    ENDIF
  ENDFOR
  IF $IN[6] THEN
    $OUT[8] = TRUE             ; alarme de refugo
    PTP REFUGO
  ELSE
    PTP ESTEIRA
  ENDIF
  LIN_REL {Z -140}
  $OUT[1] = FALSE
  WAIT SEC 0.2
  LIN_REL {Z 140}
  $OUT[8] = FALSE
  PTP HOME
END`, dat: `DEFDAT t16_inspecao
${P("PECA", 575, 0, 320)}
${P("CAMERA", 250, 270, 450)}
${P("ESTEIRA", 300, -525, 320)}
${P("REFUGO", 500, -170, 320)}
ENDDAT` },

{ id: "a07", cat: "Operações de montagem", scene: "maquina", title: "T17 · Montagem por empilhamento (encaixe lento)", src:
`DEF t17_montagem()
  ; Encaixa a peça 2 sobre a peça 1: aproximação rápida,
  ; últimos milímetros bem devagar (como num encaixe com folga pequena).
  INI
  PTP HOME
  $OUT[1] = FALSE
  PTP P2_APROX
  LIN_REL {Z -145}
  $OUT[1] = TRUE
  WAIT SEC 0.3
  LIN_REL {Z 145}
  PTP P1_APROX
  $VEL.CP = 0.3
  LIN_REL {Z -60}              ; aproximação rápida
  $VEL.CP = 0.01               ; 10 mm/s no encaixe
  LIN_REL {Z -34}
  $OUT[1] = FALSE
  WAIT SEC 0.5
  $VEL.CP = 0.3
  LIN_REL {Z 94}
  PTP HOME
END`, dat: `DEFDAT t17_montagem\n${P("P1_APROX", 575, 0, 320)}\n${P("P2_APROX", 575, 120, 320)}\nENDDAT` },

{ id: "a08", cat: "Aplicações avançadas", scene: "pick", title: "T18 · Célula completa com handshake de CLP", src:
`DEF t18_celula()
  ; Programa de célula: o "CLP" escolhe a tarefa e dá a partida.
  ;   IN 1 = tarefa 1 (mesa -> esteira)   IN 2 = tarefa 2 (esteira -> mesa)
  ;   IN 8 = partida (desligue após cada ciclo)   IN 7 = encerrar
  ;   OUT 2 = pronto   OUT 3 = em ciclo   OUT 4 = ciclo concluído   OUT 8 = falha
  DECL INT tarefa
  INI
  PTP HOME
  $OUT[1] = FALSE
  LOOP
    $OUT[2] = TRUE
    WAIT FOR $IN[8] OR $IN[7]
    IF $IN[7] THEN
      EXIT
    ENDIF
    $OUT[2] = FALSE
    $OUT[4] = FALSE
    $OUT[3] = TRUE
    tarefa = 0
    IF $IN[1] THEN
      tarefa = 1
    ENDIF
    IF $IN[2] THEN
      tarefa = tarefa + 2
    ENDIF
    SWITCH tarefa
    CASE 1
      transferir(MESA, ESTEIRA)
      $OUT[4] = TRUE
    CASE 2
      transferir(ESTEIRA, MESA)
      $OUT[4] = TRUE
    DEFAULT
      $OUT[8] = TRUE           ; nenhuma ou duas tarefas selecionadas
      WAIT SEC 1
      $OUT[8] = FALSE
    ENDSWITCH
    $OUT[3] = FALSE
    WAIT FOR NOT $IN[8]
  ENDLOOP
  $OUT[2] = FALSE
  PTP HOME
END

DEF transferir(de:IN, para:IN)
  PTP de
  LIN_REL {Z -145}
  $OUT[1] = TRUE
  WAIT SEC 0.3
  LIN_REL {Z 145}
  PTP para
  LIN_REL {Z -142}
  $OUT[1] = FALSE
  WAIT SEC 0.2
  LIN_REL {Z 142}
  PTP HOME
END`, dat: `DEFDAT t18_celula\n${P("MESA", 575, 0, 320)}\n${P("ESTEIRA", 300, -525, 320)}\nENDDAT` },

{ id: "d01", cat: "Aplicações avançadas", scene: "vazia", title: "T19 · Diagnóstico: singularidade de punho", src:
`DEF t19_singularidade()
  ; ERRO DE PROPÓSITO. O LIN atravessa a frente do robô com a ferramenta
  ; apontando para a frente (B 0): no meio do caminho A5 passa por 0 grau
  ; e A4/A6 precisariam girar quase 180 graus de uma vez.
  ; Soluções (teste uma de cada vez):
  ;   1) troque o LIN por PTP;
  ;   2) incline a ferramenta: B 15 nos dois pontos;
  ;   3) mude a altura: Z 700 nos dois pontos.
  INI
  PTP HOME
  PTP S_ESQ
  LIN S_DIR
  PTP HOME
END`, dat: `DEFDAT t19_singularidade\n${P("S_ESQ", 635, -250, 885, 0)}\n${P("S_DIR", 635, 250, 885, 0)}\nENDDAT` },

{ id: "d02", cat: "Aplicações avançadas", scene: "vazia", title: "T20 · Diagnóstico: limites e alcance", src:
`DEF t20_limites()
  ; ERROS DE PROPÓSITO, um por vez. Execute, leia o console, corrija e execute de novo.
  ;   1) A1 = 175 passa do limite de software (+170).
  ;   2) LONGE está fora do alcance do braço.
  ;   3) ABAIXO fica abaixo do piso (Z negativo): colisão.
  INI
  PTP HOME
  PTP {A1 175}
  PTP LONGE
  PTP ABAIXO
  PTP HOME
END`, dat: `DEFDAT t20_limites\n${P("LONGE", 1100, 0, 600)}\n${P("ABAIXO", 600, 0, -30)}\nENDDAT` },
);
