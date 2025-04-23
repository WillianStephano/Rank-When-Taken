// frontend/src/components/DateSelector.jsx
import React, { useEffect, useState } from "react";
import { getDates } from "../services/firestore"; // Você precisará criar esta função

export default function DateSelector({ onDateChange }) {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const loadDates = async () => {
      const datesList = await getDates(); // Implemente esta função
      setDates(datesList);
      if (datesList.length > 0) {
        setSelectedDate(datesList[0]);
        onDateChange(datesList[0]);
      }
    };
    loadDates();
  }, []);

  return (
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
  );
}
