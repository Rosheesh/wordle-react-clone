import React from 'react';

export default function Tile({
  letter = '',
  status = '',
  active = false
}) {
  return (
    <div
      className={`tile ${status} ${letter ? 'filled' : ''} ${
        active ? 'active' : ''
      }`}
      aria-label={letter || 'empty'}
    >
      {letter}
    </div>
  );
}