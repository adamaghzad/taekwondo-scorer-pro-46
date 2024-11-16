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
  roundsWon: number;
}

const Scoreboard = () => {
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);
  
  const [bluePlayer, setBluePlayer] = useState<Player>({
    name: 'Eric',
    country: 'England',
    score: 0,
    headScore: 0,
    trunkScore: 0,
    gamJeomScore: 0,
    technicalScore: 0,
    roundsWon: 0
  });
  
  const [redPlayer, setRedPlayer] = useState<Player>({
    name: 'Ethan',
    country: 'Italy',
    score: 0,
    headScore: 0,
    trunkScore: 0,
    gamJeomScore: 0,
    technicalScore: 0,
    roundsWon: 0
  });

  const checkVictoryConditions = (currentPlayer: Player, otherPlayer: Player) => {
    // Check for 5 Gam-jeom victory
    if (currentPlayer.gamJeomScore >= 5) {
      otherPlayer.roundsWon++;
      return true;
    }

    // Check for 12-point difference (PTG)
    if (Math.abs(currentPlayer.score - otherPlayer.score) >= 12) {
      if (currentPlayer.score > otherPlayer.score) {
        currentPlayer.roundsWon++;
      } else {
        otherPlayer.roundsWon++;
      }
      return true;
    }

    return false;
  };

  const handleScore = (player: 'blue' | 'red', points: number, type: 'head' | 'trunk' | 'gamJeom' | 'technical') => {
    if (matchEnded) return;

    const setPlayer = player === 'blue' ? setBluePlayer : setRedPlayer;
    const currentPlayer = player === 'blue' ? bluePlayer : redPlayer;
    const otherPlayer = player === 'blue' ? redPlayer : bluePlayer;

    setPlayer(prev => {
      const newScore = {
        ...prev,
        score: prev.score + points,
        [type + 'Score']: prev[type + 'Score'] + points,
      };
      
      toast(`${points} point(s) added to ${player.toUpperCase()} player`);
      
      if (checkVictoryConditions(newScore, otherPlayer)) {
        toast(`Round ${round} victory condition met!`);
        handleTimeEnd();
      }
      
      return newScore;
    });
  };

  const handleTimeEnd = () => {
    setIsRunning(false);
    
    if (isRest) {
      setIsRest(false);
      setRound(prev => prev + 1);
      toast(`Round ${round} starting!`);
    } else if (round < 3) {
      setIsRest(true);
      // Determine round winner if no victory condition was met
      if (bluePlayer.score > redPlayer.score) {
        setBluePlayer(prev => ({ ...prev, roundsWon: prev.roundsWon + 1 }));
      } else if (redPlayer.score > bluePlayer.score) {
        setRedPlayer(prev => ({ ...prev, roundsWon: prev.roundsWon + 1 }));
      }
      toast(`Rest period starting!`);
    } else {
      setMatchEnded(true);
      const winner = bluePlayer.roundsWon > redPlayer.roundsWon ? 'BLUE' : 'RED';
      toast(`Match completed! ${winner} player wins!`);
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
            round={round}
            isRunning={isRunning}
            isRest={isRest}
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