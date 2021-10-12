import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ISmallGameCanvasProps } from "../../types/interfaces";

import {
  gameBoardSize,
  BACKGROUND_COLOR,
  MAIN_COLOR,
  STROKE_SIZE_DEMO,
} from "../../constants/gameBoard.constants";

import "./smallGameCanvas.styles.scss";
import { selectBoard } from "../../redux/actions/gameState.creator";

export default function SmallGameCanvas({
  board,
  currentBoard,
}: ISmallGameCanvasProps) {
  const dispatch = useDispatch();
  const smallCanvasRef = useRef(null);

  const canvasWidth = gameBoardSize.width / 5;
  const canvasHeight = gameBoardSize.height / 5;
  const widthSize = canvasWidth / board[0].length;
  const heightSize = canvasHeight / board.length;

  function renderSquare(
    context: any,
    positionX: number,
    positionY: number,
    fillType: number
  ) {
    context.beginPath();
    context.fillStyle = fillType ? MAIN_COLOR : BACKGROUND_COLOR;
    context.strokeStyle = BACKGROUND_COLOR;
    context.lineWidth = STROKE_SIZE_DEMO;

    context.rect(
      positionX * widthSize,
      positionY * heightSize,
      widthSize,
      heightSize
    );
    context.fillRect(
      positionX * widthSize,
      positionY * heightSize,
      widthSize,
      heightSize
    );

    context.stroke();
  }

  function renderGame() {
    const canvas: any = smallCanvasRef.current;
    const context = canvas.getContext("2d");

    board.forEach((matrixRow, indexY) => {
      matrixRow.forEach((fillType: number, indexX) => {
        renderSquare(context, indexX, indexY, fillType);
      });
    });
  }

  useEffect(() => {
    renderGame();
  }, [board]);

  function handleBoardSelect() {
    dispatch(selectBoard(currentBoard));
  }

  return (
    <button
      className="small-game-canvas"
      type="button"
      onClick={handleBoardSelect}
      aria-label="Select Gameboard"
    >
      <canvas ref={smallCanvasRef} width={canvasWidth} height={canvasHeight} />
    </button>
  );
}
