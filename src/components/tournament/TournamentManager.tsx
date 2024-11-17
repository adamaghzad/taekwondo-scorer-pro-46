import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import TournamentBracket from './TournamentBracket';
import ParticipantForm from './ParticipantForm';
import { Match, Participant } from '@/types/tournament';

const STORAGE_KEY = 'tournament_brackets';

const TournamentManager = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [showBracket, setShowBracket] = useState(false);

  // Load saved brackets on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { participants: savedParticipants, matches: savedMatches } = JSON.parse(savedData);
      setParticipants(savedParticipants);
      setMatches(savedMatches);
      setShowBracket(savedMatches.length > 0);
    }
  }, []);

  // Save brackets whenever they change
  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ participants, matches }));
      toast.success("Brackets saved successfully!");
    }
  }, [matches, participants]);

  const generateBrackets = () => {
    if (participants.length < 2) {
      toast.error("Need at least 2 participants to generate brackets");
      return;
    }

    const sortedParticipants = [...participants].sort((a, b) => {
      if (a.weight === b.weight) {
        return a.rank.localeCompare(b.rank);
      }
      return a.weight - b.weight;
    });

    const newMatches: Match[] = [];
    for (let i = 0; i < sortedParticipants.length; i += 2) {
      newMatches.push({
        id: `match-${i/2}`,
        participant1: sortedParticipants[i] || null,
        participant2: sortedParticipants[i + 1] || null,
        winner: null,
        round: 1,
        isComplete: false
      });
    }

    setMatches(newMatches);
    setShowBracket(true);
    toast.success("Tournament brackets generated successfully!");
  };

  const exportBrackets = () => {
    const bracketData = {
      participants,
      matches
    };
    
    const dataStr = JSON.stringify(bracketData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'tournament-brackets.json');
    linkElement.click();
    
    toast.success("Brackets exported successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tournament Manager</h1>
      
      <Card className="p-6 mb-6">
        <ParticipantForm 
          onAddParticipant={(participant) => {
            setParticipants([...participants, participant]);
            toast.success(`Added participant: ${participant.name}`);
          }}
        />
      </Card>

      <div className="flex gap-4 mb-6">
        <Button onClick={generateBrackets}>Generate Brackets</Button>
        <Button onClick={exportBrackets} disabled={matches.length === 0}>
          Export Brackets
        </Button>
      </div>

      {showBracket && (
        <TournamentBracket 
          matches={matches}
          onMatchUpdate={(updatedMatch) => {
            setMatches(matches.map(match => 
              match.id === updatedMatch.id ? updatedMatch : match
            ));
            if (updatedMatch.winner) {
              toast.success(`Match completed! Winner: ${updatedMatch.winner.name}`);
            }
          }}
        />
      )}
    </div>
  );
};

export default TournamentManager;