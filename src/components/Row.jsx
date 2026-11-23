import React from 'react';
import Tile from './Tile.jsx';

export default function Row({
  guess = '',
  evaluation = [],
  active = false
}) {
  return (
    <div className="row">
      {Array.from({ length: 5 }, (_, i) => (
        <Tile
          key={i}
          letter={guess[i] || ''}
          status={evaluation[i] || ''}
          active={active && i === guess.length - 1}
        />
      ))}
    </div>
  );
}