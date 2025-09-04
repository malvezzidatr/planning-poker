"use client";

import { useState, useEffect, useRef } from "react";

interface ITimerProps {
  initialTime: number; 
}

export const Timer = ({ initialTime }: ITimerProps) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => Math.max(prev - 1, 0));
      }, 1000);
    } else if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const startTimer = () => setIsRunning(true);
  const handleReset = () => {
    setTime(initialTime);
    setIsRunning(false);
  }

  return (
    <div className="flex items-center justify-between px-4 h-20 w-60 p-2 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="text-4xl font-mono font-bold">{formatTime(time)}</div>
      <button onClick={isRunning ? handleReset : startTimer} className="justify-self-end h-14 font-bold text-white w-14 border-white border-2 rounded-full cursor-pointer transition-all hover:bg-white hover:text-black">{isRunning ? "Reset" : "Start"}</button>
    </div>
  );
};
