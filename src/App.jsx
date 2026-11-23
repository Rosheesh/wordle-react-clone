import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

import GameBoard from './components/GameBoard.jsx';
import Keyboard from './components/Keyboard.jsx';
import Modal from './components/Modal.jsx';
import { WORDS } from './words.js';

// Evaluate a submitted guess against the solution
function evaluate(guess, solution) {
  const result = Array(5).fill('absent');
  const remaining = {};

  // First pass: mark correct-position letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = 'correct';
    } else {
      remaining[solution[i]] =
        (remaining[solution[i]] || 0) + 1;
    }
  }

  // Second pass: mark letters present elsewhere
  for (let i = 0; i < 5; i++) {
    if (
      result[i] !== 'correct' &&
      remaining[guess[i]] > 0
    ) {
      result[i] = 'present';
      remaining[guess[i]]--;
    }
  }

  return result;
}

const rank = {
  absent: 1,
  present: 2,
  correct: 3
};

export default function App() {

  // Central game states
  const [solutionWord, setSolutionWord] = useState(
    () => WORDS[Math.floor(Math.random() * WORDS.length)]
  );

  const [currentGuess, setCurrentGuess] = useState('');
  const [pastGuesses, setPastGuesses] = useState([]);
  const [results, setResults] = useState([]);
  const [gameStatus, setGameStatus] =
    useState('IN_PROGRESS');

  // Synchronize keyboard letter colors
  const keyStatuses = useMemo(() => {
    return pastGuesses.reduce((map, guess, idx) => {

      guess.split('').forEach((letter, i) => {
        const status = results[idx][i];

        if (
          !map[letter] ||
          rank[status] > rank[map[letter]]
        ) {
          map[letter] = status;
        }
      });

      return map;
    }, {});
  }, [pastGuesses, results]);

  // Centralized input handler
  const onKey = useCallback((key) => {

    if (gameStatus !== 'IN_PROGRESS') {
      return;
    }

    // Backspace logic
    if (key === 'BACKSPACE') {
      setCurrentGuess((g) => g.slice(0, -1));
      return;
    }

    // Enter submission logic
    if (key === 'ENTER') {

      if (currentGuess.length !== 5) {
        return;
      }

      const evaluated = evaluate(
        currentGuess,
        solutionWord
      );

      const guesses = [
        ...pastGuesses,
        currentGuess
      ];

      const allResults = [
        ...results,
        evaluated
      ];

      setPastGuesses(guesses);
      setResults(allResults);
      setCurrentGuess('');

      // Win condition
      if (currentGuess === solutionWord) {
        setGameStatus('WON');
      }

      // Loss condition
      else if (guesses.length === 6) {
        setGameStatus('LOST');
      }

      return;
    }

    // Alphabet validation and five-letter limit
    if (/^[A-Z]$/.test(key)) {
      setCurrentGuess((g) =>
        g.length < 5 ? g + key : g
      );
    }

  }, [
    gameStatus,
    currentGuess,
    solutionWord,
    pastGuesses,
    results
  ]);

  // Physical keyboard event listener
  useEffect(() => {

    const handle = (e) => {

      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        onKey('BACKSPACE');
      }

      else if (e.key === 'Enter') {
        onKey('ENTER');
      }

      else if (/^[a-zA-Z]$/.test(e.key)) {
        onKey(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handle);

    // Cleanup listener
    return () => {
      window.removeEventListener('keydown', handle);
    };

  }, [onKey]);

  // Restart the game
  const restart = () => {

    setSolutionWord(
      WORDS[Math.floor(Math.random() * WORDS.length)]
    );

    setCurrentGuess('');
    setPastGuesses([]);
    setResults([]);
    setGameStatus('IN_PROGRESS');
  };

  return (
    <main className="app">

      <header>
        <div className="help">?</div>
        <h1>WORDLE</h1>
        <div className="stats">⌁</div>
      </header>

      <p className="subtitle">
        Guess the five-letter word in six tries.
      </p>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
        results={results}
      />

      <Keyboard
        onKey={onKey}
        keyStatuses={keyStatuses}
      />

      <footer>
        React Wordle clone · six tries · five letters
      </footer>

      <Modal
        status={gameStatus}
        word={solutionWord}
        onRestart={restart}
      />

    </main>
  );
}