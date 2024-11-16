import React from 'react';
import { Button } from '../ui/button';
import ScoreControls from '../ScoreControls';

interface MatchControlsProps {
  onScore: (player: 'blue' | 'red', points: number, type: any) => void;
  onStartStop: () => void;
  onKnockdown: (player: 'blue' | 'red') => void;
  isRunning: boolean;
}

const MatchControls = ({ onScore, onStartStop, onKnockdown, isRunning }: MatchControlsProps) => {
  return (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <ScoreControls 
          onScore={(points, type) => onScore('blue', points, type)}
          onStartStop={onStartStop}
          isRunning={isRunning}
        />
        <div className="mt-4">
          <Button onClick={() => onKnockdown('blue')} 
            className="bg-red-500 hover:bg-red-600">
            Blue Knockdown
          </Button>
        </div>
      </div>
      <div>
        <ScoreControls 
          onScore={(points, type) => onScore('red', points, type)}
          onStartStop={onStartStop}
          isRunning={isRunning}
        />
        <div className="mt-4">
          <Button onClick={() => onKnockdown('red')} 
            className="bg-red-500 hover:bg-red-600">
            Red Knockdown
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchControls;