export interface MatchState {
  bluePlayer: {
    name: string;
    country: string;
    team?: string;
    age?: number;
    weight?: number;
    score: number;
    punchScore: number;
    kickScore: number;
    turningKickScore: number;
    gamJeomScore: number;
    roundsWon: number;
  };
  redPlayer: {
    name: string;
    country: string;
    team?: string;
    age?: number;
    weight?: number;
    score: number;
    punchScore: number;
    kickScore: number;
    turningKickScore: number;
    gamJeomScore: number;
    roundsWon: number;
  };
  round: number;
  isRunning: boolean;
  isRest: boolean;
  knockdownCount: number;
}

const MATCH_STATE_KEY = 'current_match_state';

export const saveMatchState = (state: MatchState) => {
  localStorage.setItem(MATCH_STATE_KEY, JSON.stringify(state));
};

export const getMatchState = (): MatchState | null => {
  const saved = localStorage.getItem(MATCH_STATE_KEY);
  return saved ? JSON.parse(saved) : null;
};