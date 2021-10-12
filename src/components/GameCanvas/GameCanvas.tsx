import React, { useEffect, useRef } from "react";
import { IGameCanvasProps } from "../../types/interfaces";

import {
  gameBoardSize,
  BACKGROUND_COLOR,
  MAIN_COLOR,
  STROKE_SIZE,
} from "../../constants/gameBoard.constants";

export default function GameCanvas({
  gameMatrix,
  setGameMatrix,
  canEdit,
}: IGameCanvasProps) {
  const canvasRef = useRef(null);

  const widthSize = gameBoardSize.width / gameMatrix[0].length;
  const heightSize = gameBoardSize.height / gameMatrix.length;

  function renderSquare(
    context: any,
    coordinateX: number,
    coordinateY: number,
    fillType: number
  ) {
    context.beginPath();
    context.fillStyle = fillType ? MAIN_COLOR : BACKGROUND_COLOR;
    context.strokeStyle = BACKGROUND_COLOR;
    context.lineWidth = STROKE_SIZE;

    context.rect(
      coordinateX * widthSize,
      coordinateY * heightSize,
      widthSize,
      heightSize
    );
    context.fillRect(
      coordinateX * widthSize,
      coordinateY * heightSize,
      widthSize,
      heightSize
    );

    context.stroke();
  }

  function renderGame(matrix: number[][]) {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");

    matrix.forEach((matrixRow: number[], indexY) => {
      matrixRow.forEach((fillType: number, indexX) => {
        renderSquare(context, indexX, indexY, fillType);
      });
    });
  }

  useEffect(() => {
    renderGame(gameMatrix);
  }, [gameMatrix]);

  function getClickPosition(clientX: number, clientY: number, target: any) {
    const offsetX = target.getBoundingClientRect().left;
    const offsetY = target.getBoundingClientRect().top;

    return {
      positionX: Math.floor((clientX - offsetX) / widthSize),
      positionY: Math.floor((clientY - offsetY) / heightSize),
    };
  }

  function handleCanvasClick({ clientX, clientY, target }: any) {
    if (!canEdit) return;

    const { positionX, positionY } = getClickPosition(clientX, clientY, target);

    if (positionY < gameMatrix.length - 2) {
      // eslint-disable-next-line no-param-reassign
      gameMatrix[positionY][positionX] =
        gameMatrix[positionY][positionX] === 0 ? 1 : 0;
      setGameMatrix([...gameMatrix]);
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onClick={handleCanvasClick}
      width={gameBoardSize.width}
      height={gameBoardSize.height}
    />
  );
}
