// Jogo da Cobra (Snake Game)
// Autor: Jan Bodnar
// Adaptado por: Gilson Pereira
// Código fonte original: http://zetcode.com/javascript/snake/


// Declaração de variáveis e constantes

var tela;
var ctx;

var scoreColorPrimary = 'Black';
var scoreColorFont = 'White';

var inputName;
var cabeca;
var maca;
var bola;
var obstaculo;
var vidas = 5;
var totalMaca = 15;
var totalObs = 10;
var somComer;
var somMorrer;
var somDano;
var somMusica;


var pontos = 3;
var maca_x = [];
var maca_y = [];
var obs_x = [];
var obs_y = [];

var paraEsquerda = false;
var paraDireita = true;
var paraCima = false;
var paraBaixo = false;

var noJogo = true;
var ATRASO = 120;

var contador;
var minutos = 2;
var segundos = 59;




const TAMANHO_PONTO = 10;
const ALEATORIO_MAXIMOx = 59;
const ALEATORIO_MAXIMOy = 29;

//tela
const C_ALTURA = 300;
const C_LARGURA = 600;

//controles
const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;
const TECLA_ABAIXO = 40;

var x = [];
var y = [];

onkeydown = verificarTecla; // Define função chamada ao se pressionar uma tecla

iniciar(); // Chama função inicial do jogo




function iniciar() {

    tela = document.getElementById("tela");

    ctx = tela.getContext("2d");
    ctx.fillStyle = scoreColorPrimary;
    ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);


    scoreBoard()
    lifeCounter();
    timer();
    

    carregarImagens();
    carregarSons();
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

function carregarSons() {
    somComer = new Audio();
    somComer.src = "eat.mp3"

    somMorrer = new Audio();
    somMorrer.src = "death.mp3"

    somDano = new Audio();
    somDano.src = "hurt.mp3"


}

setTimeout(function() {
    document.getElementById("somMusica").play();
}, 120000)

function criarCobra() {


    for (var z = 0; z < pontos; z++) {
        x[z] = Math.floor(Math.random() * ALEATORIO_MAXIMOx) * TAMANHO_PONTO
        y[z] = Math.floor(Math.random() * ALEATORIO_MAXIMOy) * TAMANHO_PONTO
    }
}

function localizarMaca() {
    for (var i = 0; i < totalMaca; i++) {
        maca_x[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOx) * TAMANHO_PONTO
        maca_y[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOy) * TAMANHO_PONTO

    }
}

function localizarObs() {
    for (var i = 0; i < totalObs; i++) {
        obs_x[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOx) * TAMANHO_PONTO
        obs_y[i] = Math.floor(Math.random() * ALEATORIO_MAXIMOy) * TAMANHO_PONTO

    }

}


function cicloDeJogo() {
    

    if (noJogo) {
        verificarMaca();
        verificarColisao();
        if (vidas <= 0) {
            noJogo = false;
        }
        if (pontos >= totalMaca + 3) {
            noJogo = false;
        }
        if (minutos == 0 && segundos == 0) {
            noJogo = false;
        }
        mover();
        fazerDesenho();

        
        setInterval(atualizarContador(), 1000);
        setTimeout("cicloDeJogo()", ATRASO);
        
        
        
    }
    
}

function verificarMaca() {

    for (var i = 0; i < totalMaca; i++) {
        if ((x[0] == maca_x[i]) && (y[0] == maca_y[i])) {
            ctx.fillStyle = scoreColorPrimary
            ctx.fillRect(C_LARGURA + 120, 60, 80, 20)
            pontos++;
            somComer.play();
            ctx.fillStyle = scoreColorFont
            ctx.fillText(pontos - 3, C_LARGURA + 120, 80)



            maca_x[i] = maca_x[i] * C_LARGURA
            maca_y[i] = maca_y[i] * C_ALTURA
            ATRASO = ATRASO - 5;
            verificaVidas();

        }
    }

}

function verificaVidas() {

    if (pontos % 3 == 0 && pontos !== 0) {
        ctx.fillStyle = scoreColorPrimary
        ctx.fillRect(C_LARGURA + 120, 130, 80, 20)
        vidas++;
        ctx.fillStyle = scoreColorFont
        ctx.fillText(vidas, C_LARGURA + 120, 150)
    }

}

