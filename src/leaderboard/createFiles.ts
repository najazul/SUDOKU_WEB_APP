type Player = {
    name: string;
    time: string;
  };
  
  // Define the levels
  const levels = ["1", "2", "3"];
  
  // Initialize a file (if it doesn't already exist)
  const initializeFile = (level: string) => {
    if (!localStorage.getItem(level)) {
      localStorage.setItem(level, JSON.stringify([])); // Create an empty file for the level
    }
  };
  
  // Add a player to a specific level
  export const addPlayerToFile = (level: string, player: Player) => {
    const file = JSON.parse(localStorage.getItem(level) || "[]"); // Load the file
    file.push(player); // Add the new player
    localStorage.setItem(level, JSON.stringify(file)); // Save back to localStorage
  };
  
  // Query players from a specific level
  export const getPlayersFromFile = (level: string): Player[] => {
    return JSON.parse(localStorage.getItem(level) || "[]");
  };
  
  // Initialize files for all levels
  levels.forEach(initializeFile);