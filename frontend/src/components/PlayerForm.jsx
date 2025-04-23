import React, { useState } from "react";
import { addGameResult } from "../services/firestore";

const parseInput = (text) => {
  const lines = text
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  // Verificação rigorosa da estrutura
  if (lines.length < 7) {
    throw new Error("Formato inválido: Número insuficiente de linhas");
  }

  // Extração segura da data
  const dateLine = lines[0];
  const dateMatch = dateLine.match(/\((\d{2}\.\d{2}\.\d{4})\)/);
  if (!dateMatch || !dateMatch[1]) {
    throw new Error("Formato de data inválido na primeira linha");
  }

  // Conversão segura da data
  const dateParts = dateMatch[1].split(".");
  if (dateParts.length !== 3) {
    throw new Error("Formato de data deve ser DD.MM.YYYY");
  }

  const [day, month, year] = dateParts;
  const gameDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

  // Validação da data
  const dateObj = new Date(gameDate);
  if (isNaN(dateObj.getTime())) {
    throw new Error(`Data inválida: ${gameDate}`);
  }

  // Extração segura do nome e pontuação
  const scoreLine = lines[1];
  if (!scoreLine.includes(" scored ")) {
    throw new Error("Formato inválido: Linha de pontuação ausente");
  }

  const [namePart, scorePart] = scoreLine.split(" scored ");
  const name = namePart.replace("#WhenTaken", "").trim();
  const totalScore = parseInt(scorePart.match(/\d+/)?.[0] || 0);

  // Validação dos detalhes
  const detailsLines = lines.slice(2, 7);
  if (detailsLines.length !== 5) {
    throw new Error("Deve haver exatamente 5 rounds");
  }

  const details = detailsLines.map((line, index) => {
    const parts = line.split(" - ");
    if (parts.length !== 3) {
      throw new Error(`Formato inválido no round ${index + 1}`);
    }

    // Extração segura da distância
    const distanceText = parts[0].split("📍")[1].trim(); // Exemplo: "942 km" ou "902 m"
    const distanceMatch = distanceText.match(/^([\d.]+)K?\s?(km|m)$/i); // Regex corrigida

    if (!distanceMatch) {
      throw new Error(`Formato de distância inválido: "${distanceText}"`);
    }

    const value = parseFloat(distanceMatch[1]);
    const unit = distanceMatch[2].toLowerCase();

    // Conversão correta para metros
    const distance =
      unit === "km"
        ? value * 1000 // Converte km para metros
        : value; // Mantém metros
    // Extração segura dos anos
    const years = parseInt(parts[1].match(/\d+/)?.[0] || 0);

    // Extração segura da medalha
    const medalMatch = parts[2].match(/(\p{Emoji})\D*(\d+)/u);
    if (!medalMatch) {
      throw new Error(`Formato de medalha inválido no round ${index + 1}`);
    }
    const medalScore = parseInt(medalMatch[2]);

    return {
      distance,
      years,
      medal: medalMatch[1],
      medalScore,
    };
  });

  return {
    gameDate,
    name,
    totalScore,
    details,
  };
};

export default function PlayerForm({ onSuccess }) {
  const [input, setInput] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = async () => {
    try {
      const playerData = parseInput(input);

      if (!playerName.trim()) {
        setNameError("Por favor, digite seu nome");
        return;
      }
      setNameError("");

      await addGameResult(playerData.gameDate, {
        ...playerData,
        name: playerName.trim(),
      });

      setInput("");
      setPlayerName("");
      onSuccess(playerData.gameDate);
    } catch (error) {
      alert(`Erro: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>Adicionar Resultado</h2>

      <div className="input-group">
        <label>Seu Nome: *</label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => {
            setPlayerName(e.target.value);
            if (nameError) setNameError(""); // Limpa erro ao digitar
          }}
          placeholder="Digite seu nome"
        />
        {nameError && <div className="error-message">{nameError}</div>}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Cole seu resultado completo aqui..."
        rows="7"
      />
      <button onClick={handleSubmit}>Enviar Resultado</button>
    </div>
  );
}
