import React from 'react';
import Button from '@material-ui/core/Button';

import useGlobalState from '../useGlobalState';

import GoalCard from './GoalCard';
import Header from './Header';

const Goals = () => {
  // Global States
  const [game] = useGlobalState('game');
  const [, setScreen] = useGlobalState('screen');

  const handleResume = () => {
    setScreen(game.phase);
  };

  return (
    <div className="goals">
      <Header title="Goals" isGoalsDisabled />

      <div className="goals-list">
        {game.goals.map((card, index) => {
          return <GoalCard key={card.number} card={card} index={index} />;
        })}
      </div>

      <div className="goals__actions">
        <Button variant="outlined" className="btn btn--outline" onClick={handleResume}>
          Resume Game
        </Button>
      </div>
    </div>
  );
};

export default Goals;
