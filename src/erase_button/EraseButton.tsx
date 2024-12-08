import React from "react";
import "./EraseButton.css"; 

interface EraseButtonProps {
    onErase: () => void; 
  }

const EraseButton: React.FC<EraseButtonProps> = ({ onErase }) => {
  return (
    <button className="erase-btn" onClick={onErase}>
      &#x232B;
    </button>
  );    
};

export default EraseButton;