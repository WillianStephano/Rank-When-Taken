import React, { useState } from "react";
import axios from "axios";

const parseInput = (text) => {
  try {
    const lines = text
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");

    // Extração do nome
    const nameLine =
      lines.find((line) => line.includes(" scored ")) || lines[0];
    const name =
      nameLine
        .split(" scored ")[0]
        .replace("#WhenTaken", "")
        .replace(/#\d+/, "")
        .trim() || "Jogador";

    // Extração da pontuação total
    const totalScoreLine =
      lines.find((line) => line.includes(" scored ")) || lines[1];
    const totalScore = parseInt(totalScoreLine.match(/\d+/)[0]) || 0;

    // Extração dos detalhes
    const details = lines
      .filter((line) => line.includes("📍"))
      .slice(0, 5)
      .map((line) => {
        const parts = line.split(" - ");
        return {
          distance:
            parseFloat(parts[0].match(/[\d.]+/)[0]) *
            (parts[0].includes("K") ? 1000 : 1),
          years: parseInt(parts[1].match(/\d+/)[0]) || 0,
          medal: parts[2].slice(0, 2),
          medalScore: parseInt(parts[2].match(/\d+/)[0]) || 0,
        };
      });

    return {
      name,
      totalScore,
      details,
    };
  } catch (error) {
    console.error("Erro no parsing:", error);
    throw new Error("Formato inválido");
  }
};

export default function PlayerForm({ onSuccess }) {
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    try {
      const playerData = parseInput(input);
      await axios.post("http://localhost:5000/api/results", playerData);
      setInput("");
      onSuccess();
    } catch (error) {
      alert("Erro ao processar dados. Verifique o formato!");
    }
  };

  return (
    <div className="form-container">
      <h2>Adicionar Resultado</h2>
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
