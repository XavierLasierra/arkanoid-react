/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { gameBoardSize } from '../../constants/gameBoard.constants';
import { IGameCanvasProps } from '../../types/interfaces';

export default function GameCanvas({ gameMatrix, setGameMatrix }: IGameCanvasProps) {
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
        context.strokeStyle = '#FFF';
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

  return (
    <canvas ref={canvasRef} width={gameBoardSize.width} height={gameBoardSize.height} />
  );
}
