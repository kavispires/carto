import React from 'react';
import Button from '@material-ui/core/Button';

import useGlobalState from '../useGlobalState';
import CARDS from '../utils/cards';

import Header from './Header';
import GoalCard from './GoalCard';

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
          console.log(card, index);
          console.log(CARDS.EDICT_CARDS[index].number);
          return <GoalCard key={card.number} card={card} index={index} />;
        })}
      </div>

      <div className="home__actions">
        <Button variant="outlined" className="btn" onClick={handleResume}>
          Resume Game
        </Button>
      </div>
    </div>
  );
};

export default Goals;
