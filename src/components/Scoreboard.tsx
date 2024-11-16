import React, { useState } from 'react';
import PlayerCard from './PlayerCard';
import Timer from './Timer';
import ScoreControls from './ScoreControls';
import { toast } from 'sonner';

interface Player {
  name: string;
  country: string;
  score: number;
  headScore: number;
  trunkScore: number;
  gamJeomScore: number;
  technicalScore: number;
}

const Scoreboard = () => {
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [bluePlayer, setBluePlayer] = useState<Player>({
    name: 'Eric',
    country: 'England',
    score: 0,
    headScore: 0,
    trunkScore: 0,
    gamJeomScore: 0,
    technicalScore: 0,
  });
  
  const [redPlayer, setRedPlayer] = useState<Player>({
    name: 'Ethan',
    country: 'Italy',
    score: 0,
    headScore: 0,
    trunkScore: 0,
    gamJeomScore: 0,
    technicalScore: 0,
  });

  const handleScore = (player: 'blue' | 'red', points: number, type: 'head' | 'trunk' | 'gamJeom' | 'technical') => {
    const setPlayer = player === 'blue' ? setBluePlayer : setRedPlayer;
    const currentPlayer = player === 'blue' ? bluePlayer : redPlayer;

    setPlayer(prev => {
      const newScore = {
        ...prev,
        score: prev.score + points,
        [type + 'Score']: prev[type + 'Score'] + points,
      };
      
      toast(`${points} point(s) added to ${player.toUpperCase()} player`);
      return newScore;
    });
  };

  const handleTimeEnd = () => {
    setIsRunning(false);
    if (round < 3) {
      setRound(prev => prev + 1);
      toast(`Round ${round} completed!`);
    } else {
      toast('Match completed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Men's 55kg</h1>
          <h2 className="text-2xl text-tkd-gold">Match 1</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          <PlayerCard {...bluePlayer} color="blue" />
          <Timer 
            initialTime={120} 
            round={round} 
            isRunning={isRunning}
            onTimeEnd={handleTimeEnd}
          />
          <PlayerCard {...redPlayer} color="red" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <ScoreControls 
            onScore={(points, type) => handleScore('blue', points, type)}
            onStartStop={() => setIsRunning(!isRunning)}
            isRunning={isRunning}
          />
          <ScoreControls 
            onScore={(points, type) => handleScore('red', points, type)}
            onStartStop={() => setIsRunning(!isRunning)}
            isRunning={isRunning}
          />
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;