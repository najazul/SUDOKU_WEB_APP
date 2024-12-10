import React, { useState } from "react";
import "./leaderboard.css";

interface LeaderboardProps {
  username: string;
  finalTime: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ username, finalTime }) => {
  const [entries, setEntries] = useState<{ username: string; time: number }[]>(
    []
  );

  const addEntry = () => {
    setEntries([...entries, { username, time: finalTime }]);
  };

  const resetEntries = () => {
    setEntries([]);
  };

  const sortEntries = () => {
    setEntries([...entries].sort((a, b) => a.time - b.time));
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.time}s
          </li>
        ))}
      </ul>
      <div className="leaderboard-buttons">
        <button onClick={addEntry}>Add Entry</button>
        <button onClick={resetEntries}>Reset</button>
        <button onClick={sortEntries}>Sort</button>
      </div>
    </div>
  );
};

export default Leaderboard;
