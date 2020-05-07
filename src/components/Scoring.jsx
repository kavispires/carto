import React from 'react';
import Button from '@material-ui/core/Button';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';

import Card from './Card';
import GoalCard from './GoalCard';
import Header from './Header';

const Scoring = () => {
  // Global States
  const [game, setGame] = useGlobalState('game');
  const [, setScreen] = useGlobalState('screen');

  const handleNewStartSeason = () => {
    setGame(gameEngine.startNewSeason());
    setScreen(gameEngine.state.phase);
  };

  const { currentSeason } = game;

  return (
    <div className="scoring">
      <Header title={`Score ${currentSeason.name}`} isGoalsDisabled isExploreDisabled />

      <h1 className="title">
        <Card id="season" className="card-icon card-icon--inline-title" prefix="icon-" />
        Score for {currentSeason.name}
      </h1>

      <ul className="score-items">
        <li>Calculate your points for {currentSeason.scores[0].letter}.</li>
        <li>Calculate your points for {currentSeason.scores[1].letter}.</li>
        <li>Add 1 point for each unused coin you have.</li>
        <li>Subtract 1 point for each Monster adjacent square that is not filled.</li>
      </ul>

      <div className="goals-list">
        {game.goals.map((card, index) => {
          const isActive = Boolean(currentSeason.scores.find((card) => card.index === index));
          return <GoalCard key={card.number} card={card} index={index} isActive={isActive} />;
        })}
      </div>

      <div className="goals__actions">
        <Button variant="outlined" className="btn btn--outline" onClick={handleNewStartSeason}>
          {currentSeason.name !== 'Winter' ? 'Start New Season' : 'End Game'}
        </Button>
      </div>
    </div>
  );
};

export default Scoring;
