import React from "react";

export default function DateSelector({ dates, currentDate, onDateChange }) {
  return (
    <div className="date-selector">
      <select
        value={currentDate || ""}
        onChange={(e) => onDateChange(e.target.value)}
        disabled={!dates.length}
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
