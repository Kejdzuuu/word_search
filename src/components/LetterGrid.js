import React from 'react';
import Letter from './Letter';

const LetterGrid = ({letterGrid}) => {
  return (
    <div>
      {letterGrid.map((row, index) =>
        <div key={index} className="board-row">
          {row.map((letter, index) =>
            <Letter key={index} letter={letter} />
          )}
        </div>
      )}
    </div>
  )
}

export default LetterGrid;
