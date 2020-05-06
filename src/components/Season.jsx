import React from 'react';

import useGlobalState from '../useGlobalState';

const Season = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  return (
    <div>
      <h1>Season</h1>
    </div>
  );
};

export default Season;
