import React from 'react';

import { GOAL_TYPE } from '../utils/constants';
import CARDS from '../utils/cards';

import Card from './Card';

const GoalCard = ({ card, index, isActive = true }) => (
  <div className={`goal-card ${isActive ? '' : 'goal-card--inactive'}`}>
    <div className="goal-card__types">
      <Card id={CARDS.EDICT_CARDS[index].number} className="card-mini" />
      <Card id={GOAL_TYPE[card.type]} className="card-icon card-icon--selected" prefix="icon-" />
    </div>
    <div className="goal-card__main">
      <Card id={card.number} />
      <p className="goal-card__effect">{card.effect}</p>
    </div>
  </div>
);

export default GoalCard;
