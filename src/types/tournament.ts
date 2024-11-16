export interface Participant {
  id: string;
  name: string;
  country: string;
  weight: string;
  category: string;
}

export interface Match {
  id: string;
  roundNumber: number;
  matchNumber: number;
  blueParticipant: Participant | null;
  redParticipant: Participant | null;
  winner: 'blue' | 'red' | null;
  victoryType?: 'PTF' | 'RSC' | 'WDR' | 'DSQ' | 'DQB';
}

export interface TournamentRound {
  roundNumber: number;
  matches: Match[];
}

export interface Tournament {
  id: string;
  name: string;
  category: string;
  rounds: TournamentRound[];
}