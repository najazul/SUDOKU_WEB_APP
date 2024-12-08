import React from "react";
import "./PauseButton.css"; 

interface PauseButtonProps {
  onPause: () => void; 
}

const PauseButton: React.FC<PauseButtonProps> = ({ onPause }) => {
  return (
    <button className="pause-btn" onClick={onPause}>
      &#x23F8;
    </button>
  );    
};

export default PauseButton;
