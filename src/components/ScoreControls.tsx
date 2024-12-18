import React from 'react';
import { Button } from '@/components/ui/button';
import { ScoringType } from '@/utils/scoringUtils';

interface ScoreControlsProps {
  onScore: (points: number, type: ScoringType) => void;
  onStartStop: () => void;
  isRunning: boolean;
}

const ScoreControls = ({ onScore, onStartStop, isRunning }: ScoreControlsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg">
      <div className="space-y-2">
        <h3 className="font-bold text-lg mb-2">Scoring Controls</h3>
        <Button 
          onClick={() => onScore(1, 'punch')}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          Punch (+1)
        </Button>
        <Button 
          onClick={() => onScore(2, 'kick')}
          className="w-full bg-green-500 hover:bg-green-600"
        >
          Kick (+2)
        </Button>
        <Button 
          onClick={() => onScore(4, 'turningKick')}
          className="w-full bg-purple-500 hover:bg-purple-600"
        >
          Turning Kick (+4)
        </Button>
        <Button 
          onClick={() => onScore(1, 'gamJeom')}
          className="w-full bg-red-500 hover:bg-red-600"
        >
          Gam-jeom (+1)
        </Button>
      </div>
      <div>
        <Button 
          onClick={onStartStop}
          className={`w-full ${isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isRunning ? 'Stop Timer' : 'Start Timer'}
        </Button>
      </div>
    </div>
  );
};

export default ScoreControls;