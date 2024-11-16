import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Participant {
  id: string;
  name: string;
  weight: number;
  rank: string;
  category: string;
}

interface Match {
  id: string;
  participant1: Participant | null;
  participant2: Participant | null;
  winner: Participant | null;
  round: number;
}

interface TournamentBracketProps {
  matches: Match[];
  onMatchUpdate: (match: Match) => void;
}

const TournamentBracket = ({ matches, onMatchUpdate }: TournamentBracketProps) => {
  const setWinner = (match: Match, winner: Participant) => {
    onMatchUpdate({
      ...match,
      winner
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] p-4">
        {matches.map((match) => (
          <Card key={match.id} className="p-4 mb-4">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div className="space-y-2">
                <div className="font-bold">{match.participant1?.name || 'TBD'}</div>
                <div className="text-sm text-gray-500">
                  {match.participant1 ? `${match.participant1.weight}kg - ${match.participant1.rank}` : ''}
                </div>
                {match.participant1 && !match.winner && (
                  <Button 
                    size="sm"
                    onClick={() => setWinner(match, match.participant1!)}
                  >
                    Set as Winner
                  </Button>
                )}
              </div>

              <div className="text-center">
                vs
              </div>

              <div className="space-y-2">
                <div className="font-bold">{match.participant2?.name || 'TBD'}</div>
                <div className="text-sm text-gray-500">
                  {match.participant2 ? `${match.participant2.weight}kg - ${match.participant2.rank}` : ''}
                </div>
                {match.participant2 && !match.winner && (
                  <Button 
                    size="sm"
                    onClick={() => setWinner(match, match.participant2!)}
                  >
                    Set as Winner
                  </Button>
                )}
              </div>
            </div>

            {match.winner && (
              <div className="mt-4 text-center text-green-600 font-bold">
                Winner: {match.winner.name}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TournamentBracket;