# Jogo de Labirinto Procedural - APS

Este projeto é uma expansão da APS, implementando um jogo de navegação em um mapa 2D gerado proceduralmente. O jogador deve encontrar uma chave para abrir a porta de saída e escapar do labirinto.

## Integrantes do Grupo

*   Nome do Aluno 1 - RA
*   Nome do Aluno 2 - RA
*   Nome do Aluno 3 - RA
    *(Adicione todos os membros do grupo aqui)*

## Como Executar o Projeto

### Requisitos

*   **Python 3.x** instalado em seu sistema.

Não é necessário instalar nenhuma biblioteca externa, pois usamos apenas as bibliotecas padrão `random` e `os`.

### Passos para Execução

1.  **Clone ou baixe o repositório.**
    Se estiver usando Git:
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd [NOME_DA_PASTA]
    ```
    Ou simplesmente baixe o arquivo `jogo_aps.py`.

2.  **Execute o arquivo Python pelo terminal.**
    Abra um terminal ou prompt de comando, navegue até a pasta onde o arquivo está salvo e execute o seguinte comando:
    ```bash
    python jogo_aps.py
    ```
    *(ou `python3 jogo_aps.py` dependendo da sua configuração)*

3.  **Jogue!**
    *   Use as teclas **W, A, S, D** e depois pressione **Enter** para mover seu personagem (`☺`).
    *   O objetivo é pegar a chave (`K`) para desbloquear a saída (`E`, que se tornará `S`).
    *   Você não pode atravessar as paredes (`█`).
    *   Para sair do jogo a qualquer momento, digite **Q** e pressione **Enter**.

## Funcionalidades Implementadas

1.  **Fator Aleatório (`random`):**
    *   O mapa é gerado proceduralmente a cada execução, criando uma experiência única. O algoritmo "esculpe" salas e corredores aleatórios, garantindo que sempre haja um caminho.
    *   A posição inicial do jogador, da chave e da saída são sorteadas em locais válidos (não dentro de paredes).

2.  **Requisitos de Navegação:**
    *   O jogador pode se mover nas quatro direções (cima, baixo, esquerda, direita).
    *   O código verifica a próxima posição do jogador. Se for uma parede, o movimento é bloqueado e uma mensagem é exibida.

3.  **Criatividade:**
    *   **Geração Procedural:** Em vez de um mapa estático, o jogo cria um "mundo" novo a cada partida, similar ao conceito de mundos de *Minecraft*.
    *   **Mecânica de Chave e Porta:** Foi adicionado um objetivo claro (encontrar a chave) que adiciona um desafio extra e um senso de progressão ao jogo.
    *   **Interface Limpa:** A tela é limpa a cada movimento para simular uma animação fluida, e as instruções são sempre visíveis.

