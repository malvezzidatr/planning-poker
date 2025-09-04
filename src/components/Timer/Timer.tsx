"use client";

import { useEffect, useRef, useState } from "react";

interface ITimerProps {
  duration: number; // segundos (total)
  running: boolean;
  startedAt: number | null; // ms timestamp do servidor ou null
  onStart?: () => void; // handlers opcionais para botões
  onPause?: () => void;
  onReset?: () => void;
}

export const Timer = ({ duration, running, startedAt, onStart, onPause, onReset }: ITimerProps) => {
  const [remaining, setRemaining] = useState<number>(duration);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const computeRemaining = () => {
      if (!running) {
        setRemaining(duration);
        return;
      }
      if (!startedAt) {
        setRemaining(duration);
        return;
      }
      const now = Date.now();
      const elapsed = Math.floor((now - startedAt) / 1000);
      const rem = Math.max(duration - elapsed, 0);
      setRemaining(rem);
    };

    computeRemaining();

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    intervalRef.current = window.setInterval(() => {
      computeRemaining();
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [duration, startedAt, running]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleStartClick = () => {
    if (onStart) onStart();
  };
  const handlePauseClick = () => {
    if (onPause) onPause();
  };
  const handleResetClick = () => {
    if (onReset) onReset();
  };

  return (
    <div className="flex items-center justify-between px-4 h-20 w-60 p-2 bg-gray-900 text-white rounded-lg shadow-md">
      <div className="text-4xl font-mono font-bold">{formatTime(remaining)}</div>
      <div className="flex flex-col gap-2">
        {!running ? (
          <button onClick={handleStartClick} className="h-9 font-bold text-white w-20 border-white border-2 rounded-full cursor-pointer transition-all hover:bg-white hover:text-black">Start</button>
        ) : (
          <button onClick={handleResetClick} className="h-9 font-bold text-white w-20 border-white border-2 rounded-full cursor-pointer transition-all hover:bg-white hover:text-black">Reset</button>
        )}
      </div>
    </div>
  );
};
