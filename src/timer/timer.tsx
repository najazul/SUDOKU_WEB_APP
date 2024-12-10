import { useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  mistakes: number;
  solved : boolean;
  pause: boolean;
  FinalTime: (time: number) => void;
}

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
};

function Timer({ mistakes, solved, pause, FinalTime }: TimerProps) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: number | null = null;
    if (!solved && !pause && mistakes < 3) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (mistakes === 3) {
      setTime(prev => (mistakes === 3 ? 0 : prev));
    } else {
      FinalTime(time);
    }
  
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [solved, pause, mistakes]);

  return (
    <div className="timer-container">
      <div className="timer">Timer: {formatTime(time)}</div>
    </div>
  );
}

export default Timer;
