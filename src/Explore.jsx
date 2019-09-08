import React from 'react';

// Import Components
import Card from './Card';

const PreviousCard = ({ previousCard }) => {
  const cardNumber = previousCard.number || 0;

  return (
    <div className="explore-card">
      <Card id={cardNumber} className="card card--faded-left" />
    </div>
  );
};

const CurrentCard = ({ currentCard, previousCard }) => {
  return (
    <div className="explore-card">
      {previousCard.type === 'ruin' ? (
        <Card id={previousCard.number} className="card-mini card-mini--ruin" />
      ) : null}
      <Card id={currentCard.number} />
    </div>
  );
};

const NextCard = () => {
  return (
    <div className="explore-card">
      <Card id={0} className="card card--faded-right" />
    </div>
  );
};

const Explore = ({ state, nextTurn }) => {
  const { currentSeason, currentDuration, currentCard, previousCard } = state;

  const timeRemaining = currentSeason.duration - currentDuration;
  return (
    <main>
      <h1 className="title">
        <Card
          id="season"
          className="card-icon card-icon--inline-title"
          prefix="icon-"
        />
        {currentSeason.name}
      </h1>
      <h2 className="subtitle">
        Time remaining: {timeRemaining > -1 ? timeRemaining : 0}
      </h2>
      <section className="playarea">
        <PreviousCard previousCard={previousCard} />
        <CurrentCard currentCard={currentCard} previousCard={previousCard} />
        <NextCard />
      </section>
      <footer>
        <button className="btn btn--primary" onClick={() => nextTurn()}>
          {timeRemaining > 0 ? 'Next Turn' : 'Score Season'}
        </button>
      </footer>
    </main>
  );
};

export default Explore;
