import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ball from '../Ball/Ball';
import Doh from '../Doh/Doh';
import GameCanvas from '../GameCanvas/GameCanvas';
import Score from '../Score/Score';
import Lives from '../Lives/Lives';

import {
  dohSize, gameBoardSize, dohGameBoard, BREAK_POINTS, LIVES,
} from '../../constants/gameBoard.constants';
import { endGame, saveBoardChanges } from '../../redux/actions/gameState.creator';

import './gamePage.styles.scss';
import Particles from '../Particles/Particles';
import Death from '../Death/Death';

const gamePageStyles = {
  width: `${gameBoardSize.width + 10}px`,
};

export default function GamePage() {
  const dispatch = useDispatch();

  const gameState = useSelector((store:any) => store.gameState);
  const {
    currentBoard, canPlay, canEdit, save,
  } = gameState;
  const boards = useSelector((store: any) => store.boards);

  const [gameMatrix, setGameMatrix] = useState([[0]]);
  const [dohMatrix, setDohMatrix] = useState(dohGameBoard);
  const [dohCoordinateX, setDohCoordinateX] = useState(gameBoardSize.width / 2);
  const [particleCoordinates, setParticleCoordinates] = useState<any>([]);

  const [ballCoordinates, setBallCoordinates] = useState([0, 0]);
  const [ballDirection, setBallDirection] = useState([0, -1]);

  const [isGameActive, setIsGameActive] = useState(false);
  const [moveTime, setMoveTime] = useState(100);

  const [numberOfBlocks, setNumberOfBlocks] = useState(0);
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [lives, setLives] = useState(LIVES);

  function calculateNumberOfBlocks(matrix: number[][]) {
    return matrix.reduce((acc, row) => acc + row.filter((value) => value === 1).length, 0);
  }

  useEffect(() => {
    setGameMatrix(JSON.parse(JSON.stringify(boards[currentBoard])));
    setNumberOfBlocks(calculateNumberOfBlocks(boards[currentBoard]));
    setBallCoordinates([0, boards[currentBoard].length - 1]);
    setScore(0);
  }, [gameState]);

  useEffect(() => {
    if (save) {
      dispatch(saveBoardChanges(gameMatrix, currentBoard));
    }
  }, [save]);

  function handleDohMatrixChange(coordinateX: number, matrix: number[]) {
    const coordinate = Math.ceil((coordinateX * dohMatrix.length) / (gameBoardSize.width)) - 1;
    return matrix.map((position, index) => ((index >= coordinate - 1 && index <= coordinate + 1)
      ? 1 : 0));
  }

  function handleDohPosition(clientX: number) {
    if (clientX < dohSize.width / 3) {
      return dohSize.width / 3;
    } if (clientX > gameBoardSize.width - dohSize.width / 3) {
      return gameBoardSize.width - dohSize.width / 3;
    }
    return clientX;
  }

  function handleMouseMove({ persist, clientX, target }: any) {
    if (!canPlay) return;

    persist();

    const coordinateX = handleDohPosition(clientX - target.getBoundingClientRect().left);

    setDohCoordinateX(coordinateX);
    setDohMatrix(handleDohMatrixChange(coordinateX, dohMatrix));
  }

  function handleGameStart() {
    if (!isGameActive && canPlay) {
      setIsGameActive(true);
      const initialCoordinateX = Math.ceil(
        (dohCoordinateX * gameMatrix[0].length) / (gameBoardSize.width),
      ) - 1;

      setBallCoordinates([initialCoordinateX, ballCoordinates[1]]);
    }
  }

  function handleEndGame() {
    dispatch(endGame());
    setIsGameActive(false);
    setMultiplier(1);
    setBallDirection([0, -1]);
    setLives(3);
  }

  function handleDeath() {
    setBallDirection([0, -1]);
    setMultiplier(1);
    if (lives === 0) {
      return handleEndGame();
    }
    setLives(lives - 1);
    return setIsGameActive(false);
  }

  function blockBreak(coordX: number, coordY: number) {
    gameMatrix[coordY][coordX] = 0;
    setGameMatrix([...gameMatrix]);
    setScore(score + BREAK_POINTS * multiplier);
    setParticleCoordinates([{
      coordX: coordX * (gameBoardSize.width / gameMatrix[0].length),
      coordY: coordY * (gameBoardSize.height / gameMatrix.length),
    }]);
    setMultiplier(multiplier <= 5 ? multiplier + 1 : 5);
    if (numberOfBlocks === 1) {
      return handleEndGame();
    }
    return setNumberOfBlocks(numberOfBlocks - 1);
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
        setMultiplier(1);
      } else {
        return handleDeath();
      }
    } else if (gameMatrix[ballCoordinates[1]][nextXCoordinate] === undefined) {
      nextBallDirection = [-nextBallDirection[0], nextBallDirection[1]];
    } else if (gameMatrix[nextYCoordinate][ballCoordinates[0]] === 1) {
      nextBallDirection = [ballDirection[0], -ballDirection[1]];
      blockBreak(ballCoordinates[0], nextYCoordinate);
    } else if (gameMatrix[ballCoordinates[1]][nextXCoordinate] === 1) {
      nextBallDirection = [-ballDirection[0], ballDirection[1]];
      blockBreak(nextXCoordinate, ballCoordinates[1]);
    } else if (gameMatrix[nextYCoordinate][nextXCoordinate] === 1) {
      nextBallDirection = [-ballDirection[0], -ballDirection[1]];
      blockBreak(nextXCoordinate, nextYCoordinate);
    }
    setBallDirection(nextBallDirection);

    const finalX = ballCoordinates[0] + nextBallDirection[0];
    const finalY = ballCoordinates[1] + nextBallDirection[1];
    if (gameMatrix[finalY]
      && gameMatrix[finalY][finalX] === 0
      && gameMatrix[ballCoordinates[1]][finalX] === 0
      && gameMatrix[finalY][ballCoordinates[0]] === 0) {
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
      className="game-container"
      style={gamePageStyles}
      onMouseMove={handleMouseMove}
      onClick={handleGameStart}
      onKeyDown={handleGameStart}
      role="button"
      tabIndex={0}
    >
      <Particles
        particlesCoordinates={particleCoordinates}
        setParticlesCoordinates={setParticleCoordinates}
      />
      <Lives lives={lives} />
      <Death lives={lives} canPlay={canPlay} />
      <Score value={score} />
      <GameCanvas gameMatrix={gameMatrix} setGameMatrix={setGameMatrix} canEdit={canEdit} />
      {canPlay && (
      <Ball
        dohCoordinateX={dohCoordinateX}
        isGameActive={isGameActive}
        ballCoordinates={ballCoordinates}
      />
      )}
      <Doh positionX={dohCoordinateX} dohSize={dohSize} />
    </section>
  );
}
