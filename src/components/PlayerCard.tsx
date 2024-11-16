import React from 'react';

interface PlayerCardProps {
  name: string;
  country: string;
  team?: string;
  color: 'blue' | 'red';
  score: number;
  punchScore: number;
  kickScore: number;
  turningKickScore: number;
  gamJeomScore: number;
  roundsWon: number;
}

const PlayerCard = ({
  name,
  country,
  team,
  color,
  score,
  punchScore,
  kickScore,
  turningKickScore,
  gamJeomScore,
  roundsWon,
}: PlayerCardProps) => {
  const bgColor = color === 'blue' ? 'bg-tkd-blue' : 'bg-tkd-red';
  
  return (
    <div className={`${bgColor} p-6 rounded-lg text-white w-[400px]`}>
      <div className="text-4xl font-bold mb-4">{name}</div>
      <div className="text-2xl mb-2">{country}</div>
      <div className="bg-black/30 p-3 rounded-md mb-6">
        <div className="text-2xl font-digital text-tkd-gold font-bold tracking-wider">
          {team || 'Independent'}
        </div>
      </div>
      <div className="text-8xl font-bold mb-8">{score}</div>
      <div className="grid grid-cols-2 gap-4 text-xl">
        <div>
          <div>Punch</div>
          <div className="font-bold">{punchScore}</div>
        </div>
        <div>
          <div>Kick</div>
          <div className="font-bold">{kickScore}</div>
        </div>
        <div>
          <div>Turning Kick</div>
          <div className="font-bold">{turningKickScore}</div>
        </div>
        <div>
          <div>Gam-jeom</div>
          <div className="font-bold">{gamJeomScore}</div>
        </div>
      </div>
      <div className="mt-4 text-tkd-gold">
        <div>Rounds Won</div>
        <div className="font-bold text-2xl">{roundsWon}</div>
      </div>
    </div>
  );
};

export default PlayerCard;