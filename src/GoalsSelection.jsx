import React from 'react';

// Import Data
import CARDS from './cards';
// Import Components
import Card from './Card';

const ICONS = {
  farmlands: 'farmlands-icon',
  forests: 'forests-icon',
  territory: 'territory-icon',
  villages: 'villages-icon',
};

const Goal = ({
  goalType,
  isGoalsReady,
  letterCard,
  selectGoalCard,
  selectedGoalCard,
  selectRandomGoalCard,
}) => {
  return (
    <div className="goal-options">
      {Boolean(selectedGoalCard) ? (
        <div className="card-container">
          <Card id={letterCard.number} className="card-mini" />
          <Card id={ICONS[goalType]} className="card-icon" />
          <Card id={selectedGoalCard.number} />
        </div>
      ) : (
        <Card id={letterCard.number} />
      )}
      <div className="select">
        <select
          onChange={e => selectGoalCard(e.target.value, letterCard.letter)}
          defaultValue=""
        >
          <option value="" disabled>
            Select a Goal
          </option>
          {CARDS.GOAL_CARDS.map(card => (
            <option
              key={card.number}
              value={card.number}
              disabled={goalType && card.type !== goalType}
            >
              {card.name} ({card.type})
            </option>
          ))}
        </select>
        <div className="select-arrow" />
      </div>
      <button
        className="btn btn--secondary btn--wide"
        onClick={() => selectRandomGoalCard(letterCard.letter)}
        disabled={isGoalsReady}
      >
        Random
      </button>
    </div>
  );
};

const GoalsSelection = ({
  selectGoalCard,
  selectRandomGoalCard,
  state,
  switchTabs,
}) => {
  return (
    <main>
      <h1 className="title">Select Goals</h1>
      <ul className="goals-selection">
        {Object.entries(state.goals).map(([key, value], index) => {
          const letterCard = CARDS.LETTER_CARDS[index];

          return (
            <Goal
              key={key}
              letterCard={letterCard}
              selectGoalCard={selectGoalCard}
              selectedGoalCard={state.goals[letterCard.letter]}
              goalType={state.goalsType[letterCard.letter]}
              selectRandomGoalCard={selectRandomGoalCard}
              isGoalsReady={state.isGoalsReady}
            />
          );
        })}
      </ul>
      <footer>
        <button
          className="btn btn--primary"
          onClick={() => switchTabs('game')}
          disabled={!state.isGoalsReady}
        >
          Confirm
        </button>
      </footer>
    </main>
  );
};

export default GoalsSelection;
