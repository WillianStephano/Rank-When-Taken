import axios from "axios";
import React, { useEffect, useState } from "react"; // Adicionei o useEffect
import DateSelector from "./components/DateSelector";
import PlayerForm from "./components/PlayerForm";
import RankingTable from "./components/RankingTable";
import "./styles.css";

function App() {
  const [ranking, setRanking] = useState([]);
  const [currentDate, setCurrentDate] = useState(null); // Alterei para null

  // useEffect para carregar dados inicialmente
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const datesResponse = await axios.get(
          "http://localhost:5000/api/dates"
        );
        if (datesResponse.data.length > 0) {
          setCurrentDate(datesResponse.data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar datas:", error);
      }
    };

    fetchInitialData();
  }, []);

  // useEffect para atualizar quando currentDate mudar
  useEffect(() => {
    const refreshRanking = async () => {
      if (!currentDate) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/api/results/${currentDate}`
        );
        setRanking(response.data);
      } catch (error) {
        console.error("Erro ao buscar ranking:", error);
      }
    };

    refreshRanking();
  }, [currentDate]); // Só executa quando currentDate mudar

  return (
    <div className="container">
      <h1>WhenTaken Ranking</h1>

      <div className="header-section">
        <DateSelector
          onDateChange={(date) => setCurrentDate(date)} // Simplificado
        />
        <PlayerForm
          onSuccess={() => {
            if (currentDate) {
              axios
                .get(`http://localhost:5000/api/results/${currentDate}`)
                .then((res) => setRanking(res.data))
                .catch(console.error);
            }
          }}
        />
      </div>

      <RankingTable data={ranking} currentDate={currentDate} />
    </div>
  );
}

export default App;
