import React from 'react';
import { ballSize } from '../../constants/gameBoard.constants';
import { IBallProps } from '../../types/interfaces';

export default function Ball({ dohCoordinateX }: IBallProps) {
  const ballStyles = {
    width: ballSize.width,
    height: ballSize.heigth,
    backgroundColor: '#00F',
    transform: `translate(${dohCoordinateX - ballSize.width / 2}px, 0px)`,
  };
  return (
    <div style={ballStyles} />
  );
}
