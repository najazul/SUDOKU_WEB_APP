import React, { useState } from "react";
import "./diff_levels.css";

interface DifficultiesProps {
  changeLevel: (newLevel: number) => void;
  pause: boolean;
  setResetTime: React.Dispatch<React.SetStateAction<boolean>>;
  mistakes: number;
  solved: boolean;
}

const Difficulties: React.FC<DifficultiesProps> = ({ changeLevel, pause, setResetTime, mistakes, solved }) => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleClick = (level: number) => {
    setSelectedLevel(level);
    changeLevel(level);
    if(!pause){
      setResetTime(true);
    }
  };

  return (
    <div className="difficulties-container">
      Difficulty: 
      <button
        className={`difficulty-button ${selectedLevel === 1 && !pause && mistakes < 2 && !solved ? "selected" : ""}`}
        onClick={() => handleClick(1)}
      >
        Easy
      </button>
      <button
        className={`difficulty-button ${selectedLevel === 2 && !pause && mistakes < 2 && !solved ? "selected" : ""}`}
        onClick={() => handleClick(2)}
      >
        Medium
      </button>
      <button
        className={`difficulty-button ${selectedLevel === 3 && !pause && mistakes < 2 && !solved ? "selected" : ""}`}
        onClick={() => handleClick(3)}
      >
        Hard
      </button>
    </div>
  );
};

export default Difficulties;
