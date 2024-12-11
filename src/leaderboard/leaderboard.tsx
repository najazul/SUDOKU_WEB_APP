import React, { useEffect, useState } from "react";
import "./leaderboard.css";
import bronze from '../assets/bronze.png';
import silver from '../assets/silver.png';
import gold from '../assets/gold.png';
import { getPlayersFromFile } from "./createFiles";
import { formatTime } from "../timer/timer";

interface LeaderBoardProps {
  FinalLevel: string;
  AddedPlayer: number;
}

const Leaderboard: React.FC<LeaderBoardProps> = ({ FinalLevel, AddedPlayer }) => {
  const [entries, setEntries] = useState<{ username: string; time: string }[]>([]);
  const [Easyentries, setEasyEntries] = useState<{ username: string; time: string }[]>([]);
  const [Mediumentries, setMediumEntries] = useState<{ username: string; time: string }[]>([]);
  const [Hardentries, setHardEntries] = useState<{ username: string; time: string }[]>([]);
  const [level, setLevel] = useState<String>("Easy");
  
  useEffect(() => {
    const players = getPlayersFromFile(FinalLevel);

    const updateEntries = (entries: { username: string; time: string }[], players: { name: string, time: string }[]) => {
      const updatedEntries = [...entries];
      players.forEach(({ name, time }) => {
        const playerExists = updatedEntries.some(entry => entry.username === name && entry.time === time);
        if (!playerExists) {
          updatedEntries.push({ username: name, time: time });
        }
      });

      return updatedEntries.sort((a, b) => Number(a.time) - Number(b.time)).slice(0, 10);
    };

    if (FinalLevel === "1") {
      setEntries(prev => updateEntries(prev, players));
      setEasyEntries(prev => updateEntries(prev, players));
    } else if (FinalLevel === "2") {
      setEntries(prev => updateEntries(prev, players));
      setMediumEntries(prev => updateEntries(prev, players));
    } else if (FinalLevel === "3") {
      setEntries(prev => updateEntries(prev, players));
      setHardEntries(prev => updateEntries(prev, players));
    }
  }, [FinalLevel, AddedPlayer]);

  const showEntry = (level: string) => {
    if (level === "1") {
      setLevel("Easy");
      setEntries(Easyentries);
    } else if (level === "2") {
      setLevel("Medium");
      setEntries(Mediumentries);
    } else {
      setLevel("Hard");
      setEntries(Hardentries);
    }
  };

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-buttons">
        <img src={bronze} alt="Bronze" onClick={() => showEntry("1")} />
        <img src={silver} alt="Silver" onClick={() => showEntry("2")} />
        <img src={gold} alt="Gold" onClick={() => showEntry("3")} />
      </div>
      <div className="leaderboard-body">
        <h2>Top 10</h2>
        <h3>Difficulty: {level}</h3>
        <ol>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.username}: {formatTime(Number(entry.time))}s
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Leaderboard;
