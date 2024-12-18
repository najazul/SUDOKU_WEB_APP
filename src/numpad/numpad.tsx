import React from "react";
import "./numpad.css";

type NumpadProps = {
  onNumberClick: (number: string) => void;
};

const Numpad: React.FC<NumpadProps> = ({ onNumberClick }) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <div className="numpad">
      {numbers.map((number) => (
        <button
          onMouseDown={(e) => e.preventDefault()}
          key={number}
          className="numpad-button"
          onClick={() => onNumberClick(number)} 
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Numpad;
