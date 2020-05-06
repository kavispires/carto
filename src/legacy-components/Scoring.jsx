import React from 'react';

// Import Components
import Card from './Card';

const Scoring = ({ state, nextTurn }) => {
  const { currentSeason, goals } = state;

  if (currentSeason.number) {
    return (
      <main>
        <h1 className="title">
          <Card id="season" className="card-icon card-icon--inline-title" prefix="icon-" />
          Scoring Season: {currentSeason.name}
        </h1>
        <h2 className="subtitle">Scoring: {currentSeason.scores.join(' & ')}</h2>
        <section className="seasonarea">
          {currentSeason.scores.map((letter) => {
            const goal = goals[letter];
            return (
              <div
                key={`scoring-card-${goal.number}`}
                className="scoring-card scoring-card--scoring"
              >
                <Card id={goal.number} />
                <p className="card-description">{goal.effect}</p>
              </div>
            );
          })}
        </section>
        <footer>
          {currentSeason.name !== 'Winter' ? (
            <button className="btn btn--primary" onClick={() => nextTurn()}>
              Go to Next Season
            </button>
          ) : null}
        </footer>
      </main>
    );
  }

  return <div></div>;
};

export default Scoring;
