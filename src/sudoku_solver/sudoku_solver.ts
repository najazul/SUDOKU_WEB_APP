
export const solveSudoku = (grid: string[][]) => {
const rows = new Array(9).fill(0).map(() => new Set<string>());
    const cols = new Array(9).fill(0).map(() => new Set<string>());
    const subgrids = new Array(9).fill(0).map(() => new Set<string>());
    const candidateNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

    let emptyCells = []
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = grid[row][col];
        if (cell === ""){
            emptyCells.push({row: row, col: col})
        }
        const subgridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
        rows[row].add(cell);
        cols[col].add(cell);
        subgrids[subgridIndex].add(cell);
      }
    }

    const BackTrack = (unFilledIndex : number) => {
        if(unFilledIndex === emptyCells.length){
            return true;
        }
        const row = emptyCells[unFilledIndex].row;
        const col = emptyCells[unFilledIndex].col;

        for(let i = 0; i < 9; i++){
            let value = candidateNumbers[i];
            const subgridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
            if(!(rows[row].has(value) || cols[col].has(value) || subgrids[subgridIndex].has(value))){
                grid[row][col] = value;
                rows[row].add(value);
                cols[col].add(value);
                subgrids[subgridIndex].add(value);

                if(BackTrack(unFilledIndex+1)){
                    return true;
                }
                grid[row][col] = "";
                rows[row].delete(value);
                cols[col].delete(value);
                subgrids[subgridIndex].delete(value);
            }
        }
        return false;
    };
    BackTrack(0);
    
    return grid;
}

export const isValidSudoku = (grid: string[][]) => {
    const rows = new Array(9).fill(0).map(() => new Set<string>());
    const cols = new Array(9).fill(0).map(() => new Set<string>());
    const subgrids = new Array(9).fill(0).map(() => new Set<string>());
  
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = grid[row][col];
        if (cell === "") continue;
  
        const subgridIndex = Math.floor(row / 3) * 3 + Math.floor(col / 3);
  
        if (rows[row].has(cell) || cols[col].has(cell) || subgrids[subgridIndex].has(cell)) {
          return false;
        }
  
        rows[row].add(cell);
        cols[col].add(cell);
        subgrids[subgridIndex].add(cell);
      }
    }
    return true;
  };