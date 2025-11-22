const personagem = { 
  x: 0,
  y: 0,
  vida: 50,
  vidaMax: 200,
  ataque: 15,
  defesa: 6,
  ouro: 0,
  inventario: []
};

const personagemSimbolo = "👤";

const chao = "⬛";
const parede = "🧱";
const chave = "🔑";
const porta = "🚪";
let pegouChave = false;
const eventoAleatorio = "❓";

const fs = require("fs");
const bancoDeDados = JSON.parse(fs.readFileSync("./eventos.json", "utf8"));

function gerarMapa(tamanho = 10) {
  const mapa = [];
  for (let y = 0; y < tamanho; y++) {
    mapa[y] = [];
    for (let x = 0; x < tamanho; x++) {
      const r = Math.random();
      if (r < 0.10) mapa[y][x] = parede;
      else if (r < 0.15) mapa[y][x] = eventoAleatorio;
      else mapa[y][x] = chao;
    }
  }

  mapa[rand(tamanho)][rand(tamanho)] = chave;
  mapa[rand(tamanho)][rand(tamanho)] = porta;

  return mapa;
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

let mapa = gerarMapa(32);

function mostrarMapa() {
  const copia = mapa.map((linha, y) =>
    linha.map((c, x) => (x === personagem.x && y === personagem.y ? personagemSimbolo : c)).join(" ")
  );
  console.log(copia.join("\n"));
}

function mover(direcao) {
    let novoX = personagem.x;
    let novoY = personagem.y;

    if (direcao === "w") {
        novoY--; 
        console.clear();
    }
    if (direcao === "s") {
        novoY++; 
        console.clear();
    }
    if (direcao === "a") {
        novoX--; 
        console.clear();
    }
    if (direcao === "d") {
        novoX++; 
        console.clear();
    }

    if (!mapa[novoY] || !mapa[novoY][novoX] || mapa[novoY][novoX] === parede) {
        showJumpscare();
        return;
    }

    if (!mapa[novoY] || !mapa[novoY][novoX] || mapa[novoY][novoX] === chave) {
        console.log("🔑 Você pegou a chave!")
        pegouChave = true;

        mapa[novoY][novoX] = chao;

        setTimeout(() => {
            console.clear();        
            loop();
        }, 1200);
        return;
    }

    if (!mapa[novoY] || !mapa[novoY][novoX] || mapa[novoY][novoX] === porta) {
        if (pegouChave) {
            console.log("🚪 Você abriu a porta e venceu o jogo! Parabéns!")
            process.exit()
            } else {
                console.log("🚪 A porta está trancada. Encontre a chave primeiro.");
                console.clear();        
                loop();
                return;
            }
    }

    personagem.x = novoX;
    personagem.y = novoY;

    interagir(mapa[novoY][novoX]);

    if (!mapa[novoY] || !mapa[novoY][novoX] || mapa[novoY][novoX] === eventoAleatorio) {
        interagir(eventoAleatorio);
        return true;
    }

    return true;
}

function showJumpscare() {
    console.clear();
    console.log("💥 BATEU NA PAREDE! CUIDADO! 💥");
    setTimeout(() => {
        console.clear();        
        loop();
    }, 1200);
}

function interagir(celula) {
  if (celula !== eventoAleatorio) return;

  const chance = Math.random();

  if (chance < 0.50) {
    const item = bancoDeDados.itens[rand(bancoDeDados.itens.length)];
    console.log("🎁 Você encontrou um item:", item.nome);
    aplicarItem(item);
  } else {
    dispararEvento();
  }

  mapa[personagem.y][personagem.x] = chao;
}

function dispararEvento() {
  const r = rand(2);

  if (r === 0) {

    const inimigos = [
        ...bancoDeDados.inimigos.inimigosLagartos,
        ...bancoDeDados.inimigos.inimigosMercenarios
    ];

    const inimigo = inimigos[rand(inimigos.length)];

    console.log(`⚠ Inimigo encontrado: ${inimigo.nome} (Vida: ${inimigo.vida})`);

    iniciarBatalha(structuredClone(inimigo)); 

    } else {
        console.log("📦 Você encontrou loot!");
    }
} 


function iniciarBatalha(inimigo) {
  console.log("\n===== 🗡 BATALHA INICIADA 🗡 =====");

  while (personagem.vida > 0 && inimigo.vida > 0) {

    const danoJogador = Math.max(1, personagem.ataque - inimigo.escudo);
    inimigo.vida -= danoJogador;
    console.log(`👤 Você causou ${danoJogador} de dano! Vida do inimigo: ${inimigo.vida}`);

    if (inimigo.vida <= 0) break;

    const danoInimigo = Math.max(1, inimigo.dano - personagem.defesa);
    personagem.vida -= danoInimigo;
    console.log(`⚔ ${inimigo.nome} causou ${danoInimigo} de dano! Sua vida: ${personagem.vida}`);

    if (personagem.vida <= 0) break;
  }

  if (personagem.vida <= 0) {
    console.log("💀 Você morreu! Game Over!");
    console.log("===== FIM DA BATALHA =====\n");
    console.log(statusPersonagem());
    process.exit();
  }

  console.log(`🎉 Você derrotou ${inimigo.nome}!`);

  if (inimigo.loot?.length > 0) {
    const drop = inimigo.loot[0];
    console.log(`📦 Loot obtido: ${drop}`);
    personagem.inventario.push(drop);
  }
}


function aplicarItem(item) {

  if (item.tipo === "consumível") {
    const cura = Number(item.efeito.replace("+", "").replace(" vida", ""));
    personagem.vida = Math.min(personagem.vida + cura, personagem.vidaMax);
    console.log(`💖 Você recuperou ${cura} de vida!`);
    console.log(`Vida atual: ${personagem.vida}/${personagem.vidaMax}`);
    return;
  }

  if (item.tipo === "moeda") {
    const ganho = Number(item.efeito.replace("+", "").replace(" ouro", ""));
    personagem.ouro += ganho;
    console.log(`🪙 Você ganhou ${ganho} de ouro! Total: ${personagem.ouro}`);
    return;
  }

  if (item.tipo === "tesouro") {
    const ganho = Math.floor(Math.random() * 50) + 50;
    personagem.ouro += ganho;
    console.log(`💎 Você encontrou um tesouro valioso (+${ganho} ouro)! Total: ${personagem.ouro}`);
    return;
  }

  if (item.tipo === "arma") {
    personagem.ataque += item.ataque;
    console.log(`⚔ Você equipou ${item.nome}! Ataque +${item.ataque}`);
    console.log(`Ataque total: ${personagem.ataque}`);
    personagem.inventario.push(item.nome);
    return;
  }

  if (item.tipo === "armadura") {
    personagem.defesa += item.defesa;
    console.log(`🛡 Você equipou ${item.nome}! Defesa +${item.defesa}`);
    console.log(`Defesa total: ${personagem.defesa}`);
    personagem.inventario.push(item.nome);
    return;
  }

  if (item.tipo === "material") {
    console.log(`📦 Material obtido: ${item.nome}`);
    personagem.inventario.push(item.nome);
    return;
  }

  personagem.inventario.push(item.nome);
}

function statusPersonagem() {
    return `👤 Vida: ${personagem.vida}/${personagem.vidaMax} | Ataque: ${personagem.ataque} | Defesa: ${personagem.defesa} | Ouro: ${personagem.ouro} | Inventário: [${personagem.inventario.join(', ')}]`;
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

function loop() {
  mostrarMapa();
  console.log(statusPersonagem());

    readline.question("W/A/S/D para mover: ", input => {
        const tecla = input.trim().toLowerCase()[0]; // pega só a 1ª letra

        if (!["w", "a", "s", "d"].includes(tecla)) {
        console.log("Use apenas W, A, S ou D!");
        return loop();
        }

        const continuar = mover(tecla);
        if (continuar) loop();
    });
}

loop();