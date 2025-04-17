import React from "react";

export default function RankingTable({ data }) {
  return (
    <div className="ranking-table">
      <h2>Ranking do Dia</h2>
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
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.totalScore}</td>
              <td>
                {player.details.map((detail, i) => (
                  <div key={i} className="detail-item">
                    <span className="medal">{detail.medal}</span>
                    {detail.medalScore} pts - {detail.distance / 1000}K km
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
