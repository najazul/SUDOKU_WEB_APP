import { useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  resetTrigger: number;
}

function Timer({ resetTrigger }: TimerProps) {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTime(0); // Reset the timer whenever resetTrigger changes
  }, [resetTrigger]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="timer-container">
      <div className="timer">{formatTime(time)}</div>
    </div>
  );
}

export default Timer;
