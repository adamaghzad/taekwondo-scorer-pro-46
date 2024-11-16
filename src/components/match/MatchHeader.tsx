import React from 'react';

interface MatchHeaderProps {
  category?: string;
  matchNumber?: string;
  knockdownCount: number;
}

const MatchHeader = ({ category = "Men's 55kg", matchNumber = "Match 1", knockdownCount }: MatchHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-white mb-2">{category}</h1>
      <h2 className="text-2xl text-tkd-gold">{matchNumber}</h2>
      {knockdownCount > 0 && (
        <div className="text-6xl text-red-500 font-bold mt-4">
          {knockdownCount}
        </div>
      )}
    </div>
  );
};

export default MatchHeader;