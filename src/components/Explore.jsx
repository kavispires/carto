import React from 'react';
import Button from '@material-ui/core/Button';

import useGlobalState from '../useGlobalState';

import gameEngine from '../engine';

import Header from './Header';
import Card from './Card';
import ExploreGoal from './ExploreGoal';

const PreviousCard = ({ previousCard, onClick }) => {
  const cardNumber = previousCard?.number || 0;

  return (
    <div className="explore-card explore-card--previous" onClick={onClick}>
      <Card id={cardNumber} className="card card--faded-left" />
    </div>
  );
};

const CurrentCard = ({ currentCard, previousCard }) => {
  return (
    <div className="explore-card explore-card--current">
      {previousCard?.type === 'ruin' ? (
        <Card id={previousCard.number} className="card-mini card-mini--ruin" />
      ) : null}
      <Card id={currentCard.number} />
    </div>
  );
};

const NextCard = ({ nextCard, onClick }) => {
  return (
    <div className="explore-card explore-card--next" onClick={onClick}>
      <Card id={0} className="card card--faded-right" />
    </div>
  );
};

const isGoalActive = (season, letter) => {
  return season.scores.some((score) => score.letter === letter);
};

const Explore = () => {
  // Global States
  const [game, setGame] = useGlobalState('game');
  const [, setScreen] = useGlobalState('screen');
  const [showGoals] = useGlobalState('showGoals');

  const handleNextCard = () => {
    setGame(gameEngine.goToNextCard());
    setScreen(gameEngine.state.phase);
  };

  const handlePreviousCard = () => {
    setGame(gameEngine.goToPreviousCard());
    setScreen(gameEngine.state.phase);
  };

  const { currentSeason, currentDuration } = game;

  return (
    <div className="explore">
      <Header title="Explore" isExploreDisabled />

      <h1 className="title">
        <Card id="season" className="card-icon card-icon--inline-title" prefix="icon-" />
        {currentSeason.name}
      </h1>

      <h2 className="subtitle">Time remaining: {currentDuration > -1 ? currentDuration : 0}</h2>

      <div className="explore-container">
        {showGoals && (
          <aside className="explore-goals explore-goals--left">
            <ExploreGoal
              card={game.goals[0]}
              index={0}
              side="left"
              isActive={isGoalActive(currentSeason, 'A')}
            />
            <ExploreGoal
              card={game.goals[1]}
              index={1}
              side="left"
              isActive={isGoalActive(currentSeason, 'B')}
            />
          </aside>
        )}

        <section
          className={`explore__playarea ${showGoals ? 'explore__playarea--with-goals' : ''}`}
        >
          <PreviousCard
            previousCard={game.previousCard}
            onClick={Boolean(game.previousCard) ? handlePreviousCard : null}
          />
          <CurrentCard currentCard={game.currentCard} previousCard={game.previousCard} />
          <NextCard nextCard={game.nextCard} onClick={handleNextCard} />
        </section>

        {showGoals && (
          <aside className="explore-goals explore-goals--right">
            <ExploreGoal
              card={game.goals[2]}
              index={2}
              side="right"
              isActive={isGoalActive(currentSeason, 'C')}
            />
            <ExploreGoal
              card={game.goals[3]}
              index={3}
              side="right"
              isActive={isGoalActive(currentSeason, 'D')}
            />
          </aside>
        )}
      </div>

      <div className="goals__actions">
        <Button
          variant="outlined"
          className="btn btn--outline"
          onClick={handlePreviousCard}
          disabled={!Boolean(game.previousCard)}
        >
          Previous Card
        </Button>
        <Button variant="outlined" className="btn btn--outline" onClick={handleNextCard}>
          {currentDuration > 0 ? 'Next Card' : 'Score'}
        </Button>
      </div>
    </div>
  );
};

export default Explore;
