import React from "react";

export default function RankingTable({ data, currentDate }) {
  return (
    <div className="ranking-table">
      <h2>Ranking de {currentDate}</h2>
      <table>
        <thead>
          <tr>
            <th>Posição</th>
            <th>Jogador</th>
            <th>Pontuação</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player, index) => (
            <tr key={index} className="ranking-row">
              <td className="position">{index + 1}</td>
              <td className="player-name">{player.name}</td>
              <td className="total-score">{player.totalScore}</td>
              <td className="round-details">
                {player.details.map((detail, i) => {
                  const distance =
                    detail.distance >= 1000
                      ? `${(detail.distance / 1000).toFixed(1)} km`
                      : `${detail.distance.toFixed(0)} m`;

                  return (
                    <div key={i} className="round-detail">
                      <div className="round-stats">
                        <div className="round-header"></div>
                        <span className="distance">{distance} </span>
                        <span className="years">{detail.years} anos - </span>
                        <span className="medal-badge">{detail.medal}</span>
                        <span className="medal-score">
                          {detail.medalScore} pts
                        </span>
                      </div>
                    </div>
                  );
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
