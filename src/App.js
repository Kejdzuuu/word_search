import React, { useRef, useState } from 'react';
import WordSearch from './WordSearch';
import LetterGrid from './components/LetterGrid';

const App = () => {
  const letterGrid = [
    "bladddf",
    "eieifna",
    "asdnefw",
  ]
  const wordSearch = new WordSearch(letterGrid);
  const [grid, setGrid] = useState(letterGrid.map(row => row.split('').map(letter => {
    return {letter: letter, animate: false}
  })));
  const [guess, setGuess] = useState('');
  const [successfulGuesses, setSuccessfulGuesses] = useState([]);
  const [guessResult, setGuessResult] = useState('');
  let idRef = useRef();

  const getGridWithClearedAnimations = () => {
    return grid.map(row => row.map(letter => {
      return {...letter, animate: false}
    }))
  }

  const getFoundLettersCoordinations = (start, end, length) => {
    let coords = [];
    let x_delta, y_delta;

    if (end[0] - start[0] > 0) {
      x_delta = 1;
    } else if (end[0] - start[0] < 0) {
      x_delta = -1;
    } else {
      x_delta = 0;
    }

    if (end[1] - start[1] > 0) {
      y_delta = 1;
    } else if (end[1] - start[1] < 0) {
      y_delta = -1;
    } else {
      y_delta = 0;
    }
    
    for (let i = 0; i < length; i++) {
      const x = start[0] + i * x_delta;
      const y = start[1] + i * y_delta;
      coords.push([x,y]);
    }

    return coords;
  }

  const setLettersToAnimate = (result) => {
    const letters = getFoundLettersCoordinations(result[guess].start, result[guess].end, guess.length);
    const newGrid = grid;

    for (let letter of letters) {
      newGrid[letter[1]][letter[0]].animate = true;
    }
    setGrid(newGrid);
    setTimeout(() => {
      setGrid(getGridWithClearedAnimations());
    }, 1000);
  }

  const handleWordSubmit = (e) => {
    e.preventDefault();
    const result = wordSearch.findWord(guess);
    let timeoutId = idRef.current;
    if (result[guess]) {
      const successfulGuess = `${guess} found at: [${result[guess].start}] -> [${result[guess].end}]`;
      setSuccessfulGuesses(successfulGuesses.concat(successfulGuess));
      setLettersToAnimate(result);
      setGuessResult('success');
    } else {
      setGuessResult('no.');
    }
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    setGuess('');
    timeoutId = setTimeout(() => {
      setGuessResult('');
    }, 3000);
    idRef.current = timeoutId;
  }

  const AnimatedDiv = () => {
    const [animation, setAnimation] = useState('');
    const classes = `div ${animation}`;

    const animate = () => {
      setAnimation('animate');
    }

    const endAnimation = () => {
      setAnimation('');
    }

    return (
      <div className={classes} onClick={animate} onAnimationEnd={endAnimation}/>
    )
  }

  return (
    <div>
      <AnimatedDiv />
      <LetterGrid letterGrid={grid} />
      <form onSubmit={handleWordSubmit}>
        <input name="guess" value={guess} onChange={({ target }) => setGuess(target.value)} />
        <button type="submit">GO</button>
      </form>
      <p>{guessResult}</p>
      {successfulGuesses.map((guess, index) =>
        <p key={index}>{guess}</p>
      )}
    </div>
  )
}

export default App;
