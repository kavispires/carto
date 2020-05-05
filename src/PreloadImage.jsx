import React from 'react';

// Import Components
import Card from './Card';

const PreloadImage = ({ state }) => {
  return (
    <>
      <Card id={state.deck[0].number} className="invisible" />
      <Card id={state.deck[1].number} className="invisible" />
    </>
  );
};

export default PreloadImage;
