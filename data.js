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
