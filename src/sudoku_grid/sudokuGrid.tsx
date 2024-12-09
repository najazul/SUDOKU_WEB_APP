import React, { useState, useEffect } from "react";
import fetchSudokuGrid from '../sudoku_API/sudoku_API';
import UndoButton from "../undo_button/UndoButton";
import EraseButton from  "../erase_button/EraseButton";
import PauseButton from  "../pause_button/PauseButton";
import NewGameButton from "../NewGameButton/newgame";
import { solveSudoku } from "../sudoku_solver/sudoku_solver";
import "./sudokuGrid.css";

  interface SudokuGridProps {
    level:number;
    retriger:number;
  }

  const SudokuGrid: React.FC<SudokuGridProps> = ({level, retriger}) => {
  // Initialize grid state as empty, will be updated once the API data is fetched
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill("")));
  
  // Track the focused cell
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  // Store indices of pre-filled cells from API
  const [prefilledCells, setPrefilledCells] = useState<{ row: number; col: number }[]>([]);

  const [history, setHistory] = useState<string[][][]>([]);
  const [firsthistory, setfirstHistory] = useState<string[][]>([]);
  const [tempGrid, setTempGrid] = useState<string[][]>([]);
  const [newGame, setNewGame] = useState<number>(0);
  const [solvedGrid, setSolvedGrid] = useState<string[][]>([]);
  //const [mistakes, setMistakes] = useState<number>(0);
  
  // Fetch the Sudoku grid from API on mount
  useEffect(() => {
    if(!pause){
      const fetchGrid = async () => {
        const fetchedGrid = await fetchSudokuGrid(level);  // Call the API to fetch the grid
        setGrid(fetchedGrid);  // Update the grid state with the fetched data
        setHistory([]); //Update the grid history to be emppty with every API call
        setfirstHistory(fetchedGrid);
        setTempGrid(fetchedGrid);

        const unSolvedGrid = JSON.parse(JSON.stringify(fetchedGrid));
        const mySolvedGrid = solveSudoku(unSolvedGrid);
        setSolvedGrid(mySolvedGrid);

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
  }, [level, newGame, retriger]);  // Empty dependency array ensures this runs only once
  
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
      //put an end here
    }
  };

  const handleNewGame = () => {
    if(!pause){
      setNewGame(newGame + 1);
    }
  };

  const handleErase = () => {
    if(!pause){
      const lastState = firsthistory;
      setGrid(lastState);
      setTempGrid(lastState);
      setHistory([]);
    };
  };

  const handleUndo = () => {
    if(!pause){
      if (history.length > 0) {
        const lastState = history[history.length - 1];
        setGrid(lastState);
        setTempGrid(lastState);
        setHistory(history.slice(0, -1));
      };
    };
  };

  const [pause, setPause] = useState(false);
  const handlePause = () => {
    setPause(!pause);
    console.log(pause);
    console.log(tempGrid);
    pause ? setGrid(tempGrid) : setGrid(Array.from({ length: 9 }, () => Array(9).fill("")));
  };

  const handleFocus = (row: number, col: number) => {
    setFocusedCell({ row, col });
  };

  const handleBlur = () => {
    setFocusedCell(null);
  };

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
