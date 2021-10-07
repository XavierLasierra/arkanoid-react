import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ISmallGameCanvasProps } from '../../types/interfaces';

import { gameBoardSize } from '../../constants/gameBoard.constants';

import './smallGameCanvas.styles.scss';
import { selectBoard } from '../../redux/actions/gameState.creator';

export default function SmallGameCanvas({ board, currentBoard }: ISmallGameCanvasProps) {
  const smallCanvasRef = useRef(null);
  const dispatch = useDispatch();
  const canvasWidth = gameBoardSize.width / 5;
  const canvasHeight = gameBoardSize.height / 5;

  function renderGame() {
    const canvas: any = smallCanvasRef.current;

    const context = canvas.getContext('2d');
    const widthSize = canvasWidth / board[0].length;
    const heightSize = canvasHeight / board.length;

    board.forEach((matrixRow, indexY) => {
      matrixRow.forEach((fillType: number, indexX) => {
        context.beginPath();
        context.fillStyle = fillType ? '#FFF' : '#000';
        context.strokeStyle = '#000';
        context.lineWidth = '1';
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
    renderGame();
  }, []);

  function handleBoardSelect() {
    dispatch(selectBoard(currentBoard));
  }

  return (
    <button className="small-game-canvas" type="button" onClick={handleBoardSelect} aria-label="Select Gameboard">
      <canvas
        ref={smallCanvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </button>
  );
}
