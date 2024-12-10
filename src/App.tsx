  import { useState } from "react";
  import SudokuGrid from './sudoku_grid/sudokuGrid'
  import Difficulties from './difficulties/diff_levels'
  import './App.css'
  import Timer from "./timer/timer";
  import Mistakes from "./mistakes/mistakes";
  import Username from "./username/username";

function App() {
  const [level, setLevel] = useState<number>(1);
  const [trigger, reTrigger] = useState<number>(1);
  const [mistakes, setMistakes] = useState<number>(0);
  const [pause, setPause] = useState(false);
  const [solved,setSolved] = useState(false);

  const changeLevel = (newLevel: number) => {
    if(!pause && mistakes < 3 && !solved){
      setLevel(newLevel);
      reTrigger(prev => prev + 1); 
    }
  };

  return (
    <>
      <div className = "first">
        <Difficulties changeLevel ={changeLevel} pause = {pause}/>
        <Mistakes totalAllowed={mistakes} />
        <Timer resetTrigger={trigger} />
        <Username /> {/* Integrated Username component */}
      </div>
      <div className = "Second">
        <SudokuGrid 
        level = {level} 
        retriger = {trigger} 
        pause = {pause}
        setPause = {setPause}
        mistakes = {mistakes}
        setMistakes = {setMistakes}
        solved = {solved}
        setSolved = {setSolved}
        />
      </div>
    </>
  )
}

  export default App
