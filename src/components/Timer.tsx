import React, { useState, useEffect } from 'react';

interface TimerProps {
  round: number;
  isRunning: boolean;
  isRest: boolean;
  onTimeEnd: () => void;
}

const Timer = ({ round, isRunning, isRest, onTimeEnd }: TimerProps) => {
  const ROUND_TIME = 60; // 1 minute
  const REST_TIME = 30; // 30 seconds
  const [time, setTime] = useState(ROUND_TIME);

  useEffect(() => {
    let interval: NodeJS.Timeout;

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

  useEffect(() => {
    setTime(isRest ? REST_TIME : ROUND_TIME);
  }, [round, isRest]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-black text-tkd-gold p-6 rounded-lg text-center">
      <div className="text-6xl font-bold mb-4">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </div>
      <div className="text-2xl">
        {isRest ? 'REST' : 'ROUND'}
        <div className="text-4xl font-bold">{round}</div>
      </div>
    </div>
  );
};

export default Timer;