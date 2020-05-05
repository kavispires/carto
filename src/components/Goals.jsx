import React from 'react';

import useGlobalState from '../useGlobalState';

const Goals = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  return (
    <div>
      <h1>Goals</h1>
    </div>
  );
};

export default Goals;
