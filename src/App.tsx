import SudokuGrid from './sudoku_grid/sudokuGrid'
import './App.css'
function App() {

  return (
    <>
    <div className = "first">
      Difficulty Here, Time Here, Score Here, Mistakes Here
    </div>
    <div className = "Second">
      <SudokuGrid />
      Pause Here Undo Here NumPad Here
    </div>
    </>
  )
}

export default App
