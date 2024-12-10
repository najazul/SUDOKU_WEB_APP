import React, { useState } from "react";
import "./mistakes.css";

interface MistakesProps {
  totalAllowed: number;
}

const Mistakes: React.FC<MistakesProps> = ({ totalAllowed }) => {
  const [mistakes, setMistakes] = useState<number>(0);

  const incrementMistakes = () => {
    if (mistakes < totalAllowed) {
      setMistakes((prev) => prev + 1);
    }
  };

  return (
    <div className="mistakes-container">
      <p className="mistakes-text">
        Mistakes: {mistakes} / {totalAllowed}
      </p>
    </div>
  );
};

export default Mistakes;
