import React, { useState, useEffect } from 'react';
import PlayerCard from '@/components/PlayerCard';
import Timer from '@/components/Timer';
import MatchHeader from '@/components/match/MatchHeader';
import { getMatchState, type MatchState } from '@/utils/matchState';
import { cn } from '@/lib/utils';

const Display = () => {
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Initial load
    setMatchState(getMatchState());

    // Set up polling for updates
    const interval = setInterval(() => {
      const newState = getMatchState();
      if (newState && JSON.stringify(newState) !== JSON.stringify(matchState)) {
        setIsUpdating(true);
        setTimeout(() => {
          setMatchState(newState);
          setIsUpdating(false);
        }, 150); // Short delay for animation
      }
    }, 100); // Poll every 100ms

    return () => clearInterval(interval);
  }, [matchState]);

  if (!matchState) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-fade-in">Waiting for match data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className={cn(
        "max-w-7xl mx-auto transition-opacity duration-300",
        isUpdating ? "opacity-80 scale-[0.99]" : "opacity-100 scale-100"
      )}>
        <MatchHeader 
          category={`${matchState.bluePlayer?.category || "Men's"} ${matchState.bluePlayer?.weight || "55"}kg`}
          matchNumber="Match"
          knockdownCount={matchState.knockdownCount}
        />
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div className={cn(
            "transition-transform duration-300",
            isUpdating ? "translate-x-1" : "translate-x-0"
          )}>
            <PlayerCard {...matchState.bluePlayer} color="blue" />
          </div>
          
          <div className={cn(
            "transition-transform duration-300",
            isUpdating ? "scale-[0.98]" : "scale-100"
          )}>
            <Timer 
              round={matchState.round}
              isRunning={matchState.isRunning}
              isRest={matchState.isRest}
              onTimeEnd={() => {}}
            />
          </div>
          
          <div className={cn(
            "transition-transform duration-300",
            isUpdating ? "-translate-x-1" : "translate-x-0"
          )}>
            <PlayerCard {...matchState.redPlayer} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;