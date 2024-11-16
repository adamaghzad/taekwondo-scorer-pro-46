import React, { useState } from 'react';
import { Tournament, Participant } from '@/types/tournament';
import { generateBracket, updateBracket } from '@/utils/tournamentUtils';
import TournamentBracket from './TournamentBracket';
import Scoreboard from './Scoreboard';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { toast } from 'sonner';

const SAMPLE_PARTICIPANTS: Participant[] = [
  { id: '1', name: 'John Doe', country: 'USA', weight: '68kg', category: "Men's" },
  { id: '2', name: 'Jane Smith', country: 'GBR', weight: '68kg', category: "Men's" },
  { id: '3', name: 'Mario Rossi', country: 'ITA', weight: '68kg', category: "Men's" },
  { id: '4', name: 'Liu Wei', country: 'CHN', weight: '68kg', category: "Men's" },
];

const TournamentManager = () => {
  const [tournament, setTournament] = useState<Tournament>(generateBracket(SAMPLE_PARTICIPANTS));
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  const [showScoreboard, setShowScoreboard] = useState(false);

  const handleMatchComplete = (matchId: string, winner: 'blue' | 'red', victoryType: 'PTF' | 'RSC' | 'WDR' | 'DSQ' | 'DQB') => {
    const updatedTournament = updateBracket(tournament, matchId, winner, victoryType);
    setTournament(updatedTournament);
    setShowScoreboard(false);
    toast("Match result recorded");
  };

  const handleMatchSelect = (matchId: string) => {
    setSelectedMatchId(matchId);
    setShowScoreboard(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Tournament Bracket</h1>
        <Button onClick={handlePrint}>Print Bracket</Button>
      </div>

      <TournamentBracket 
        tournament={tournament}
        onMatchSelect={handleMatchSelect}
      />

      <Dialog open={showScoreboard} onOpenChange={setShowScoreboard}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Match Scoring</DialogTitle>
          </DialogHeader>
          {selectedMatchId && (
            <Scoreboard
              onMatchComplete={(winner, victoryType) => 
                handleMatchComplete(selectedMatchId, winner, victoryType)
              }
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TournamentManager;