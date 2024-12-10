import React from "react";
import "./newgame.css"; 

interface NewGameButtonProps {
  onNewGameClick: () => void; 
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ onNewGameClick }) => {
  return (
    <button className="newgame-btn" onClick={onNewGameClick}>
      New Game
    </button>
  );    
};

export default NewGameButton;
