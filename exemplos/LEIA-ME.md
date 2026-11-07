# Programas de exemplo e de teste

Cada pasta tem um par `.src` + `.dat`. Para usar no Korum: **Projetos → Importar KRL** (ou **Análise → Importar programa**), selecione os dois arquivos juntos e depois escolha o cenário indicado em **Cenário → Modelo**.

Os mesmos programas também aparecem no menu **Exemplos** do editor, já com o cenário certo.

| Programa | Pasta | Cenário |
|---|---|---|
| Pick and place (mesa → esteira) | `pick_place` | Pick and place (mesa + esteira) |
| Movimentos básicos: PTP e LIN | `basico` | Pick and place (mesa + esteira) |
| Quadrado com FOR e LIN_REL | `quadrado` | Pick and place (mesa + esteira) |
| Círculo com CIRC | `circulo` | Pick and place (mesa + esteira) |
| Ciclo com E/S: LOOP, WAIT FOR, subprogramas | `ciclo` | Pick and place (mesa + esteira) |
| Paletização 2×2 com FOR | `paletizar` | Paletização (mesa + palete) |
| Diagnóstico: encontre os erros | `diagnostico` | Pick and place (mesa + esteira) |
| Programa importado (formato com FOLDs) | `prog_importado` | Pick and place (mesa + esteira) |
| T01 · Eixo por eixo (E6AXIS) | `t01_eixos` | Célula vazia |
| T02 · Retângulo calculado com variáveis | `t02_retangulo` | Célula vazia |
| T03 · Velocidades ($VEL.CP e eixos) | `t03_velocidades` | Célula vazia |
| T04 · $BASE e $TOOL | `t04_base_tool` | Célula vazia |
| T05 · Hélice com SIN e COS | `t05_helice` | Célula vazia |
| T06 · Sequência de luzes (WHILE e FOR) | `t06_luzes` | Célula vazia |
| T07 · Seleção de programa pelo CLP (SWITCH) | `t07_selecao` | Célula vazia |
| T08 · Ciclos até o operador parar (REPEAT) | `t08_repeat` | Célula vazia |
| T09 · Interrupção de segurança (INTERRUPT) | `t09_interrupt` | Célula vazia |
| T10 · Vetor de alturas | `t10_vetores` | Célula vazia |
| T11 · Cordão de solda em volta da peça | `t11_soldagem` | Soldagem (mesa + peça) |
| T12 · Aplicação de cola (contorno com cantos arredondados) | `t12_cola` | Pick and place (mesa + esteira) |
| T13 · Paletização em 2 camadas | `t13_palete_camadas` | Paletização (mesa + palete) |
| T14 · Despaletização para a esteira | `t14_despaletizar` | Despaletização (palete + esteira) |
| T15 · Alimentação de máquina CNC | `t15_maquina` | Alimentação de máquina |
| T16 · Inspeção com câmera e refugo | `t16_inspecao` | Inspeção (mesa + câmera + esteira) |
| T17 · Montagem por empilhamento (encaixe lento) | `t17_montagem` | Alimentação de máquina |
| T18 · Célula completa com handshake de CLP | `t18_celula` | Pick and place (mesa + esteira) |
| T19 · Diagnóstico: singularidade de punho | `t19_singularidade` | Célula vazia |
| T20 · Diagnóstico: limites e alcance | `t20_limites` | Célula vazia |

Os programas T19 e T20 têm erros de propósito, para treinar diagnóstico. T07 e T18 esperam sinais nas entradas: leia os comentários no início de cada um.
| T21 · Esteira com pacotes e palete de camadas cruzadas | `t21_esteira_pacotes` | Linha de pacotes (esteira + palete) |
| T22 · Esteira: contar pacotes com o sensor | `t22_contar_pacotes` | Linha de pacotes (esteira + palete) |
