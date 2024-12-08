import React from "react"; 

interface NewGameButtonProps {
  onNew: () => void; 
}

const NewGameButton: React.FC<NewGameButtonProps> = ({ onNew }) => {
  return (
    <button className="newgame-btn" onClick={onNew}>
      new game
    </button>
  );    
};

export default NewGameButton;
