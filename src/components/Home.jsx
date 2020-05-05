import React from 'react';
import Button from '@material-ui/core/Button';

import logo from '../images/carto-logo.svg';

import useGlobalState from '../useGlobalState';
import { SCREENS } from '../utils/contants';

const Home = () => {
  // Global States
  const [, setScreen] = useGlobalState('screen');

  const handleCreateGame = () => {
    setScreen(SCREENS.SETUP);
  };

  const handleResumeGame = () => {
    // Do magic to resume game
    // setScreen to appropriate screen
  };

  return (
    <div className="home">
      <img className="logo" src={logo} alt="Carto logo" />
      <h1>Carto</h1>
      <div className="home__actions">
        <Button variant="outlined" className="btn" onClick={handleCreateGame}>
          Create Game
        </Button>
        <Button variant="outlined" className="btn" onClick={handleResumeGame} disabled>
          Resume Game
        </Button>
      </div>
    </div>
  );
};

export default Home;
