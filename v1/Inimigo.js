class Inimigo {
  constructor(nome, tipo, vida, dano, loot = [], escudo = 0) {
    this.nome = nome;
    this.tipo = tipo;
    this.vida = vida;
    this.dano = dano;
    this.loot = loot;
    this.escudo = escudo;
  }

  atacar(personagem) {
    const danoFinal = this.dano + Math.floor(Math.random() * 3);
    console.log(`⚔️ ${this.nome} ataca e tenta causar ${danoFinal} de dano!`);
    return danoFinal;
  }

  defender(dano) {
    const danoReduzido = Math.max(dano - this.escudo, 0);
    this.vida -= danoReduzido;
    return danoReduzido;
  }
}

module.exports = Inimigo;
