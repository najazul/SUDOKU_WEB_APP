import React from "react";

interface DifficultiesProps {
  changeLevel: (newLevel: number) => void; // Expected function to change the level
  pause: boolean;
}

const Difficulties: React.FC<DifficultiesProps> = ({changeLevel, pause}) => { 
     
    return (
      <>
        <div>
          <button className="Easy" onClick = {() => changeLevel(1)}>
            Easy
          </button>   

          <button className="Medium" onClick = {() => changeLevel(2)}>
            Medium
          </button> 

          <button className="Hard" onClick = {() => changeLevel(3)}>
            Hard
          </button> 
        </div>
      </>
    ); 
};

export default Difficulties;