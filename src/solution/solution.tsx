import './solution.css';

function Solution() {
  return (
    <div className="solution">
      <h2>How to Solve Sudoku</h2>
      <ol>
        <li>Start with the easiest rows, columns, or boxes that have the most numbers already filled in.</li>
        <li>Look for numbers that can only fit in one spot in a row, column, or box.</li>
        <li>Use the process of elimination to narrow down possible numbers for empty cells.</li>
        <li>Focus on one number at a time and try to place it across the grid.</li>
        <li>If you're stuck, scan the grid again for numbers or revisit previous steps with a fresh perspective.</li>
        <li>Use pencil marks or notes to track possibilities for empty cells.</li>
        <li>If necessary, make an educated guess and continue solving. Backtrack if you encounter a conflict.</li>
        <li>Repeat these steps until the grid is completely filled.</li>
        <li>Double-check the solution to ensure all rows, columns, and boxes contain the numbers 1–9 without repetition.</li>
      </ol>
    </div>
  );
}

export default Solution;
