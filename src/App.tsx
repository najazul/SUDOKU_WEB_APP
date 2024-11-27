import SudokuGrid from './sudoku_grid/sudokuGrid'
import './App.css'
import UndoButton from "./undo_button/UndoButton";
import EraseButton from  "./erase_button/EraseButton";
import PauseButton from  "./pause_button/PauseButton";
import Numpad from "./numpad/numpad";

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


  const handleNumberClick = (number: string) => {
    console.log(`Number clicked: ${number}`);
  };

  return (
    <>
      <div className="first">
        Difficulty Here, Time Here, Score Here, Mistakes Here
      </div>
      <div className="Second">
        <SudokuGrid />
  
        <div className="control-and-numpad">
          {/* Controls (Undo, Erase, Pause) */}
          <div className="controls">
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
          </div>
  
          {/* Numpad */}
          <div className="numpad-container">
            <Numpad onNumberClick={handleNumberClick} />
          </div>
        </div>
      </div>
    </>
  );  
};

export default App
