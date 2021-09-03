import React from 'react';

const Letter = ({letter}) => {
  let className = "square";
  if (letter.animate) {
    className += " animate";
  }

  const clearAnimation = () => {
    className = "square";
  }

  return (
    <button className={className} onAnimationEnd={clearAnimation}>
      {letter.letter}
    </button>
  );
}

export default Letter;
