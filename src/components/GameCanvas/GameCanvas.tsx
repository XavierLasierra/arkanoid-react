/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { gameBoardSize } from '../../constants/gameBoard.constants';
import { IGameCanvasProps } from '../../types/interfaces';

export default function GameCanvas({ gameMatrix, setGameMatrix, canEdit }: IGameCanvasProps) {
  const canvasRef = useRef(null);

  function renderGame(matrix: number[][]) {
    const canvas: any = canvasRef.current;

    const context = canvas.getContext('2d');
    const widthSize = gameBoardSize.width / gameMatrix[0].length;
    const heightSize = gameBoardSize.height / gameMatrix.length;

    matrix.forEach((matrixRow, indexY) => {
      matrixRow.forEach((fillType: number, indexX) => {
        context.beginPath();
        context.fillStyle = fillType ? '#FFF' : '#000';
        context.strokeStyle = '#000';
        context.lineWidth = '6';
        context.rect(
          indexX * widthSize,
          indexY * heightSize,
          widthSize,
          heightSize,
        );
        context.fillRect(
          indexX * widthSize,
          indexY * heightSize,
          widthSize,
          heightSize,
        );
        context.stroke();
      });
    });
  }

  useEffect(() => {
    renderGame(gameMatrix);
  }, [gameMatrix]);

  function handleCanvasClick({ clientX, clientY, target }: any) {
    if (!canEdit) return;

    const positionX = Math.floor((clientX - target.getBoundingClientRect().left)
    * (gameMatrix[0].length / gameBoardSize.width));
    const positionY = Math.floor((clientY - target.getBoundingClientRect().top)
    * (gameMatrix.length / gameBoardSize.height));

    if (positionY < gameMatrix.length - 2) {
      const aux = gameMatrix;
      aux[positionY][positionX] = aux[positionY][positionX] === 0 ? 1 : 0;
      setGameMatrix([...aux]);
    }
  }

  return (
    <canvas
      onClick={handleCanvasClick}
      ref={canvasRef}
      width={gameBoardSize.width}
      height={gameBoardSize.height}
    />
  );
}
