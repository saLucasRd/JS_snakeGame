// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/


// Declaração de variáveis e constantes

var tela;
var ctx;

var cabeca;
var maca;
var bola;
var obstaculo;

var pontos;
var maca_x = [];
var maca_y = [];
var obs_x = [];
var obs_y = [];

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;
var noJogo = true;    

const TAMANHO_PONTO = 10;
const ALEATORIO_MAXIMOx = 59;
const ALEATORIO_MAXIMOy = 29;
const ATRASO = 140;
const C_ALTURA = 300;
const C_LARGURA = 600;    

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla

iniciar(); // Chama função inicial do jogo


// Definição das funções

function iniciar() {
    tela = document.getElementById("tela");
    ctx = tela.getContext("2d");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);

    carregarImagens();
    criarCobra();
    localizarMaca();
    localizarObs();



    setTimeout("cicloDeJogo()", ATRASO);
}    

function carregarImagens() {
    cabeca = new Image();
    cabeca.src = "cabeca.png";    
    
    bola = new Image();
    bola.src = "ponto.png"; 
    
    maca = new Image();
    maca.src = "maca.png"; 

    obstaculo = new Image();
    obstaculo.src = "obstaculo.png";
}

function criarCobra() {
    pontos = 3;
	
    for (var z = 0; z < pontos; z++) {
        x[z] = Math.floor(Math.random() *  ALEATORIO_MAXIMOx)
        y[z] = Math.floor(Math.random() *  ALEATORIO_MAXIMOy)
    }
}

function localizarMaca() {
    for (var i = 0; i < 15; i++) {
        maca_x[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOx) * TAMANHO_PONTO
        maca_y[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOy) *TAMANHO_PONTO

    }
        }    

function localizarObs() { 
    for (var i = 0; i < 15; i++) {
        obs_x[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOx) * TAMANHO_PONTO
        obs_y[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOy) *TAMANHO_PONTO

    }

} 


function cicloDeJogo() {
    if (noJogo) {
        verificarMaca();
        verificarColisao();
        mover();
        fazerDesenho();
        setTimeout("cicloDeJogo()", ATRASO);
    }
}

function verificarMaca() {
        for (var i ; i < 15; i++) {
            if ((x[0] == maca_x[i]) && (y[0] == maca_y[i])) {
            pontos++;
            break;
            }
        }
}    



function verificarColisao() {
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
        }
        if ((x[0] == obs_x) && (y[0] == obs_y)) {
            noJogo = false;
        }
    }
    
}

function mover() {
    for (var z = pontos; z > 0; z--) {
        x[z] = x[z-1];
        y[z] = y[z-1];
    }

    if (paraEsquerda) {
        x[0] -= TAMANHO_PONTO;
    }

    if (paraDireita) {
        x[0] += TAMANHO_PONTO;
    }

    if (paraCima) {
        y[0] -= TAMANHO_PONTO;
    }

    if (paraBaixo) {
        y[0] += TAMANHO_PONTO;
    }
}    

function fazerDesenho() {
    ctx.clearRect(0, 0, C_LARGURA, C_ALTURA);
	ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);
	
    if (noJogo) {
        for (var i = 0; i < 15; i++){
        ctx.drawImage(maca, maca_x[i], maca_y[i]);
        }

        for (var i = 0; i < 15; i++){
            ctx.drawImage(obstaculo, obs_x[i], obs_y[i]);
            }
        
		
        for (var z = 0; z < pontos; z++) {
            if (z == 0) {
                ctx.drawImage(cabeca, x[z], y[z]);
            } else {
                ctx.drawImage(bola, x[z], y[z]);
            }
        }    
    } else {
        fimDeJogo();
    }        
}

function fimDeJogo() {
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle"; 
    ctx.textAlign = "center"; 
    ctx.font = "normal bold 18px serif";
    ctx.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);
}

function verificarTecla(e) {
    var tecla = e.keyCode;

    if ((tecla == TECLA_ESQUERDA) && (!paraDireita)) {
        paraEsquerda = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_DIREITA) && (!paraEsquerda)) {
        paraDireita = true;
        paraCima = false;
        paraBaixo = false;
    }

    if ((tecla == TECLA_ACIMA) && (!paraBaixo)) {
        paraCima = true;
        paraDireita = false;
        paraEsquerda = false;
    }

    if ((tecla == TECLA_ABAIXO) && (!paraCima)) {
        paraBaixo = true;
        paraDireita = false;
        paraEsquerda = false;
    }        
}