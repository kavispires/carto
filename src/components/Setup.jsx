import React from 'react';

import useGlobalState from '../useGlobalState';

const Setup = () => {
  // Global States
  const [isLoading] = useGlobalState('isLoading');

  return (
    <div>
      <h1>Setup</h1>
    </div>
  );
};

export default Setup;
