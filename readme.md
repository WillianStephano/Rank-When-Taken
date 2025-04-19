# 🏆 WhenTaken Rank - Sistema de Classificação Diária

![Preview da Interface](https://via.placeholder.com/800x400?text=Ranking+Diário+WhenTaken)

Sistema para registrar e visualizar rankings diários do jogo [WhenTaken](https://whentaken.com/), com armazenamento de histórico completo e análise de desempenho.
Joque com seus amigos, copie e cole o resultado e visualize o rank diario das partidas!

## O que é o WhenTaken?
WhenTaken é um jogo desenvolvido pela Teuteuf Games em que o desafio é adivinhar quando e onde uma determinada foto foi tirada. A cada palpite, o jogador acumula pontos com base na precisão de sua resposta

## ✨ Principais Funcionalidades

- Visualize o ranking do dia com os melhores scores;
- Acesse resultados de qualquer data armazenada;
- Sistema de cadastro automatizado;
- Veja detalhes de cada partida: distância, anos e pontuação de medalhas;
- Nome do jogador obrigatório para registro claro dos resultados;


## 🛠️ Tecnologias

- **Frontend**: React, CSS;
- **Backend**: NodeJS, Express;
- **Armazenamento** : Json;

## 📦 Pré-requisitos

- Node.js 18+
- NPM 9+

## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/whentaken-rank.git
cd whentaken-rank

# Instale e inicie o backend
cd backend
npm install
node server.js

# Em outro terminal, instale e inicie o frontend
cd ../frontend
npm install
npm start