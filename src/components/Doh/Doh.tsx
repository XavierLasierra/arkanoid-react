import React from 'react';
import { IDohProps } from '../../types/interfaces';

export default function Doh({ positionX, dohSize } : IDohProps) {
  const dohStyles = {
    transform: `translate(${positionX - dohSize.width / 2}px, ${-dohSize.height * 1.5}px)`,
    width: `${dohSize.width}px`,
    height: `${dohSize.height}px`,
    backgroundColor: '#FFF',
    boxShadow: '0 0 10px #FFF',
    borderRadius: '20px',
  };

  return (
    <div style={dohStyles} />
  );
}
