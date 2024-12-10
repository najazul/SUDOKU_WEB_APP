import { useState, useEffect } from 'react';
import './username.css';

function Username() {
  const [username, setUsername] = useState<string>('');

  const generateRandomName = () => {
    const names = ['Player123', 'SudokuMaster', 'PuzzlePro', 'NumberNinja', 'GridGuru', 'witty', 'NormalNorman', 'LegallyBlonde', ''];
    return names[Math.floor(Math.random() * names.length)];
  };

  useEffect(() => {
    setUsername(generateRandomName());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length <= 18) {
      setUsername(input);
    }
  };

  return (
    <div className="username-container">
      <label htmlFor="username" className="username-label">Username:</label>
      <input
        id="username"
        type="text"
        value={username}
        onChange={handleChange}
        className="username-input"
        placeholder="Enter your Name"
      />
    </div>
  );
}

export default Username;
