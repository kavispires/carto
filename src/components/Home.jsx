import React from 'react';
import Button from '@material-ui/core/Button';

import logo from '../images/carto-logo.svg';

import useGlobalState from '../useGlobalState';

const Home = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  return (
    <div className="home">
      <img className="home__logo" src={logo} alt="Bunker Mind logo" />
      <h1>Carto</h1>
      <div className="home__actions">
        <Button variant="outlined" className="btn">
          Create Game
        </Button>
        <Button variant="outlined" className="btn">
          Resume Game
        </Button>
      </div>
    </div>
  );
};

export default Home;
