import { useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  mistakes: number;
  solved : boolean;
  pause: boolean;
  FinalTime: (time: number) => void;
  resetTime: boolean;
  setResetTime: React.Dispatch<React.SetStateAction<boolean>>;
}

export const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
};

function Timer({ mistakes, solved, pause, FinalTime, resetTime, setResetTime}: TimerProps) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: number | null = null;
    if (!solved && !pause && mistakes < 3 && !resetTime) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else if (mistakes === 3 || resetTime) {
      setTime(0);
      setResetTime(false);
    } else {
      FinalTime(time);
    }
  
    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [solved, pause, mistakes, resetTime]);

  return (
    <div className="timer-container">
      <div className="timer"><p className="text">Timer:</p><p className="time">{formatTime(time)}</p></div>
    </div>
  );
}

export default Timer;
