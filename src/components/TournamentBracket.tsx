import React from 'react';
import { Tournament, Match } from '@/types/tournament';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface TournamentBracketProps {
  tournament: Tournament;
  onMatchSelect: (matchId: string) => void;
}

const TournamentBracket: React.FC<TournamentBracketProps> = ({ tournament, onMatchSelect }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-8 p-4 min-w-[800px]">
        {tournament.rounds.map((round) => (
          <div
            key={round.roundNumber}
            className="flex flex-col gap-4"
            style={{
              marginTop: `${(Math.pow(2, round.roundNumber - 1) - 1) * 2}rem`,
              marginBottom: `${(Math.pow(2, round.roundNumber - 1) - 1) * 2}rem`,
            }}
          >
            <div className="text-center font-bold mb-2">
              Round {round.roundNumber}
            </div>
            {round.matches.map((match) => (
              <div
                key={match.id}
                className="flex flex-col"
                style={{
                  marginBottom: `${Math.pow(2, round.roundNumber) * 4}rem`,
                }}
              >
                <Card className="w-64 cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => onMatchSelect(match.id)}>
                  <CardContent className="p-4">
                    <div className={`p-2 ${match.winner === 'blue' ? 'bg-blue-100' : ''}`}>
                      {match.blueParticipant?.name || 'TBD'}
                    </div>
                    <div className="h-px bg-gray-200 my-2" />
                    <div className={`p-2 ${match.winner === 'red' ? 'bg-red-100' : ''}`}>
                      {match.redParticipant?.name || 'TBD'}
                    </div>
                    {match.winner && (
                      <div className="text-xs text-gray-500 mt-2">
                        Winner by {match.victoryType}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;