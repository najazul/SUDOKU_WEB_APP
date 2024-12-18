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
  const [resetTime, setResetTime] = useState<boolean>(false);
  const [FinalLevel, setFinalLevel] = useState<string>("1");
  const [AddedPlayer, setAddedPlayer] = useState<number>(0);
  localStorage.clear()
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
    <div className="header">
      <h1>SUDOKU ni BAI</h1>
    </div>
    <div className="main">
      <div className="left">
        <Solution />
      </div>
      <div className="center">
        <div className = "first">
         <Difficulties changeLevel ={changeLevel} pause = {pause} setResetTime={setResetTime} mistakes={mistakes} solved ={solved}/>
         <Mistakes mistakes={mistakes}/>
         <Timer mistakes={mistakes} solved = {solved} pause = {pause} FinalTime = {FinalTime} resetTime = {resetTime} setResetTime={setResetTime} />
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
         setFinalLevel = {setFinalLevel}
         setAddedPlayer = {setAddedPlayer}
         setResetTime = {setResetTime}
        />
        </div>
      </div>
      <div className="right">
        <Leaderboard FinalLevel= {FinalLevel} AddedPlayer={AddedPlayer}/>
      </div>
    </div>
    </>
  )
}

  export default App
