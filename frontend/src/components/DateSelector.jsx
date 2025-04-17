import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DateSelector({ onDateChange }) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dates");
        setDates(response.data);
        if (response.data.length > 0) {
          setSelectedDate(response.data[0]);
          onDateChange(response.data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar datas:", error);
      }
    };

    fetchDates();
  }, [onDateChange]);

  return (
    <div className="date-selector">
      <select
        value={selectedDate}
        onChange={(e) => {
          setSelectedDate(e.target.value);
          onDateChange(e.target.value);
        }}
      >
        {dates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
}
