# 🏆 WhenTaken Rank - Sistema de Classificação Diária

![Preview da Interface](https://via.placeholder.com/800x400?text=Ranking+Diário+WhenTaken)

Sistema para registrar e visualizar rankings diários do jogo [WhenTaken](https://whentaken.com/), com armazenamento de histórico completo e análise de desempenho.
Joque com seus amigos, copie e cole o resultado e visualize o rank diario das partidas!
(Backend que utilizava express e o banco de dados local foi descontinuado, a aplicação atualmente utiliza apenas o conteudo da pasta "frontend")

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
- **Backend**: NodeJS 
- **Armazenamento** : Json;
(Backend que utilizava express e o banco de dados local foi descontinuado, a aplicação utiliza apenas o conteudo da pasta "frontend")

## 📦 Pré-requisitos

- Node.js 18+
- NPM 9+

## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/whentaken-rank.git
cd whentaken-rank

# Instale as dependências
cd frontend && npm install

# Configure as variáveis de ambiente
1. Crie um arquivo `firebaseConfig.js` na pasta frontend/src com:
REACT_APP_FIREBASE_API_KEY="SUA_API_KEY"
REACT_APP_FIREBASE_AUTH_DOMAIN="SEU_AUTH_DOMAIN"
REACT_APP_FIREBASE_PROJECT_ID="SEU_PROJECT_ID"
REACT_APP_FIREBASE_STORAGE_BUCKET="SEU_STORAGE_BUCKET"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="SEU_SENDER_ID"
REACT_APP_FIREBASE_APP_ID="SEU_APP_ID"

2. Configure o Firebase CLI:
firebase login
firebase projects:list # Verifique se o projeto aparece na lista

# Inicie o serviço
cd frontend && npm start

