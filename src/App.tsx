import SudokuGrid from './sudoku_grid/sudokuGrid'
import './App.css'
import UndoButton from "./undo_button/UndoButton";

function App() {
  const handleUndo = () => {
    console.log("Undo action triggered!");
  };

  return (
    <>
    <div className = "first">
      Difficulty Here, Time Here, Score Here, Mistakes Here
    </div>
    <div className = "Second">
      <SudokuGrid />
      <div className="controls">
      <UndoButton onUndo={handleUndo} />
      </div>
      Erase Here
      Pause Here
      NumPad Here
    </div>
    </>
  )
}

export default App
