import SudokuGrid from './sudoku_grid/sudokuGrid'
import './App.css'
import UndoButton from "./undo_button/UndoButton";
import EraseButton from  "./erase_button/EraseButton";
import PauseButton from  "./pause_button/PauseButton";

function App() {
  const handleUndo = () => {
    console.log("Undo action triggered!");
  };

  const handleErase = () => {
    console.log("Erase action triggered!")
  }

  const handlePause = () => {
    console.log("Erase action triggered!")
  }

  return (
    <>
    <div className = "first">
      Difficulty Here, Time Here, Score Here, Mistakes Here
    </div>
    <div className = "Second">
      <SudokuGrid />

      <div className="button-container">
        <UndoButton onUndo={handleUndo} />
        <div className="button-caption">Undo</div>
      </div>

      <div className="button-container">
        <EraseButton onErase={handleErase} />
        <div className="button-caption">Erase</div>
      </div>

      <div className="button-container">
        <PauseButton onPause={handlePause} />
        <div className="button-caption">Pause</div>
      </div>

      NumPad Here
    </div>
    </>
  )
}

export default App
