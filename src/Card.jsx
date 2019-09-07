import React from 'react';

const Card = ({ id, className, prefix = 'card_' }) => {
  const numberId = id < 10 ? `0${id}` : id;
  return (
    <img
      className={className ? className : 'card'}
      src={`${process.env.PUBLIC_URL}/images/${prefix}${numberId}.jpg`}
      alt={id}
    />
  );
};

export default Card;
