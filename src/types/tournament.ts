export interface Participant {
  id: string;
  name: string;
  weight: number;
  age: number;
  rank: string;
  team?: string;
  country: string;
}

export interface Match {
  id: string;
  participant1: Participant | null;
  participant2: Participant | null;
  winner: Participant | null;
  round: number;
  isComplete: boolean;
}