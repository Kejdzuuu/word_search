import React from 'react';

const Letter = ({letter}) => {
  return (
    <button className="square">
      {letter}
    </button>
  );
}

export default Letter;
