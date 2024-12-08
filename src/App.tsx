import { useState } from "react";
import SudokuGrid from './sudoku_grid/sudokuGrid'
import Difficulties from './difficulties/diff_levels'
import './App.css'

function App() {
  const [level, setLevel] = useState<number>(1);
  const [trigger, reTrigger] = useState<number>(1);

  const changeLevel = (newLevel: number) => {
    setLevel(newLevel);
    reTrigger(prev => prev + 1); 
  };

  return (
    <>
      <div className = "first">
        <Difficulties changeLevel ={changeLevel}/>
      </div>
      <div className = "Second">
        <SudokuGrid level = {level} retriger = {trigger} />
      </div>
    </>
  )
}

export default App
