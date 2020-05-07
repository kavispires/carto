import React from 'react';
import Button from '@material-ui/core/Button';

import logo from '../images/carto-logo.svg';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';
import { SCREENS } from '../utils/constants';

import Header from './Header';

const GameOver = () => {
  // Global States
  const [, setGame] = useGlobalState('game');
  const [, setScreen] = useGlobalState('screen');

  const handStartNewGame = () => {
    setGame(gameEngine.reset());
    setScreen(SCREENS.SETUP);
  };

  return (
    <div className="game-over">
      <Header title="End Game" isGoalsDisabled isExploreDisabled />
      <img className="logo" src={logo} alt="Carto logo" />
      <p>Tally your scores. The highest score wins!</p>
      <div className="game-over__actions">
        <Button variant="outlined" className="btn btn--outline" onClick={handStartNewGame}>
          Start New Game
        </Button>
      </div>
    </div>
  );
};

export default GameOver;
