// --- Jogo Simplificado com Sistema de Loot e Itens ---

const fs = require('fs');

// Carregar dados externos
const dadosInimigos = JSON.parse(fs.readFileSync('inimigos.json', 'utf-8'));
const listaInimigos = dadosInimigos.inimigos;

const dadosItens = JSON.parse(fs.readFileSync('itens.json', 'utf-8'));
const listaItens = dadosItens.itens;

// Variáveis principais
const personagem = {
    x: 0,
    y: 0,
    vida: 100,
    ataque: 10,
    inventario: []
};

let direcaoAtual = Math.random();

// --------------------------------------------------------------------------
// MAPA PROCEDURAL
// --------------------------------------------------------------------------
function gerarMapa(linhas, colunas) {
    const mapa = [];
    for (let i = 0; i < linhas; i++) {
        const linha = [];
        for (let j = 0; j < colunas; j++) {
            if (Math.random() < 0.2) linha.push('#');
            else linha.push('.');
        }
        mapa.push(linha);
    }
    return mapa;
}

function imprimirMapa(gerarMapa, linhas, colunas) {
    const mapa = gerarMapa(linhas, colunas);
    for (const linha of mapa) console.log(linha.join(' '));
}


// --------------------------------------------------------------------------
// MOVIMENTAÇÃO
// --------------------------------------------------------------------------
function moverPersonagem(direcao) {
    switch (direcao) {
        case 'cima': personagem.y = Math.max(0, personagem.y - 1); break;
        case 'baixo': personagem.y = Math.min(31, personagem.y + 1); break;
        case 'esquerda': personagem.x = Math.max(0, personagem.x - 1); break;
        case 'direita': personagem.x = Math.min(31, personagem.x + 1); break;
    }
}


// --------------------------------------------------------------------------
// EVENTOS ALEATÓRIOS (INIMIGOS / ITENS / NADA)
// --------------------------------------------------------------------------
function eventosAleatorios() {
    const evento = Math.random();

    if (evento < 0.3) {
        console.log('❗ Você encontrou um inimigo!');
        batalhar();
    }
    else if (evento < 0.6) {
        console.log('✨ Você encontrou um item!');
        coletarItem();
    }
    else {
        console.log('... Nada aconteceu.');
        moverPersonagem(direcaoAtual);
    }
}


// --------------------------------------------------------------------------
// BATALHA
// --------------------------------------------------------------------------
function batalhar() {
    const inimigo = listaInimigos[Math.floor(Math.random() * listaInimigos.length)];
    const inimigoAtual = { ...inimigo };

    console.log(`\n💀 Inimigo encontrado: ${inimigoAtual.nome}`);
    console.log(`➡️ Vida: ${inimigoAtual.vida} | Dano: ${inimigoAtual.dano}\n`);

    while (personagem.vida > 0 && inimigoAtual.vida > 0) {

        // Jogador ataca
        inimigoAtual.vida -= personagem.ataque;
        console.log(`🐵 Você causou ${personagem.ataque} de dano!`);

        if (inimigoAtual.vida <= 0) {
            console.log(`\n✅ Você derrotou ${inimigoAtual.nome}!`);
            coletarLoot(inimigoAtual);
            return;
        }

        // Inimigo ataca
        personagem.vida -= inimigoAtual.dano;
        console.log(`🔻 ${inimigoAtual.nome} causou ${inimigoAtual.dano} de dano!`);

        if (personagem.vida <= 0) {
            console.log("💀 Você morreu...");
            return;
        }
    }
}


// --------------------------------------------------------------------------
// LOOT DO INIMIGO
// --------------------------------------------------------------------------
function coletarLoot(inimigo) {
    const loot = inimigo.loot;

    if (!loot || loot.length === 0) {
        console.log("O inimigo não tinha nada...");
        return;
    }

    console.log(`🎁 Loot obtido: ${loot.join(', ')}`);

    loot.forEach(itemNome => {
        personagem.inventario.push(itemNome);
    });

    console.log("📦 Inventário atual:", personagem.inventario);
}


// --------------------------------------------------------------------------
// COLETAR ITENS DO MAPA
// --------------------------------------------------------------------------
function coletarItem() {
    const item = listaItens[Math.floor(Math.random() * listaItens.length)];

    personagem.inventario.push(item.nome);

    console.log(`🪙 Você encontrou: ${item.nome}`);
    console.log("📦 Inventário atual:", personagem.inventario);
}


// --------------------------------------------------------------------------
// RODAR TESTE
// --------------------------------------------------------------------------
imprimirMapa(gerarMapa, 32, 32);