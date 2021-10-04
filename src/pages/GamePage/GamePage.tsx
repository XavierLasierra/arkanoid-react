import React, { useState } from 'react';
import Ball from '../../components/Ball/Ball';
import Doh from '../../components/Doh/Doh';
import GameCanvas from '../../components/GameCanvas/GameCanvas';

import {
  dohSize, gameBoard1, gameBoardSize, dohGameBoard,
} from '../../constants/gameBoard.constants';

const gamePageStyles = {
  width: `${gameBoardSize.width}px`,
  height: '100vh',
  backgroundColor: '#000',
};

export default function GamePage() {
  const [dohCoordinateX, setDohCoordinateX] = useState(gameBoardSize.width / 2);
  const [gameMatrix, setGameMatrix] = useState(gameBoard1);
  const [dohMatrix, setDohMatrix] = useState(dohGameBoard);

  function handleDohMatrixChange(coordinateX: number, matrix: number[]) {
    const coordinate = Math.round((coordinateX * matrix.length) / (gameBoardSize.width)) - 1;
    return matrix.map((position, index) => ((index >= coordinate - 1 && index <= coordinate + 1)
      ? 1 : 0));
  }

  function handleDohPosition(clientX: number) {
    if (clientX < dohSize.width / 2) {
      return dohSize.width / 2;
    } if (clientX > gameBoardSize.width - dohSize.width / 2) {
      return gameBoardSize.width - dohSize.width / 2;
    }
    return clientX;
  }

  function handleMouseMove({ persist, clientX }: any) {
    persist();
    const coordinateX = handleDohPosition(clientX);

    setDohCoordinateX(coordinateX);
    setDohMatrix(handleDohMatrixChange(coordinateX, dohMatrix));
  }

  return (
    <section style={gamePageStyles} onMouseMove={handleMouseMove}>
      <GameCanvas gameMatrix={gameMatrix} setGameMatrix={setGameMatrix} />
      <Ball dohCoordinateX={dohCoordinateX} />
      <Doh positionX={dohCoordinateX} dohSize={dohSize} />
    </section>
  );
}
