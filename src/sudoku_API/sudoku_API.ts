import { isValidSudoku } from "../sudoku_solver/sudoku_solver";

const fetchSudokuGrid = async (level:number) => {
  const url = `https://sudoku-board.p.rapidapi.com/new-board?diff=${level}&stype=list&solu=false`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cb82e4c7cemshaa8b8a61cf05e45p15cdb7jsn4cfdab494fd6',
      'x-rapidapi-host': 'sudoku-board.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    const result = await response.json();
    const sudokuGrid = result.response['unsolved-sudoku'].map((row: number[])=>
      row.map(cell => (cell === 0 ? "" : cell.toString()))
    );
    if(isValidSudoku(sudokuGrid)){
      return sudokuGrid;
    }else{
      return await fetchSudokuGrid(level);
    }
  } catch (error) {
    console.error('Error fetching Sudoku grid:', error);
    // Return an empty 9x9 grid on error
    return Array.from({ length: 9 }, () => Array(9).fill(""));
  }
};

export default fetchSudokuGrid;