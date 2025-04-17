import React, { useState, useEffect } from "react";
import axios from "axios";
import PlayerForm from "./components/PlayerForm";
import RankingTable from "./components/RankingTable";
import "./styles.css";

function App() {
  const [ranking, setRanking] = useState([]);

  const refreshRanking = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/ranking");
      setRanking(response.data);
    } catch (error) {
      console.error("Erro ao buscar ranking:", error);
    }
  };

  useEffect(() => {
    refreshRanking();
  }, []);

  return (
    <div className="container">
      <h1>WhenTaken Ranking</h1>
      <PlayerForm onSuccess={refreshRanking} />
      <RankingTable data={ranking} />
    </div>
  );
}

export default App;
