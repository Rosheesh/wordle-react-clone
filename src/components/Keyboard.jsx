import React from 'react';

const keys = [
  'QWERTYUIOP',
  'ASDFGHJKL',
  'ZXCVBNM'
];

export default function Keyboard({
  onKey,
  keyStatuses
}) {
  return (
    <div className="keyboard">

      <div className="keyrow">
        {keys[0].split('').map((k) => (
          <button
            key={k}
            className={`key ${keyStatuses[k] || ''}`}
            onClick={() => onKey(k)}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="keyrow">
        {keys[1].split('').map((k) => (
          <button
            key={k}
            className={`key ${keyStatuses[k] || ''}`}
            onClick={() => onKey(k)}
          >
            {k}
          </button>
        ))}
      </div>

      <div className="keyrow">
        <button
          className="key wide"
          onClick={() => onKey('ENTER')}
        >
          ENTER
        </button>

        {keys[2].split('').map((k) => (
          <button
            key={k}
            className={`key ${keyStatuses[k] || ''}`}
            onClick={() => onKey(k)}
          >
            {k}
          </button>
        ))}

        <button
          className="key wide"
          onClick={() => onKey('BACKSPACE')}
        >
          ⌫
        </button>
      </div>

    </div>
  );
}