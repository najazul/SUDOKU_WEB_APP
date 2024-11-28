import React, { useState, useEffect } from "react";
import fetchSudokuGrid from '../sudoku_API/sudoku_API';
import "./sudokuGrid.css";

const SudokuGrid: React.FC = () => {
  // Initialize grid state as empty, will be updated once the API data is fetched
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill("")));
  
  // Track the focused cell
  const [focusedCell, setFocusedCell] = useState<{ row: number; col: number } | null>(null);

  // Fetch the Sudoku grid from API on mount
  useEffect(() => {
    const fetchGrid = async () => {
      const fetchedGrid = await fetchSudokuGrid();  // Call the API to fetch the grid
      setGrid(fetchedGrid);  // Update the grid state with the fetched data
    };

    fetchGrid();  // Trigger the API call when the component mounts
  }, []);  // Empty dependency array ensures this runs only once

  const handleInputChange = (
    row: number,
    col: number,
    value: string
  ) => {
    const newValue = value.slice(-1);
    if (newValue === "" || /^[1-9]$/.test(newValue)) {
      setGrid((prevGrid) =>
        prevGrid.map((r, rowIndex) =>
          r.map((cell, colIndex) =>
            rowIndex === row && colIndex === col ? newValue : cell
          )
        )
      );
    }
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

  const preventTextDragging = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault(); // Prevent text dragging
  };

  return (
    <div className="sudoku-grid">
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

            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={value}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
                onFocus={() => handleFocus(rowIndex, colIndex)}
                onBlur={handleBlur}
                onDragStart={preventTextDragging}
                className={`sudoku-cell ${topBorder} ${leftBorder} ${isFocused} ${rowHighlight} ${colHighlight} ${subgridHighlight}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
