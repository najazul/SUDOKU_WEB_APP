import React, { useState } from "react";
import "./leaderboard.css";
import bronze from './bronze.png';
import silver from './silver.png';
import gold from './gold.png';

interface LeaderboardProps {
  username: string;
  finalTime: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ username, finalTime }) => {
  const [entries, setEntries] = useState<{ username: string; time: number }[]>([]);

  const addEntry = () => {
    const updatedEntries = [...entries, { username, time: finalTime }]
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);
    setEntries(updatedEntries);
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-buttons">
        <img src={bronze} alt="Bronze" onClick={addEntry} />
        <img src={silver} alt="Silver" onClick={addEntry} />
        <img src={gold} alt="Gold" onClick={addEntry} />
      </div>
      <div className="leaderboard-body">
        <h2>Top 10</h2>
        <h3>Difficulty: </h3>
        <ol>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.username}: {entry.time}s
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;
