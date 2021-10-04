import React from 'react';
import { IDohProps } from '../../types/interfaces';

export default function Doh({ positionX, dohSize } : IDohProps) {
  const dohStyles = {
    transform: `translate(${positionX - dohSize.width / 2}px, 0px)`,
    width: `${dohSize.width}px`,
    height: `${dohSize.height}px`,
    backgroundColor: 'red',
  };

  return (
    <div style={dohStyles} />
  );
}

/*
width: '200px',
height: '20px',
background-color: 'red'
*/
