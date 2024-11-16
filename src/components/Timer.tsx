import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number;
  round: number;
  isRunning: boolean;
  onTimeEnd: () => void;
}

const Timer = ({ initialTime, round, isRunning, onTimeEnd }: TimerProps) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let interval: number;

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            onTimeEnd();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, onTimeEnd]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-black text-tkd-gold p-6 rounded-lg text-center">
      <div className="text-6xl font-bold mb-4">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="text-2xl">
        ROUND
        <div className="text-4xl font-bold">{round}</div>
      </div>
    </div>
  );
};

export default Timer;