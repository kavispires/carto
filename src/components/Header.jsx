import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

import FlagIcon from '@material-ui/icons/Flag';
import ExploreIcon from '@material-ui/icons/Explore';
import HistoryIcon from '@material-ui/icons/History';

import gameEngine from '../engine';
import useGlobalState from '../useGlobalState';
import { SCREENS } from '../utils/constants';

const Header = ({ title, isExploreDisabled = false, isGoalsDisabled = false }) => {
  // Global States
  const [game] = useGlobalState('game');
  const [, setScreen] = useGlobalState('screen');

  const handleResume = () => {
    setScreen(game.state.screen);
  };

  const handleGoals = () => {
    setScreen(SCREENS.GOALS);
  };

  const handleReset = () => {
    gameEngine.reset();
    setScreen(SCREENS.SETUP);
  };

  return (
    <AppBar position="static" className="header">
      <Button
        className="header__btn"
        onClick={handleResume}
        startIcon={<ExploreIcon />}
        disabled={isExploreDisabled}
      >
        Resume
      </Button>
      <Button
        className="header__btn"
        onClick={handleGoals}
        startIcon={<FlagIcon />}
        disabled={isGoalsDisabled}
      >
        Goals
      </Button>
      <h3>{title}</h3>
      <Button className="header__btn" onClick={handleReset} startIcon={<HistoryIcon />}>
        Reset
      </Button>
    </AppBar>
  );
};

export default Header;
