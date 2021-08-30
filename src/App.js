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
  const [guess, setGuess] = useState('');
  const [successfulGuesses, setSuccessfulGuesses] = useState([]);
  const [guessResult, setGuessResult] = useState('');
  let idRef = useRef();

  const handleWordSubmit = (e) => {
    e.preventDefault();
    const result = wordSearch.findWord(guess);
    let timeoutId = idRef.current;
    if (result[guess]) {
      const successfulGuess = `${guess} found at: [${result[guess].start}] -> [${result[guess].end}]`;
      setSuccessfulGuesses(successfulGuesses.concat(successfulGuess));
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

  return (
    <div>
      <LetterGrid letterGrid={wordSearch.wordTable} />
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
