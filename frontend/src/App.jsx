import axios from "axios";
import React, { useEffect, useState } from "react";
import DateSelector from "./components/DateSelector";
import PlayerForm from "./components/PlayerForm";
import RankingTable from "./components/RankingTable";
import "./styles.css";

function App() {
  const [ranking, setRanking] = useState([]);
  const [currentDate, setCurrentDate] = useState(null);
  const [allDates, setAllDates] = useState([]);

  // Carregar dados iniciais
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const datesResponse = await axios.get(
          "http://localhost:5000/api/dates"
        );
        setAllDates(datesResponse.data);
        if (datesResponse.data.length > 0) {
          setCurrentDate(datesResponse.data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar datas:", error);
      }
    };
    fetchInitialData();
  }, []);

  // Atualizar ranking quando a data mudar
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
  }, [currentDate]);

  // Atualizar lista de datas após novo registro
  const refreshDates = async () => {
    try {
      const datesResponse = await axios.get("http://localhost:5000/api/dates");
      setAllDates(datesResponse.data);
    } catch (error) {
      console.error("Erro ao atualizar datas:", error);
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
        <PlayerForm
          onSuccess={(newDate) => {
            refreshDates();
            setCurrentDate(newDate);
          }}
        />
      </div>

      <RankingTable data={ranking} currentDate={currentDate} />
    </div>
  );
}

export default App;
