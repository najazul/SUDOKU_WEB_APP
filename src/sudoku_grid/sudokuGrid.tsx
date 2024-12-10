import React, { useState, useEffect } from "react";
import fetchSudokuGrid from '../sudoku_API/sudoku_API';
import UndoButton from "../undo_button/UndoButton";
import EraseButton from  "../erase_button/EraseButton";
import PauseButton from  "../pause_button/PauseButton";
import NewGameButton from "../NewGameButton/newgame";
import { gridsAreEqual, solveSudoku } from "../sudoku_solver/sudoku_solver";
import "./sudokuGrid.css";

  interface SudokuGridProps {
    level:number;
    retriger:number;
    pause: boolean;
    setPause: React.Dispatch<React.SetStateAction<boolean>>;
    mistakes: number;
    setMistakes: React.Dispatch<React.SetStateAction<number>>;
    solved: boolean;
    setSolved: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const SudokuGrid: React.FC<SudokuGridProps> = ({level, retriger, pause, setPause, mistakes, setMistakes, solved, setSolved}) => {
  // Initialize grid state as empty, will be updated once the API data is fetched
  const [grid, setGrid] = useState<string[][]>(Array.from({ length: 9 }, () => Array(9).fill("")));
  
  // Track the focused cell
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  // Store indices of pre-filled cells from API
  const [prefilledCells, setPrefilledCells] = useState<{ row: number; col: number }[]>([]);

  const [history, setHistory] = useState<string[][][]>([]);
  const [firsthistory, setfirstHistory] = useState<string[][]>([]);
  const [tempGrid, setTempGrid] = useState<string[][]>([]);
  const [newGame, setNewGame] = useState<number>(0);
  const [solvedGrid, setSolvedGrid] = useState<string[][]>(Array.from({ length: 9 }, () => Array(9).fill("")));

  // Fetch the Sudoku grid from API on mount
  useEffect(() => {
    if(!pause && mistakes < 3 && !solved){
      const fetchGrid = async () => {
        const fetchedGrid = await fetchSudokuGrid(level);  // Call the API to fetch the grid
        setGrid(fetchedGrid);  // Update the grid state with the fetched data
        setHistory([]); //Update the grid history to be emppty with every API call
        setfirstHistory(fetchedGrid);
        setTempGrid(fetchedGrid);
        const unSolvedGrid = JSON.parse(JSON.stringify(fetchedGrid));
        const mySolvedGrid = solveSudoku(unSolvedGrid);
        setSolvedGrid(mySolvedGrid);
        console.log(mySolvedGrid);
        // Find all prefilled cells and store their positions
        const prefilled = [];
        for (let row = 0; row < fetchedGrid.length; row++) {
          for (let col = 0; col < fetchedGrid[row].length; col++) {
            if (fetchedGrid[row][col] !== "") { 
              prefilled.push({ row, col });
            }
          }
        }
        setPrefilledCells(prefilled);
      };

      fetchGrid();  // Trigger the API call when the component mounts
    };
  }, [level, newGame, retriger]); 
  
  const handleInputChange = (
    row: number,
    col: number,
    value: string
  ) => {
    let newValue = value.slice(-1);
    if(value.length > 1 && value[value.length - 1] === value[value.length - 2]){
      newValue = "";
    }
    if (newValue === "" || /^[1-9]$/.test(newValue)) {
      if(newValue != ""){
        //setMistakes((prev) => (newValue != solvedGrid[row][col] ? prev + 1 : prev));
      }
      setHistory((prevHistory) => [...prevHistory, grid.map((r) => [...r])]);
      setGrid((prevGrid) =>
        prevGrid.map((r, rowIndex) =>
          r.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? newValue : cell
          )
        )
      );
      setTempGrid((prevGrid) =>
        prevGrid.map((r, rowIndex) =>
          r.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? newValue : cell
          )
        )
      );
    };
  };

  const handleNewGame = () => {
    if(!pause && mistakes < 3 && !solved){
      setNewGame(newGame + 1);
      setMistakes(0);
    }
  };

  const handleErase = () => {
    if(!pause && mistakes < 3 && !solved){
      const lastState = firsthistory;
      setGrid(lastState);
      setTempGrid(lastState);
      setHistory([]);
    };
  };

  const handleUndo = () => {
    if(!pause && mistakes < 3 && !solved){
      if (history.length > 0) {
        const lastState = history[history.length - 1];
        setGrid(lastState);
        setTempGrid(lastState);
        setHistory(history.slice(0, -1));
      };
    };
  };

  const handlePause = () => {
    if(mistakes < 3 && !solved){
      setPause(!pause);
      console.log(pause);
      console.log(tempGrid);
      pause ? setGrid(tempGrid) : setGrid(Array.from({ length: 9 }, () => Array(9).fill("")));
    }
  };

  const handleRetry = () => {
    setNewGame(newGame + 1);
    setMistakes(0);
  }

  const handleFocus = (row: number, col: number) => {
    setFocusedCell({ row, col });
  };

  const handleBlur = () => {
    setFocusedCell(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!focusedCell) return;

      const { row, col } = focusedCell;
      let newRow = row;
      let newCol = col;

      if (event.key === "ArrowRight") {
        newCol = (col + 1) % 9; // Move to the next cell in the row
      } else if (event.key === "ArrowLeft") {
        newCol = (col - 1 + 9) % 9; // Move to the previous cell in the row
      } else if (event.key === "ArrowUp") {
        newRow = (row - 1 + 9) % 9; // Move to the cell above
      } else if (event.key === "ArrowDown") {
        newRow = (row + 1) % 9; // Move to the cell below
      }

      // Update focus
      setFocusedCell({ row: newRow, col: newCol });

      // Focus the new cell
      const nextCell = document.getElementById(`cell-${newRow}-${newCol}`);
      nextCell?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedCell]);

  useEffect(() => {
    if (gridsAreEqual(grid, solvedGrid) && grid.some(row => row.some(cell => cell != ""))) {
      setSolved(true);
    }
  }, [grid, solvedGrid]);

  const handleNewestGame = () => {
    setSolved(false);
    setMistakes(0);
    setNewGame(newGame + 1);
  }

  // Helper function to get the subgrid index based on row and column
  const getSubgridIndex = (row: number, col: number) => {
    const subgridRow = Math.floor(row / 3);
    const subgridCol = Math.floor(col / 3);
    return subgridRow * 3 + subgridCol;
  };

  return (
    <>
      <div className="sudoku-grid">
        {pause ? <div className = "Overlay">
            <button className = "playbtn" onClick = {handlePause}>
                &#9654;
            </button>
        </div>
        : null}
        {mistakes === 3 ? <div className = "Overlay-2">
            <button className = "retry" onClick = {handleRetry}>
                retry
            </button>
        </div>
        : null}
        {solved ? <div className = "Overlay-3">
            <button className = "yey" onClick = {handleNewestGame}>
                New Game?
            </button>
        </div>
        : null}
        {grid.map((row, rowIndex) => (
          <div className="sudoku-row" key={rowIndex}>
            {row.map((value, colIndex) => {
              // Determine if this cell belongs to the selected row, column, or subgrid
              const isRowSelected = focusedCell?.row === rowIndex;
              const isColSelected = focusedCell?.col === colIndex;
              const isSubgridSelected = focusedCell
                ? getSubgridIndex(focusedCell.row, focusedCell.col) === getSubgridIndex(rowIndex, colIndex)
                : false;
              
              const topBorder = rowIndex % 3 === 0 && rowIndex !== 0 ? "top-border" : "";
              const leftBorder = colIndex % 3 === 0 && colIndex !== 0 ? "left-border" : "";
              const isFocused = focusedCell?.row === rowIndex && focusedCell?.col === colIndex ? "focused" : "";
              const rowHighlight = isRowSelected ? "highlight-row" : "";
              const colHighlight = isColSelected ? "highlight-col" : "";
              const subgridHighlight = isSubgridSelected ? "highlight-subgrid" : "";
              const isReadOnly = prefilledCells.some(cell => cell.row === rowIndex && cell.col === colIndex);
              const Read = isReadOnly ? "read-only" : "";
              const invalid = !isReadOnly && value && value.slice(-1) != solvedGrid[rowIndex][colIndex];
              const validity = invalid ? "invalid" : "";

              return (
                <input
                  disabled = {mistakes === 3 ? true : false}
                  draggable="false"
                  key={`${rowIndex}-${colIndex}`}
                  type="text"
                  value={value}
                  onChange={(e) =>
                    handleInputChange(rowIndex, colIndex, e.target.value)
                  }
                  readOnly={isReadOnly}
                  onFocus={() => handleFocus(rowIndex, colIndex)}
                  onBlur={handleBlur}
                  className={`sudoku-cell ${topBorder} ${leftBorder} ${isFocused} ${rowHighlight} ${colHighlight} ${subgridHighlight} ${Read} ${validity}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className = "Buttons">
        <div className = "PAUSEUNDOERASE">
        <EraseButton onErase={handleErase} />
        <PauseButton onPause={handlePause} />
        <UndoButton onUndo={handleUndo} />
        </div>
        <div className = "NewGame">
        <NewGameButton onNew ={handleNewGame} />
        </div>
      </div>
    </>
  );
};

export default SudokuGrid;
