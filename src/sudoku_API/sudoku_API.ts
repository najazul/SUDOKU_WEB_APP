const fetchSudokuGrid = async () => {
  const url = 'https://sudoku-generator3.p.rapidapi.com/generate';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': 'cb82e4c7cemshaa8b8a61cf05e45p15cdb7jsn4cfdab494fd6',
      'x-rapidapi-host': 'sudoku-generator3.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'easy',
      spaces: ' ',
      candidates: true,
      list: false,
      grid: true,
    }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.grid;  // Assuming the grid is in `result.grid`
  } catch (error) {
    console.error('Error fetching Sudoku grid:', error);
    return Array.from({ length: 9 }, () => Array(9).fill(""));  // Return empty grid on error
  }
};

export default fetchSudokuGrid;
