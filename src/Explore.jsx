import React from 'react';

// Import Data
import CARDS from './cards';
// Import Components
import Card from './Card';

const PreviousCard = ({ props }) => {
  return (
    <div className="something">
      <Card id={1} className="card card--faded-left" />
    </div>
  );
};

const CurrentCard = ({ props }) => {
  return (
    <div className="something">
      <Card id={2} />
    </div>
  );
};

const NextCard = ({ props }) => {
  return (
    <div className="something">
      <Card id={0} className="card card--faded-right" />
    </div>
  );
};

const Explore = ({
  selectGoalCard,
  selectRandomGoalCard,
  state,
  switchTabs,
}) => {
  return (
    <main>
      <h1 className="title">
        <Card
          id="season"
          className="card-icon card-icon--inline-title"
          prefix="icon-"
        />
        Spring 0/8
      </h1>
      <section className="playarea">
        <PreviousCard />
        <CurrentCard />
        <NextCard />
      </section>
      <footer>
        <button
          className="btn btn--primary"
          onClick={() => switchTabs('game')}
          disabled={!state}
        >
          Next
        </button>
      </footer>
    </main>
  );
};

export default Explore;
