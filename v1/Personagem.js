// Personagem.js
class Personagem {
  constructor(nome, especie, forca, agilidade, destreza, inteligencia, sorte) {
    this.nome = nome;
    this.especie = especie;
    this.forca = forca;
    this.agilidade = agilidade;
    this.destreza = destreza;
    this.inteligencia = inteligencia;
    this.sorte = sorte;
    this.vida = 50;   // Vida inicial
    this.itens = [];    // Inventário
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MÉTODO: atacar()
  // Calcula o dano baseado nos atributos do personagem
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  atacar(inimigo) {
    let dano = this.forca * 2 + this.destreza;
    return dano;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MÉTODO: defender()
  // Reduz a vida do personagem conforme dano recebido
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  defender(dano) {
    const danoFinal = dano - Math.floor(this.agilidade / 2);
    this.vida -= danoFinal > 0 ? danoFinal : 0;
    return danoFinal;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MÉTODO: usarPocao()
  // Restaura parte da vida
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  usarPocao() {
    const cura = 20;
    this.vida += cura;
    if (this.vida > 50) this.vida = 50;
    return `Você usou uma poção e recuperou ${cura} de vida!`;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MÉTODO: mostrarStatus()
  // Exibe a vida e atributos do personagem
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  mostrarStatus() {
    return `💖 Vida: ${this.vida} | 🗡️ Força: ${this.forca} | 🏃 Agilidade: ${this.agilidade} | 🎯 Destreza: ${this.destreza} | 🧠 Inteligência: ${this.inteligencia} | 🍀 Sorte: ${this.sorte}`;
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MÉTODO: testeDeSorte(chanceBase)
  // Retorna true ou false baseado na sorte do personagem
  // chanceBase = base de sucesso (%)
  // Cada ponto de sorte adiciona 5% à chance
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  testeDeSorte(chanceBase) {
    const chanceTotal = chanceBase + this.sorte * 5;
    const rolagem = Math.random() * 100;
    return rolagem <= chanceTotal;
  }
}

module.exports = Personagem;
