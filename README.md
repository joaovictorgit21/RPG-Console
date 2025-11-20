## 🏰 Reino de Yveth - Jogo de Texto Interativo

####
Descrição:
Jogo de aventura em terminal feito em Node.js. O jogador cria um herói, distribui pontos de atributos, explora locais e enfrenta inimigos. Cada escolha influencia o desenrolar da história.
<br>
<br>

## ⚙️ Requisitos

* Node.js >= 18
* Sistema operacional com terminal/console

<br>

## 📂 Estrutura do Projeto

```bash
/reino-de-yveth
│
├─ main.js              # Arquivo principal do jogo
├─ Personagem.js        # Classe do herói e atributos
├─ Inimigo.js           # Classe dos inimigos
├─ historia.json        # Arquivo JSON com a narrativa
└─ README.md            # Este arquivo
```
<br>
<br>
## Tecnologias Utilizadas

| Tipo | Tecnologia |
|------|------------|
| 💻 Script | Javscript |
| 🎮 controle de versão | GitHub |
| 👨‍💻 Versionamento de código | Git |
| ⚡ Runtime | Node |


## 🚀 Como Executar

<ol>
    <li>Abra o terminal na pasta do projeto.</li>
    <li>Instale dependências (apenas readline-sync é necessária):</li>

```bash
npm install readline-sync
```
<li>Execute o jogo:</li>

```bash
    node main.js
```

<li>Siga as instruções no console para criar seu personagem e explorar o mundo.</li>
</ol>

<br>

## 🛠 Como Funciona

<ol>
<li>Escolha do Personagem:</li>

####

* Escolha uma raça (Ork, Elfo, Goblin, Vampiro).

* Distribua 10 pontos adicionais entre Força, Agilidade, Destreza, Inteligência e Sorte.

* Digite o nome do herói.


<li>Exploração:</li>

####

* O jogador escolhe opções apresentadas pelo jogo.

* A chance de encontrar inimigos depende dos atributos do personagem.

* Em locais como a caverna, encontros são garantidos.

<li>Batalhas:</li>

####

* Opções de ação: Atacar, Usar Poção, Defender.

* O escudo do personagem reduz dano do inimigo.

* O loot dos inimigos é adicionado automaticamente ao inventário.



<li>Jornada Contínua:</li>

####

* Se não houver próxima cena, o jogo retorna ao início.

* O jogador pode continuar explorando e batalhando.

</ol>

<br>

# 👨‍💻 Programador

## João Victor Farias

<br>

# Criadores da História

## Danilo Odelon

## Laura