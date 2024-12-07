import React from "react";
import "./UndoButton.css"; 

interface UndoButtonProps {
  onUndo: () => void; 
}

const UndoButton: React.FC<UndoButtonProps> = ({ onUndo }) => {
  return (
    <button className="undo-btn" onClick={onUndo}>
      &#8634;
    </button>
  );    
};

export default UndoButton;
