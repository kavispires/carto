import React from 'react';

// Import Data
import CARDS from './cards';
// Import Components
import Card from './Card';

const Season = ({ state, startSeason }) => {
  const { currentSeason, goals } = state;

  if (currentSeason.number) {
    return (
      <main>
        <h1 className="title">
          {' '}
          <Card
            id="season"
            className="card-icon card-icon--inline-title"
            prefix="icon-"
          />
          Next Season: {currentSeason.name}
        </h1>
        <h2 className="subtitle">
          Duration: {currentSeason.duration} | Scoring:{' '}
          {currentSeason.scores.join(' & ')}
        </h2>
        <section className="seasonarea">
          {Object.entries(goals).map(([key, goal]) => {
            const highlightClass = currentSeason.scores.includes(key)
              ? 'scoring-card--active'
              : '';
            return (
              <div className={`scoring-card ${highlightClass}`}>
                <Card key={goal.number} id={goal.number} />
                <p className="card-description">{goal.effect}</p>
              </div>
            );
          })}
        </section>
        <footer>
          <button
            className="btn btn--primary"
            onClick={() => startSeason('game')}
          >
            Begin Season
          </button>
        </footer>
      </main>
    );
  }

  return <div></div>;
};

export default Season;
