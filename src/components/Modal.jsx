import React from 'react';

export default function Modal({
  status,
  word,
  onRestart
}) {
  if (status === 'IN_PROGRESS') {
    return null;
  }

  return (
    <div className="overlay">
      <div className="modal">

        <h2>
          {status === 'WON'
            ? 'Excellent!'
            : 'Game over'}
        </h2>

        <p>
          {status === 'WON'
            ? 'You found the word!'
            : `The word was ${word}.`}
        </p>

        <button
          className="restart"
          onClick={onRestart}
        >
          Play again
        </button>

      </div>
    </div>
  );
}