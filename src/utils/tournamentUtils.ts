import { Match, Participant, Tournament, TournamentRound } from '@/types/tournament';

export const generateBracket = (participants: Participant[]): Tournament => {
  const numberOfParticipants = participants.length;
  const rounds = Math.ceil(Math.log2(numberOfParticipants));
  const totalMatches = Math.pow(2, rounds) - 1;

  const tournament: Tournament = {
    id: crypto.randomUUID(),
    name: "Tournament",
    category: participants[0]?.category || "Unknown",
    rounds: []
  };

  // Generate first round matches
  const firstRoundMatches: Match[] = [];
  for (let i = 0; i < numberOfParticipants; i += 2) {
    firstRoundMatches.push({
      id: crypto.randomUUID(),
      roundNumber: 1,
      matchNumber: Math.floor(i / 2) + 1,
      blueParticipant: participants[i] || null,
      redParticipant: participants[i + 1] || null,
      winner: null
    });
  }

  tournament.rounds.push({
    roundNumber: 1,
    matches: firstRoundMatches
  });

  // Generate subsequent empty rounds
  for (let round = 2; round <= rounds; round++) {
    const matchesInRound = Math.pow(2, rounds - round);
    const roundMatches: Match[] = [];

    for (let match = 1; match <= matchesInRound; match++) {
      roundMatches.push({
        id: crypto.randomUUID(),
        roundNumber: round,
        matchNumber: match,
        blueParticipant: null,
        redParticipant: null,
        winner: null
      });
    }

    tournament.rounds.push({
      roundNumber: round,
      matches: roundMatches
    });
  }

  return tournament;
};

export const updateBracket = (tournament: Tournament, matchId: string, winner: 'blue' | 'red', victoryType: 'PTF' | 'RSC' | 'WDR' | 'DSQ' | 'DQB'): Tournament => {
  const updatedTournament = { ...tournament };
  let updatedMatch: Match | null = null;

  // Find and update the match
  for (const round of updatedTournament.rounds) {
    const match = round.matches.find(m => m.id === matchId);
    if (match) {
      match.winner = winner;
      match.victoryType = victoryType;
      updatedMatch = match;
      break;
    }
  }

  if (!updatedMatch) return tournament;

  // Update next round's match
  const currentRound = updatedMatch.roundNumber;
  const nextRound = updatedTournament.rounds.find(r => r.roundNumber === currentRound + 1);
  
  if (nextRound) {
    const nextMatchNumber = Math.ceil(updatedMatch.matchNumber / 2);
    const nextMatch = nextRound.matches.find(m => m.matchNumber === nextMatchNumber);
    
    if (nextMatch) {
      const isBlueSlot = updatedMatch.matchNumber % 2 !== 0;
      const winningParticipant = winner === 'blue' ? updatedMatch.blueParticipant : updatedMatch.redParticipant;
      
      if (isBlueSlot) {
        nextMatch.blueParticipant = winningParticipant;
      } else {
        nextMatch.redParticipant = winningParticipant;
      }
    }
  }

  return updatedTournament;
};