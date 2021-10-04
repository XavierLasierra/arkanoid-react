import React, { useEffect, useState } from 'react';
import Ball from '../../components/Ball/Ball';
import Doh from '../../components/Doh/Doh';
import GameCanvas from '../../components/GameCanvas/GameCanvas';

import {
  dohSize, gameBoard1, gameBoardSize, dohGameBoard,
} from '../../constants/gameBoard.constants';

const gamePageStyles = {
  width: `${gameBoardSize.width + 10}px`,
  height: '100vh',
  backgroundColor: '#000',
  border: '5px solid #FFF',
  margin: '0px 200px',
};

export default function GamePage() {
  const [dohCoordinateX, setDohCoordinateX] = useState(gameBoardSize.width / 2);
  const [gameMatrix, setGameMatrix] = useState(gameBoard1);
  const [dohMatrix, setDohMatrix] = useState(dohGameBoard);
  const [isGameActive, setIsGameActive] = useState(false);
  const [ballCoordinates, setBallCoordinates] = useState([0, gameMatrix.length - 1]);
  const [ballDirection, setBallDirection] = useState([0, -1]);
  const [moveTime, setMoveTime] = useState(100);

  function handleDohMatrixChange(coordinateX: number, matrix: number[]) {
    const coordinate = Math.round((coordinateX * dohMatrix.length) / (gameBoardSize.width)) - 1;
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
    const coordinateX = handleDohPosition(clientX - 200);

    setDohCoordinateX(coordinateX);
    setDohMatrix(handleDohMatrixChange(coordinateX, dohMatrix));
  }

  function handleGameStart() {
    if (!isGameActive) {
      setIsGameActive(true);
      const initialCoordinateX = Math.round(
        (dohCoordinateX * gameMatrix[0].length) / (gameBoardSize.width),
      ) - 1;

      setBallCoordinates([initialCoordinateX, ballCoordinates[1]]);
    }
  }

  function nextTurn() {
    const nextXCoordinate = ballCoordinates[0] + ballDirection[0];
    const nextYCoordinate = ballCoordinates[1] + ballDirection[1];
    let nextBallDirection = ballDirection;
    if (gameMatrix[nextYCoordinate] === undefined) {
      if (ballDirection[1] < 0) {
        nextBallDirection = [nextBallDirection[0], -nextBallDirection[1]];
      } else if (dohMatrix[ballCoordinates[0]] === 1) {
        if (!dohMatrix[ballCoordinates[0] - 1]) {
          nextBallDirection = [-1, -nextBallDirection[1]];
        } else if (!dohMatrix[ballCoordinates[0] + 1]) {
          nextBallDirection = [1, -ballDirection[1]];
        } else {
          nextBallDirection = [0, -ballDirection[1]];
        }
      } else {
        setBallDirection([0, -1]);
        return setIsGameActive(false);
      }
    } else if (gameMatrix[ballCoordinates[1]][nextXCoordinate] === undefined) {
      nextBallDirection = [-nextBallDirection[0], nextBallDirection[1]];
    } else if (gameMatrix[nextYCoordinate][ballCoordinates[0]] === 1) {
      nextBallDirection = [ballDirection[0], -ballDirection[1]];
      gameMatrix[nextYCoordinate][ballCoordinates[0]] = 0;
      setGameMatrix([...gameMatrix]);
    } else if (gameMatrix[ballCoordinates[1]][nextXCoordinate] === 1) {
      nextBallDirection = [-ballDirection[0], ballDirection[1]];
      gameMatrix[ballCoordinates[1]][nextXCoordinate] = 0;
      setGameMatrix([...gameMatrix]);
    } else if (gameMatrix[nextYCoordinate][nextXCoordinate] === 1) {
      nextBallDirection = [-ballDirection[0], -ballDirection[1]];
      gameMatrix[nextYCoordinate][nextXCoordinate] = 0;
      setGameMatrix([...gameMatrix]);
    }
    setBallDirection(nextBallDirection);
    const finalX = ballCoordinates[0] + nextBallDirection[0];
    const finalY = ballCoordinates[1] + nextBallDirection[1];
    if (gameMatrix[finalY][finalX] === 0) {
      setMoveTime(100);
      return setBallCoordinates([finalX, finalY]);
    }
    setMoveTime(0);
    return setBallCoordinates([...ballCoordinates]);
  }

  useEffect(() => {
    if (isGameActive) {
      setTimeout(nextTurn, moveTime);
    }
  }, [ballCoordinates]);

  return (
    <section
      style={gamePageStyles}
      onMouseMove={handleMouseMove}
      onClick={handleGameStart}
      onKeyDown={handleGameStart}
      role="button"
      tabIndex={0}
    >
      <GameCanvas gameMatrix={gameMatrix} setGameMatrix={setGameMatrix} />
      <Ball
        dohCoordinateX={dohCoordinateX}
        isGameActive={isGameActive}
        ballCoordinates={ballCoordinates}
      />
      <Doh positionX={dohCoordinateX} dohSize={dohSize} />
    </section>
  );
}
