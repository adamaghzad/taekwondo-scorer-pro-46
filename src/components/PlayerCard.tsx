import React from 'react';

interface PlayerCardProps {
  name: string;
  country: string;
  color: 'blue' | 'red';
  score: number;
  headScore: number;
  trunkScore: number;
  gamJeomScore: number;
  technicalScore: number;
  roundsWon: number;
}

const PlayerCard = ({
  name,
  country,
  color,
  score,
  headScore,
  trunkScore,
  gamJeomScore,
  technicalScore,
  roundsWon,
}: PlayerCardProps) => {
  const bgColor = color === 'blue' ? 'bg-tkd-blue' : 'bg-tkd-red';
  
  return (
    <div className={`${bgColor} p-6 rounded-lg text-white w-[400px]`}>
      <div className="text-4xl font-bold mb-4">{name}</div>
      <div className="text-2xl mb-6">{country}</div>
      <div className="text-8xl font-bold mb-8">{score}</div>
      <div className="grid grid-cols-2 gap-4 text-xl">
        <div>
          <div>Head</div>
          <div className="font-bold">{headScore}</div>
        </div>
        <div>
          <div>Trunk</div>
          <div className="font-bold">{trunkScore}</div>
        </div>
        <div>
          <div>Gam-jeom</div>
          <div className="font-bold">{gamJeomScore}</div>
        </div>
        <div>
          <div>Technical</div>
          <div className="font-bold">{technicalScore}</div>
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