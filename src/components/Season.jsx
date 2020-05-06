import React from 'react';
import Button from '@material-ui/core/Button';

import useGlobalState from '../useGlobalState';

import gameEngine from '../engine';

import Header from './Header';
import GoalCard from './GoalCard';
import Card from './Card';

const Season = () => {
  // Global States
  const [game, setGame] = useGlobalState('game');
  const [, setScreen] = useGlobalState('screen');

  const handleStartSeason = () => {
    gameEngine.startSeason();
    setGame(gameEngine.state);
    setScreen(gameEngine.state.phase);
  };

  const { currentSeason } = game;

  return (
    <div className="season">
      <Header title="New Season" isGoalsDisabled />

      <h1 className="title">
        <Card id="season" className="card-icon card-icon--inline-title" prefix="icon-" />
        {currentSeason.name}
      </h1>

      <h2 className="subtitle">
        Duration: {currentSeason.duration} | Scoring:{' '}
        {currentSeason.scores.map((c) => c.letter).join(' & ')}
      </h2>

      <div className="goals-list">
        {game.goals.map((card, index) => {
          const isActive = Boolean(currentSeason.scores.find((card) => card.index === index));
          return <GoalCard key={card.number} card={card} index={index} isActive={isActive} />;
        })}
      </div>

      <div className="goals__actions">
        <Button variant="outlined" className="btn btn--outline" onClick={handleStartSeason}>
          Start Season
        </Button>
      </div>
    </div>
  );
};

export default Season;
