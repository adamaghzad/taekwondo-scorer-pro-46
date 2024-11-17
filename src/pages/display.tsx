import React, { useState, useEffect } from 'react';
import PlayerCard from '@/components/PlayerCard';
import Timer from '@/components/Timer';
import MatchHeader from '@/components/match/MatchHeader';
import { getMatchState, type MatchState } from '@/utils/matchState';

const Display = () => {
  const [matchState, setMatchState] = useState<MatchState | null>(null);

  useEffect(() => {
    // Initial load
    setMatchState(getMatchState());

    // Set up polling for updates
    const interval = setInterval(() => {
      const newState = getMatchState();
      if (newState) {
        setMatchState(newState);
      }
    }, 100); // Poll every 100ms

    return () => clearInterval(interval);
  }, []);

  if (!matchState) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Waiting for match data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <MatchHeader 
          category={`${matchState.bluePlayer.category || "Men's"} ${matchState.bluePlayer.weight || "55"}kg`}
          matchNumber="Match"
          knockdownCount={matchState.knockdownCount}
        />
        
        <div className="grid grid-cols-3 gap-8 mb-8">
          <PlayerCard {...matchState.bluePlayer} color="blue" />
          <Timer 
            round={matchState.round}
            isRunning={matchState.isRunning}
            isRest={matchState.isRest}
            onTimeEnd={() => {}}
          />
          <PlayerCard {...matchState.redPlayer} color="red" />
        </div>
      </div>
    </div>
  );
};

export default Display;