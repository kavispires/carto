import { createGlobalState } from 'react-hooks-global-state';

import gameEngine from './engine';

import { SCREENS } from './utils/constants';

const initialState = {
  game: gameEngine.state,
  screen: SCREENS.HOME,
  showGoals: false,
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
