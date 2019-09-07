import React from 'react';

const Card = ({ id, className }) => {
  return (
    <img
      className={className ? className : 'card'}
      src={`${process.env.PUBLIC_URL}/images/card_${id}.jpg`}
      alt={id}
    />
  );
};

export default Card;
