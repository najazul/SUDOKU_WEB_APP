  import { useState } from "react";
  import SudokuGrid from './sudoku_grid/sudokuGrid'
  import Difficulties from './difficulties/diff_levels'
  import './App.css'
  import Timer from "./timer/timer";
  import Mistakes from "./mistakes/mistakes";
  import Username from "./username/username";
  import Solution from "./solution/solution";
  import Leaderboard from "./leaderboard/leaderboard";

function App() {
  const [level, setLevel] = useState<number>(1);
  const [trigger, reTrigger] = useState<number>(1);
  const [mistakes, setMistakes] = useState<number>(0);
  const [pause, setPause] = useState(false);
  const [solved,setSolved] = useState(false);
  const [finalTime, setfinalTime] = useState<number>(0);
  const [username, setUsername] = useState<string>('');

  const changeLevel = (newLevel: number) => {
    if(!pause && mistakes < 3 && !solved){
      setLevel(newLevel);
      reTrigger(prev => prev + 1); 
    }
  };

  const FinalTime = (time: number) => {
    setfinalTime(time);
  }

  return (
    <>
    <div className="main">
      <div className="left">
        <Solution />
      </div>
      <div className="center">
        <div className = "first">
         <Difficulties changeLevel ={changeLevel} pause = {pause}/>
         <Mistakes mistakes={mistakes}/>
         <Timer mistakes={mistakes} solved = {solved} pause = {pause} FinalTime = {FinalTime}  />
         <Username username ={username} setUsername ={setUsername} />
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
         finalTime = {finalTime}
        username = {username}
        />
        </div>
      </div>
      <div className="right">
        <Leaderboard username={username} finalTime={finalTime} />
      </div>
    </div>
    </>
  )
}

  export default App
