import { useLocation, Navigate } from 'react-router-dom';
import Scoreboard from '@/components/Scoreboard';
import { getMatchState } from '@/utils/matchState';

const Index = () => {
  const location = useLocation();
  const { state } = location;

  // If we don't have state from router, try to get it from localStorage
  if (!state?.bluePlayer || !state?.redPlayer) {
    const savedState = getMatchState();
    if (savedState) {
      // Convert saved match state back to router state format
      return (
        <Scoreboard />
      );
    }
    // If no state at all, redirect to tournament page
    return <Navigate to="/" replace />;
  }

  return <Scoreboard />;
};

export default Index;