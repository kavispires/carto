import React from 'react';

import useGlobalState from '../useGlobalState';

const Scoring = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  return (
    <div>
      <h1>Scoring</h1>
    </div>
  );
};

export default Scoring;