function verificarColisao() {
    //colisao com o corpo da cobra
    for (var z = pontos; z > 0; z--) {
        if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
            noJogo = false;
            
        }
    }
    for (var i = 0; i < totalObs; i++) {
        // colisao com os obstaculos
        if ((x[0] == obs_x[i]) && (y[0] == obs_y[i])) {
            ctx.fillStyle = scoreColorPrimary
            ctx.fillRect(C_LARGURA + 120, 130, 80, 20)
            vidas--;
            somDano.play();
            ctx.fillStyle = scoreColorFont
            ctx.fillText(vidas, C_LARGURA + 120, 150)

            obs_x[i] = obs_x[i] * C_LARGURA
            obs_y[i] = obs_y[i] * C_ALTURA



        }
    }
    // Colisao das bordas 
    if (x[0] > C_LARGURA - 20) {
        x[0] = 0;
    }
    if (y[0] > C_ALTURA - 20) {
        y[0] = 0;
    }
    if (x[0] < 0) {
        x[0] = C_LARGURA - 20;
    }
    if (y[0] < 0) {
        y[0] = C_ALTURA - 20;
    }
}



function mover() {
    for (var z = pontos; z > 0; z--) {
        x[z] = x[z - 1];
        y[z] = y[z - 1];
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
    ctx.fillStyle = scoreColorPrimary;
    ctx.fillRect(0, 0, C_LARGURA, C_ALTURA);

    if (noJogo) {
        for (var i = 0; i < totalMaca; i++) {
            ctx.drawImage(maca, maca_x[i], maca_y[i]);
        }

        for (var i = 0; i < totalObs; i++) {
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



function atualizarContador() {
    ctx.fillStyle = scoreColorPrimary
    ctx.fillRect(C_LARGURA + 140, 200, 40, 20)
    segundos--
    ctx.fillStyle = scoreColorFont
    ctx.fillText(segundos, C_LARGURA + 140, 220)

    if (segundos == 1 && minutos == 0) {
        ctx.fillRect(C_LARGURA + 140, 200, 40, 20)
        segundos == 0
        ctx.fillStyle = scoreColorFont
        ctx.fillText(segundos, C_LARGURA + 140, 220)
    }
    if (segundos == 0 && minutos >= 1) {
        ctx.fillStyle = scoreColorPrimary
        ctx.fillRect(C_LARGURA + 110, 200, 20, 30)
        minutos--;
        ctx.fillStyle = scoreColorFont
        ctx.fillText(minutos, C_LARGURA + 120, 220)
        segundos = segundos + 59
    }
    
    
    
              
    }


function scoreBoard() {
    ctx.fillStyle = scoreColorFont;
    ctx.fillRect(C_LARGURA, 0, 5, C_ALTURA);

    ctx.fillStyle = scoreColorPrimary;
    ctx.fillRect(C_LARGURA + 5, 0, 200, C_ALTURA);
    //preenchido os retangulos
    //escrevendo score
    ctx.fillStyle = scoreColorFont;
    ctx.font = "20px Monospace";
    ctx.fillText("SCORE ", C_LARGURA + 50, 80)
    ctx.fillText(pontos - 3, C_LARGURA + 130, 80)
}
function lifeCounter() {
    ctx.fillStyle = scoreColorFont;
    ctx.font = "20px Monospace";
    ctx.fillText("VIDAS ", C_LARGURA + 50, 150)
    ctx.fillText(vidas, C_LARGURA + 130, 150)
}
function timer() {
    ctx.fillStyle = scoreColorFont;
    ctx.font = "20px Monospace";
    ctx.fillText("TEMPO ", C_LARGURA + 50, 220)
    ctx.fillText(minutos, C_LARGURA + 120, 220)
    ctx.fillText(":", C_LARGURA + 130, 220)
    ctx.fillText(segundos, C_LARGURA + 140, 220)
    

}

function fimDeJogo() {
    somMorrer.play();
    rankScore();
    ctx.fillStyle = "RED";
    ctx.textAlign = "center";
    ctx.font = "normal bold 18px Monospace";
    ctx.fillText("GAMER OVER", C_LARGURA / 2, C_ALTURA / 4);
    ctx.fillStyle = "RED";
    ctx.textAlign = "center";
    ctx.font = "normal bold 18px Monospace";
    ctx.fillText(inputName, C_LARGURA / 2, C_ALTURA / 3);
    ctx.fillStyle = "RED";
    ctx.textAlign = "center";
    ctx.font = "normal bold 18px Monospace";
    ctx.fillText(pontos - 3, C_LARGURA - 210, C_ALTURA - 170);
    ctx.fillStyle = "RED";
    ctx.textAlign = "center";
    ctx.font = "normal bold 18px Monospace";
    ctx.fillText("PONTUAÇÃO TOTAL:", C_LARGURA / 2 , C_ALTURA - 170);

    
    
}

function rankScore() {
    inputName = prompt("Digite suas Inicias");
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
