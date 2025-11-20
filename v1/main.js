// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📜 REINO DE YVETH - JOGO DE TEXTO INTERATIVO
// Feito em Node.js. Cada escolha, atributo e ação influencia o desenrolar da história.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 🔹 Importação de módulos necessários
const fs = require("fs");                      
const readline = require("readline-sync");     
const Personagem = require("./Personagem");    
const Inimigo = require("./Inimigo");          

// 🔹 Carrega o arquivo historia.json
const historia = JSON.parse(fs.readFileSync("./historia.json", "utf-8"));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧱 Função para desenhar linhas visuais
function linha() {
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎮 Escolha de personagem
function escolherPersonagem() {
  linha();
  console.log("⚔️  BEM-VINDO AO REINO DE YVETH ⚔️");
  console.log("🌌 Uma terra de magia antiga, aço e coragem sem limites...\n");

  console.log("🌟 Escolha a raça do seu herói:\n");
  console.log("1️⃣  🪓 Ork – Força: 5 | Agilidade: 1 | Destreza: 1 | Inteligência: 0 | Sorte: 1");
  console.log("2️⃣  🏹 Elfo – Força: 1 | Agilidade: 1 | Destreza: 1 | Inteligência: 4 | Sorte: 1");
  console.log("3️⃣  🗡️ Goblin – Força: 2 | Agilidade: 3 | Destreza: 2 | Inteligência: 2 | Sorte: 2");
  console.log("4️⃣  🩸 Vampiro – Força: 2 | Agilidade: 2 | Destreza: 2 | Inteligência: 2 | Sorte: 2");

  let escolha;
  do {
    escolha = readline.question("\n⚔️ Escolha sua raça (1-4): ");
  } while (!["1","2","3","4"].includes(escolha));

  let especie = "", atributos = {};

  switch (escolha) {
    case "1": especie = "Ork"; atributos = { forca:5, agilidade:1, destreza:1, inteligencia:0, sorte:1 }; break;
    case "2": especie = "Elfo"; atributos = { forca:1, agilidade:1, destreza:1, inteligencia:4, sorte:1 }; break;
    case "3": especie = "Goblin"; atributos = { forca:2, agilidade:3, destreza:2, inteligencia:2, sorte:2 }; break;
    case "4": especie = "Vampiro"; atributos = { forca:2, agilidade:2, destreza:2, inteligencia:2, sorte:2 }; break;
  }

  linha();
  console.log("✨ Agora, distribua seus 10 pontos de habilidade...\n");
  const adicionais = distribuirPontos();

  for (const chave in adicionais) atributos[chave] += adicionais[chave];

  const nome = readline.question("\n🧙 Digite o nome do seu Personagem: ");
  linha();
  console.log(`🌠 Bem-vindo(a), ${nome} — o(a) ${especie} destemido(a)!`);
  console.log("🌌 Que os ventos do destino guiem seus passos...\n");

  return new Personagem(
    nome,
    especie,
    atributos.forca,
    atributos.agilidade,
    atributos.destreza,
    atributos.inteligencia,
    atributos.sorte
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💪 Distribuir pontos adicionais
function distribuirPontos() {
  let pontos = 10;
  const atributos = { forca:0, agilidade:0, destreza:0, inteligencia:0, sorte:0 };

  while(pontos>0) {
    console.log(`\n🔥 Pontos restantes: ${pontos}`);
    for (const [key,val] of Object.entries(atributos)) console.log(`• ${key}: ${val}`);

    const escolha = readline.question("\n⚡ Escolha um atributo para aprimorar: ").trim().toLowerCase();

    if (atributos[escolha] !== undefined && atributos[escolha]<4) {
      atributos[escolha]++;
      pontos--;
    } else {
      console.log("⚠️ Escolha inválida ou limite de 4 pontos já atingido!");
    }
  }
  return atributos;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧭 Jornada principal
function jornada(personagem, cenaAtual = historia.inicio) {
  linha();
  console.log(`📜 ${cenaAtual.introducao}`);
  linha();

  const escolhas = Object.keys(cenaAtual.opcoes);
  console.log("🧭 O que deseja fazer?\n");
  escolhas.forEach(num => console.log(` ${num}. ${cenaAtual.opcoes[num].titulo}`));

  const escolha = readline.question("\n➡️ Escolha: ");
  const opcao = cenaAtual.opcoes[escolha];

  if (!opcao) {
    console.log("⚠️ Escolha inválida! Tente novamente.");
    return jornada(personagem, cenaAtual);
  }

  linha();
  console.log(`🗺️ ${opcao.descricao}`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🎲 Sistema de encontros
  let baseChance = 50;
  if (cenaAtual.id === "caverna") baseChance = 90; // caverna garante quase sempre inimigo
  const chanceFinal = calcularChanceDeEncontro(personagem, baseChance);
  const rolagem = Math.random() * 100;

  const encontro = (rolagem <= chanceFinal) || cenaAtual.id === "caverna";

  if (encontro) {
    // inimigo único
    if (opcao.inimigo) {
      const i = opcao.inimigo;
      const inimigo = new Inimigo(i.nome,i.tipo,i.vida,i.dano,i.loot,i.escudo);
      console.log(`\n💀 Um ${inimigo.tipo} aparece diante de você!`);
      if(!batalha(personagem,inimigo)) return;
    }

    // múltiplos inimigos
    if (opcao.inimigos) {
      for(const i of opcao.inimigos){
        const inimigo = new Inimigo(i.nome,i.tipo,i.vida,i.dano,i.loot,i.escudo);
        console.log(`\n⚔️ ${inimigo.nome} salta das sombras!`);
        if(!batalha(personagem,inimigo)) return;
      }
      linha();
      if(opcao.final?.mensagem) console.log(`🌅 ${opcao.final.mensagem}`);
    }
  } else {
    console.log("🌤️ Nenhum inimigo aparece desta vez. Você segue seu caminho com cautela.");
  }

  // Teste de sorte
  if (personagem.testeDesorte?.(40)) {
    console.log("🍀 Sua sorte brilha — você encontra algo brilhante no chão!");
    personagem.itens.push("Pedra Mística");
  }

  // Próxima cena ou volta ao início
  if(opcao.proximaCena && historia[opcao.proximaCena]){
    jornada(personagem, historia[opcao.proximaCena]);
  } else {
    linha();
    console.log("🏁 Você retorna ao início da aventura...");
    jornada(personagem, historia.inicio);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚖️ Chance de encontro
function calcularChanceDeEncontro(personagem, chanceBase){
  let chance = chanceBase;
  chance -= personagem.sorte*5;
  chance -= personagem.agilidade*3;
  chance -= personagem.inteligencia*2;
  chance += personagem.forca*4;

  if(chance<5) chance=5;
  if(chance>95) chance=95;
  console.log(`🎲 Chance de encontro de inimigos: ${chance.toFixed(1)}%`);
  return chance;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚔️ Batalha
function batalha(personagem, inimigo){
  linha();
  console.log(`⚔️ BATALHA CONTRA: ${inimigo.nome} (${inimigo.tipo}) ⚔️`);
  linha();

  while(inimigo.vida>0 && personagem.vida>0){
    const acao = readline.question("\n💥 Escolha sua ação:\n1. Atacar\n2. Usar poção\n3. Defender\n➡️ Escolha: ");

    if(acao==="1"){
      const dano = personagem.atacar(inimigo);
      const danoFinal = inimigo.defender(dano);
      console.log(`\n🗡️ Você ataca e causa ${danoFinal} de dano em ${inimigo.nome}!`);
    } else if(acao==="2"){
      console.log(`🧴 ${personagem.usarPocao()}`);
    } else if(acao==="3"){
      console.log(`\n🛡️ Você usa o escudo e reduz o dano do próximo ataque!`);
      const danoInimigo = inimigo.atacar(personagem);
      personagem.defender(danoInimigo);
      console.log(personagem.mostrarStatus());
      continue;
    } else {
      console.log("⚠️ Ação inválida!");
      continue;
    }

    if(inimigo.vida>0){
      const danoInimigo = inimigo.atacar(personagem);
      personagem.defender(danoInimigo);
    }

    console.log(personagem.mostrarStatus());

    if(inimigo.vida<=0){
      linha();
      console.log(`🏆 ${inimigo.nome} foi derrotado!`);
      personagem.itens.push(inimigo.loot[0]);
      console.log(`🎁 Você encontrou: ${inimigo.loot[0]}`);
      return true;
    }

    if(personagem.vida<=0){
      linha();
      console.log("☠️ Você cai em batalha... sua lenda ecoará nas brumas de Yveth.");
      return false;
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🏁 Main
function main(){
  console.clear();
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("⚔️  REINO DE YVETH  ⚔️");
  console.log("🌙 Onde cada decisão molda o destino do seu herói...");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const personagem = escolherPersonagem();
  jornada(personagem);
}

// 🚀 Executa o jogo
main();
