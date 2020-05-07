import React from 'react';

import CARDS from '../utils/cards';
import { GOAL_TYPE } from '../utils/constants';

import Card from './Card';

const ExploreGoal = ({ card, index, side, isActive }) => {
  return (
    <div className={`explore-goal explore-goal--${side} ${isActive ? 'explore-goal--active' : ''}`}>
      <div className="icons">
        <Card id={CARDS.EDICT_CARDS[index].number} className="card-mini" />
        <Card id={GOAL_TYPE[card.type]} className="card-icon card-icon--selected" prefix="icon-" />
      </div>
      <span className="effect">{card.effect}</span>
    </div>
  );
};

export default ExploreGoal;
