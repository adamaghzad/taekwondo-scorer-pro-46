export type ScoringType = 'punch' | 'kick' | 'turningKick' | 'gamJeom';

export const getPointsForAction = (type: ScoringType): number => {
  switch (type) {
    case 'punch':
      return 1;
    case 'kick':
      return 2;
    case 'turningKick':
      return 4;
    case 'gamJeom':
      return 1;
    default:
      return 0;
  }
};