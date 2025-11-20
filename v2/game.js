// --- Configurações do Jogo ---
const LINHAS = 32; // Altura do mapa
const COLUNAS = 64; // Largura do mapa
const NUM_SALAS = 8; // Quantidade de "salas" a serem geradas
const TAM_MIN_SALA = 5;
const TAM_MAX_SALA = 27;

// --- Símbolos do Mapa ---
const PAREDE = '█';
const CHAO = ' ';
const JOGADOR = '🐵';
const CHAVE = '🔑';
const SAIDA_FECHADA = '🚪';
const SAIDA_ABERTA = '🏁';

// --- Estado do Jogo ---
let mapa = [];
let jogador = { x: 1, y: 1, temChave: false };
let chavePos = { x: 0, y: 0 };
let saidaPos = { x: 0, y: 0 };

// --- Elementos do HTML ---
const gameBoard = document.getElementById('game-board');
const playerInput = document.getElementById('player-input');
const imagemImpacto = document.getElementById('impacto-parede');

// --- Funções do Jogo ---

/**
 * Gera um mapa proceduralmente.
 */
function gerarMapa() {
    // 1. Preenche tudo com paredes
    mapa = Array.from({ length: LINHAS }, () => Array(COLUNAS).fill(PAREDE));

    let salas = [];

    // 2. "Esculpe" salas aleatórias
    for (let i = 0; i < NUM_SALAS; i++) {
        const salaLargura = Math.floor(Math.random() * (TAM_MAX_SALA - TAM_MIN_SALA + 1)) + TAM_MIN_SALA;
        const salaAltura = Math.floor(Math.random() * (TAM_MAX_SALA - TAM_MIN_SALA + 1)) + TAM_MIN_SALA;
        const salaX = Math.floor(Math.random() * (COLUNAS - salaLargura - 2)) + 1;
        const salaY = Math.floor(Math.random() * (LINHAS - salaAltura - 2)) + 1;

        for (let y = salaY; y < salaY + salaAltura; y++) {
            for (let x = salaX; x < salaX + salaLargura; x++) {
                mapa[y][x] = CHAO;
            }
        }
        
        // Guarda o centro da sala para conectar corredores
        const centroX = salaX + Math.floor(salaLargura / 2);
        const centroY = salaY + Math.floor(salaAltura / 2);
        salas.push({ x: centroX, y: centroY });
    }

    // 3. Conecta as salas com corredores
    for (let i = 1; i < salas.length; i++) {
        conectarPontos(salas[i-1].x, salas[i-1].y, salas[i].x, salas[i].y);
    }
}

/**
 * Cria corredores entre dois pontos (centros de salas).
 */
function conectarPontos(x1, y1, x2, y2) {
    let x = x1;
    let y = y1;

    while (x !== x2 || y !== y2) {
        // Decide se move na horizontal ou vertical
        if (x !== x2 && (y === y2 || Math.random() < 0.5)) {
            mapa[y][x] = CHAO;
            x += Math.sign(x2 - x);
        } else if (y !== y2) {
            mapa[y][x] = CHAO;
            y += Math.sign(y2 - y);
        }
    }
    mapa[y2][x2] = CHAO;
}

/**
 * Encontra uma posição válida (chão) no mapa para colocar um item ou o jogador.
 */
function encontrarPosicaoValida() {
    let x, y;
    do {
        x = Math.floor(Math.random() * (COLUNAS - 2)) + 1;
        y = Math.floor(Math.random() * (LINHAS - 2)) + 1;
    } while (mapa[y][x] !== CHAO);
    return { x, y };
}

/**
 * Posiciona os elementos (jogador, chave, saída) no mapa.
 */
function popularMapa() {
    const posJogador = encontrarPosicaoValida();
    jogador.x = posJogador.x;
    jogador.y = posJogador.y;

    chavePos = encontrarPosicaoValida();
    saidaPos = encontrarPosicaoValida();
}

/**
 * Renderiza o estado atual do jogo na tela.
 */
function desenharMapa() {
    let mapaTemporario = mapa.map(linha => [...linha]);

    // Coloca a saída (aberta ou fechada)
    mapaTemporario[saidaPos.y][saidaPos.x] = jogador.temChave ? SAIDA_ABERTA : SAIDA_FECHADA;
    
    // Coloca a chave (se ainda não foi pega)
    if (!jogador.temChave) {
        mapaTemporario[chavePos.y][chavePos.x] = CHAVE;
    }

    // Coloca o jogador
    mapaTemporario[jogador.y][jogador.x] = JOGADOR;

    // Converte a matriz em uma string e exibe na tela
    gameBoard.textContent = mapaTemporario.map(linha => linha.join('')).join('\n');
}

function inimigos() {

}

function mostrarImpacto() {
    imagemImpacto.style.display = 'block'; // Mostra a imagem
    
    // Esconde a imagem após 1.5 segundos (1500 milissegundos)
    setTimeout(() => {
        imagemImpacto.style.display = 'none';
    }, 1500);
}

/**
 * Processa a entrada do jogador e atualiza o estado do jogo.
 */

function processarInput(evento) {
    if (evento.key !== 'Enter') return;

    const comando = playerInput.value.trim().toUpperCase();
    playerInput.value = ''; // Limpa o campo de texto

    let novoX = jogador.x;
    let novoY = jogador.y;

    if (comando === 'W') novoY--;
    else if (comando === 'S') novoY++;
    else if (comando === 'A') novoX--;
    else if (comando === 'D') novoX++;
    else if (comando === 'Q') {
        alert("Você saiu do jogo.");
        iniciarJogo(); // Reinicia
        return;
    } else {
        alert('Valor inválido');
        processarInput();
    }

    // Verifica colisão com paredes
    if (mapa[novoY][novoX] !== PAREDE) {
        jogador.x = novoX;
        jogador.y = novoY;
    } else {
        // Pode adicionar uma mensagem de "bateu na parede"
        mostrarImpacto();
    }

    // Verifica se pegou a chave
    if (jogador.x === chavePos.x && jogador.y === chavePos.y && !jogador.temChave) {
        jogador.temChave = true;
        // Opcional: pode adicionar uma mensagem de "chave coletada"
    }

    // Verifica condição de vitória
    if (jogador.x === saidaPos.x && jogador.y === saidaPos.y && jogador.temChave) {
        alert("Parabéns! Você encontrou a saída e escapou do labirinto!");
        iniciarJogo(); // Reinicia para um novo mapa
        return;
    }

    desenharMapa(); // Redesenha o mapa após cada movimento
}

/**
 * Função principal para iniciar o jogo.
 */
function iniciarJogo() {
    console.log("Iniciando novo jogo...");
    jogador.temChave = false;
    gerarMapa();
    popularMapa();
    desenharMapa();
    playerInput.focus(); // Foca no campo de texto para o jogador
}

// --- Inicialização ---
playerInput.addEventListener('keydown', processarInput);
iniciarJogo();

