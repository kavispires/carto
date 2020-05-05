import React from 'react';

import useGlobalState from '../useGlobalState';

const Explore = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  return (
    <div>
      <h1>Explore</h1>
    </div>
  );
};

export default Explore;
