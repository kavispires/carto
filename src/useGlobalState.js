import { createGlobalState } from 'react-hooks-global-state';

import gameEngine from './engine';

import { SCREENS } from './utils/constants';

const initialState = {
  screen: SCREENS.HOME,
  game: gameEngine.state,
  isLoading: false,
};

const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
