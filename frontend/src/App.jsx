// Remover imports não utilizados (axios)
import { useEffect, useState } from "react";
import DateSelector from "./components/DateSelector";
import PlayerForm from "./components/PlayerForm";
import RankingTable from "./components/RankingTable";
import { getDailyRanking } from "./services/firestore";
import "./styles.css";

function App() {
  // Estados mantidos
  const [ranking, setRanking] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [allDates, setAllDates] = useState([]);

  // Função simplificada
  const loadRanking = async (date) => {
    try {
      const data = await getDailyRanking(date);
      setRanking(data);
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
      alert("Erro ao carregar dados do ranking");
    }
  };

  useEffect(() => {
    currentDate && loadRanking(currentDate);
  }, [currentDate]);

  // Função otimizada
  const handleNewResult = async (gameDate) => {
    try {
      setCurrentDate(gameDate);
      await loadRanking(gameDate);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  return (
    <div className="container">
      <h1>WhenTaken Ranking</h1>
      <div className="header-section">
        <DateSelector
          dates={allDates}
          currentDate={currentDate}
          onDateChange={setCurrentDate}
        />
        <PlayerForm onSuccess={handleNewResult} />
      </div>
      <RankingTable data={ranking} currentDate={currentDate} />
    </div>
  );
}

export default App;
