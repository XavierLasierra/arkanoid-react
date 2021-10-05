import React from 'react';
import {
  ballSize, dohGameBoard, gameBoardSize,
} from '../../constants/gameBoard.constants';
import { IBallProps } from '../../types/interfaces';

import './ball.styles.scss';

export default function Ball({ dohCoordinateX, ballCoordinates, isGameActive }: IBallProps) {
  const ballStyles = {
    width: ballSize.width,
    height: ballSize.heigth,
    borderRadius: '50%',
    backgroundColor: '#00F',
    boxShadow: '0 0 20px #0CF',
    transform: isGameActive ? `translate(${(ballSize.width / 2) + (ballCoordinates[0] / dohGameBoard.length) * gameBoardSize.width}px, ${-gameBoardSize.height + (ballCoordinates[1] / dohGameBoard.length) * gameBoardSize.height}px)` : `translate(${dohCoordinateX - ballSize.width / 2}px, ${-ballSize.heigth}px)`,
    transition: isGameActive ? 'transform 0.15s ease' : 'none',
  };
  return (
    <div style={ballStyles} className="ball" />
  );
}
