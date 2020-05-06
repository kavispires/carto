import React from 'react';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import useGlobalState from '../useGlobalState';
import { SCREENS } from '../utils/constants';

import Explore from './Explore';
import Goals from './Goals';
import Home from './Home';
import Scoring from './Scoring';
import Season from './Season';
import Setup from './Setup';

const ScreenComponents = {
  [SCREENS.EXPLORE]: <Explore />,
  [SCREENS.GOALS]: <Goals />,
  [SCREENS.HOME]: <Home />,
  [SCREENS.SCORING]: <Scoring />,
  [SCREENS.SEASON]: <Season />,
  [SCREENS.SETUP]: <Setup />,
};

const App = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');
  const [screen] = useGlobalState('screen');

  return (
    <Container maxWidth="lg" className="app-container">
      {isLoading ? <LinearProgress /> : <div className="progress-bar-placeholder" />}
      {ScreenComponents[screen]}
    </Container>
  );
};

export default App;
