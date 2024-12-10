import React, { useState } from "react";
import "./diff_levels.css";

interface DifficultiesProps {
  changeLevel: (newLevel: number) => void;
  pause: boolean;
}

const Difficulties: React.FC<DifficultiesProps> = ({ changeLevel }) => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleClick = (level: number) => {
    setSelectedLevel(level);
    changeLevel(level);
  };

  return (
    <div className="difficulties-container">
      Difficulty: 
      <button
        className={`difficulty-button ${selectedLevel === 1 ? "selected" : ""}`}
        onClick={() => handleClick(1)}
      >
        Easy
      </button>
      <button
        className={`difficulty-button ${selectedLevel === 2 ? "selected" : ""}`}
        onClick={() => handleClick(2)}
      >
        Medium
      </button>
      <button
        className={`difficulty-button ${selectedLevel === 3 ? "selected" : ""}`}
        onClick={() => handleClick(3)}
      >
        Hard
      </button>
    </div>
  );
};

export default Difficulties;
