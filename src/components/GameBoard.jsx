import React from 'react';
import Row from './Row.jsx';

export default function GameBoard({
  pastGuesses,
  currentGuess,
  results
}) {
  return (
    <div className="board">
      {Array.from({ length: 6 }, (_, i) => {
        const filled =
          pastGuesses[i] ||
          (i === pastGuesses.length ? currentGuess : '');

        return (
          <Row
            key={i}
            guess={filled}
            evaluation={results[i] || []}
            active={i === pastGuesses.length}
          />
        );
      })}
    </div>
  );
}