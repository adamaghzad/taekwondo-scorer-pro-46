import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import PlayerCard from '@/components/PlayerCard';
import Timer from '@/components/Timer';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScoringType } from '@/utils/scoringUtils';
import MatchHeader from '@/components/match/MatchHeader';



type VictoryType = 'PTF' | 'RSC' | 'WDR' | 'DSQ' | 'DQB' | null;
type RSCReason = 'KO' | 'REFUSAL' | 'SAFETY' | 'MEDICAL' | null;

interface Player {
  name: string;
  country: string;
  score: number;
  punchScore: number;
  kickScore: number;
  turningKickScore: number;
  gamJeomScore: number;
  roundsWon: number;
}

const Display = () => {
  const location = useLocation();
  const { bluePlayer: initialBluePlayer, redPlayer: initialRedPlayer, matchId } = location.state || {};
  
  const [round, setRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isRest, setIsRest] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);
  const [victoryType, setVictoryType] = useState<VictoryType>(null);
  const [rscReason, setRscReason] = useState<RSCReason>(null);
  const [knockdownCount, setKnockdownCount] = useState(0);
  
  const [bluePlayer, setBluePlayer] = useState<Player>({
    name: initialBluePlayer?.name || 'Blue Player',
    country: initialBluePlayer?.team || 'Unknown',
    score: 0,
    punchScore: 0,
    kickScore: 0,
    turningKickScore: 0,
    gamJeomScore: 0,
    roundsWon: 0
  });
  
  const [redPlayer, setRedPlayer] = useState<Player>({
    name: initialRedPlayer?.name || 'Red Player',
    country: initialRedPlayer?.team || 'Unknown',
    score: 0,
    punchScore: 0,
    kickScore: 0,
    turningKickScore: 0,
    gamJeomScore: 0,
    roundsWon: 0
  });

  const endMatch = (winner: 'blue' | 'red', type: VictoryType, reason?: RSCReason) => {
    setMatchEnded(true);
    setIsRunning(false);
    setVictoryType(type);
    if (reason) setRscReason(reason);
    
    const winnerName = winner === 'blue' ? bluePlayer.name : redPlayer.name;
    const victoryMessage = `${winnerName} wins by ${type}${reason ? ` (${reason})` : ''}`;
    toast(victoryMessage);
  };

  const handleKnockdown = (player: 'blue' | 'red') => {
    setKnockdownCount(10);
    const countInterval = setInterval(() => {
      setKnockdownCount((prev) => {
        if (prev <= 1) {
          clearInterval(countInterval);
          endMatch(player === 'blue' ? 'red' : 'blue', 'RSC', 'KO');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const checkVictoryConditions = (currentPlayer: Player, otherPlayer: Player, color: 'blue' | 'red') => {
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

    // Check for winning 2 rounds (PTF)
    if (currentPlayer.roundsWon >= 2) {
      endMatch(color, 'PTF');
      return true;
    }

    return false;
  };

  const handleScore = (player: 'blue' | 'red', points: number, type: ScoringType) => {
    if (matchEnded) return;

    const setPlayer = player === 'blue' ? setBluePlayer : setRedPlayer;
    const currentPlayer = player === 'blue' ? bluePlayer : redPlayer;
    const otherPlayer = player === 'blue' ? redPlayer : bluePlayer;

    setPlayer(prev => {
      const newScore = {
        ...prev,
        score: prev.score + points,
        [`${type}Score`]: prev[`${type}Score`] + points,
      };
      
      toast(`${points} point(s) added to ${player.toUpperCase()} player`);
      
      if (checkVictoryConditions(newScore, otherPlayer, player)) {
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
      const winner = bluePlayer.roundsWon > redPlayer.roundsWon ? 'blue' : 'red';
      endMatch(winner, 'PTF');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <MatchHeader 
          category={`${initialBluePlayer?.category || "Men's"} ${initialBluePlayer?.weight || "55"}kg`}
          matchNumber={`Match ${matchId || 1}`}
          knockdownCount={knockdownCount}
        />
        
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

       
        
      </div>
    </div>
  );
};

export default Display;
