import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Ball from "../Ball/Ball";
import Doh from "../Doh/Doh";
import GameCanvas from "../GameCanvas/GameCanvas";
import Score from "../Score/Score";
import Lives from "../Lives/Lives";

import {
  dohSize,
  gameBoardSize,
  dohGameBoard,
  BREAK_POINTS,
  LIVES,
} from "../../constants/gameBoard.constants";
import {
  endGame,
  saveBoardChanges,
} from "../../redux/actions/gameState.creator";

import "./gamePage.styles.scss";
import Particles from "../Particles/Particles";
import Death from "../Death/Death";

const gamePageStyles = {
  width: `${gameBoardSize.width + 10}px`,
};

export default function GamePage() {
  const dispatch = useDispatch();

  const gameState = useSelector((store: any) => store.gameState);
  const { currentBoard, canPlay, canEdit, save } = gameState;
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
    return matrix.reduce(
      (acc, row) => acc + row.filter((value) => value === 1).length,
      0
    );
  }

  function ballReset() {
    setBallDirection([0, -1]);
    setMultiplier(1);
    setIsGameActive(false);
  }

  function boardReset() {
    setGameMatrix(JSON.parse(JSON.stringify(boards[currentBoard])));
    setNumberOfBlocks(calculateNumberOfBlocks(boards[currentBoard]));
    setBallCoordinates([0, boards[currentBoard].length - 1]);
    setLives(3);

    ballReset();
  }

  useEffect(() => {
    boardReset();
  }, [gameState]);

  useEffect(() => {
    if (save) {
      dispatch(saveBoardChanges(gameMatrix, currentBoard));
    }
  }, [save]);

  function calculateDohMatrix(coordinateX: number, matrix: number[]) {
    const dohPosition = Math.floor(
      (coordinateX * dohMatrix.length) / gameBoardSize.width
    );

    return matrix.map((_, index) =>
      index >= dohPosition - 1 && index <= dohPosition + 1 ? 1 : 0
    );
  }

  function handleDohPosition(clientX: number) {
    const dohLimitPosition = dohSize.width / 3;

    if (clientX < dohLimitPosition) {
      return dohLimitPosition;
    }
    if (clientX > gameBoardSize.width - dohLimitPosition) {
      return gameBoardSize.width - dohLimitPosition;
    }

    return clientX;
  }

  function handleMouseMove({ persist, clientX, target }: any) {
    if (!canPlay) return;

    persist();

    const offsetX = target.getBoundingClientRect().left;
    const coordinateX = handleDohPosition(clientX - offsetX);

    setDohCoordinateX(coordinateX);
    setDohMatrix(calculateDohMatrix(coordinateX, dohMatrix));
  }

  function handleGameStart() {
    if (!isGameActive && canPlay) {
      if (lives === 3) {
        setScore(0);
      }

      const initialCoordinateX = Math.floor(
        (dohCoordinateX * gameMatrix[0].length) / gameBoardSize.width
      );
      setBallCoordinates([initialCoordinateX, ballCoordinates[1]]);

      setIsGameActive(true);
    }
  }

  function handleEndGame() {
    dispatch(endGame());
  }

  function handleDeath() {
    ballReset();

    if (lives === 0) {
      return handleEndGame();
    }
    return setLives(lives - 1);
  }

  function addScore(scoreAddition: number) {
    setScore(score + scoreAddition);
    setMultiplier(multiplier <= 5 ? multiplier + 1 : 5);
  }

  function numberOfBlocksCheck() {
    if (numberOfBlocks === 1) {
      return handleEndGame();
    }

    return setNumberOfBlocks(numberOfBlocks - 1);
  }

  function deleteBlockFromGameboard(coordX: number, coordY: number) {
    gameMatrix[coordY][coordX] = 0;
    setGameMatrix([...gameMatrix]);
    setParticleCoordinates([
      {
        coordX: coordX * (gameBoardSize.width / gameMatrix[0].length),
        coordY: coordY * (gameBoardSize.height / gameMatrix.length),
      },
    ]);
  }

  function blockBreak(coordX: number, coordY: number) {
    addScore(BREAK_POINTS * multiplier);
    deleteBlockFromGameboard(coordX, coordY);
    numberOfBlocksCheck();
  }

  function dohHitNextXBallDirection(currentBallCoordinateX: number) {
    setMultiplier(1);

    if (!dohMatrix[currentBallCoordinateX - 1]) {
      return -1;
    }
    if (!dohMatrix[currentBallCoordinateX + 1]) {
      return 1;
    }
    return 0;
  }

  function nextTurn(
    [currentBallCoordinateX, currentBallCoordinateY]: number[],
    [currentBallDirectionX, currentBallDirectionY]: number[],
    currentGameMatrix: number[][]
  ) {
    const nextXCoordinate = currentBallCoordinateX + currentBallDirectionX;
    const nextYCoordinate = currentBallCoordinateY + currentBallDirectionY;
    let nextBallDirection = [currentBallDirectionX, currentBallDirectionY];

    if (currentGameMatrix[nextYCoordinate] === undefined) {
      if (currentBallDirectionY > 0) {
        if (dohMatrix[currentBallCoordinateX] === 1) {
          nextBallDirection[0] = dohHitNextXBallDirection(
            currentBallCoordinateX
          );
        } else {
          return handleDeath();
        }
      }
      nextBallDirection[1] *= -1;
    } else if (
      currentGameMatrix[currentBallCoordinateY][nextXCoordinate] === undefined
    ) {
      nextBallDirection = [-nextBallDirection[0], nextBallDirection[1]];
    } else if (currentGameMatrix[nextYCoordinate][currentBallCoordinateX]) {
      nextBallDirection = [currentBallDirectionX, -currentBallDirectionY];
      blockBreak(currentBallCoordinateX, nextYCoordinate);
    } else if (currentGameMatrix[currentBallCoordinateY][nextXCoordinate]) {
      nextBallDirection = [-currentBallDirectionX, currentBallDirectionY];
      blockBreak(nextXCoordinate, currentBallCoordinateY);
    } else if (currentGameMatrix[nextYCoordinate][nextXCoordinate]) {
      nextBallDirection = [-currentBallDirectionX, -currentBallDirectionY];
      blockBreak(nextXCoordinate, nextYCoordinate);
    }
    setBallDirection(nextBallDirection);

    const finalX = currentBallCoordinateX + nextBallDirection[0];
    const finalY = currentBallCoordinateY + nextBallDirection[1];
    if (
      currentGameMatrix[finalY] &&
      currentGameMatrix[finalY][finalX] === 0 &&
      currentGameMatrix[ballCoordinates[1]][finalX] === 0 &&
      currentGameMatrix[finalY][ballCoordinates[0]] === 0
    ) {
      setMoveTime(100);
      return setBallCoordinates([finalX, finalY]);
    }
    setMoveTime(0);
    return setBallCoordinates([...ballCoordinates]);
  }

  useEffect(() => {
    if (isGameActive) {
      setTimeout(
        () => nextTurn(ballCoordinates, ballDirection, gameMatrix),
        moveTime
      );
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
      {!canEdit && <Death lives={lives} canPlay={canPlay} />}
      <Score value={score} />
      <GameCanvas
        gameMatrix={gameMatrix}
        setGameMatrix={setGameMatrix}
        canEdit={canEdit}
      />
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
