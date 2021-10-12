import React from "react";
import { IBallProps } from "../../types/interfaces";

import {
  ballSize,
  dohGameBoard,
  gameBoardSize,
} from "../../constants/gameBoard.constants";

import "./ball.styles.scss";

export default function Ball({
  dohCoordinateX,
  ballCoordinates,
  isGameActive,
}: IBallProps) {
  const ballStyles = {
    width: ballSize.width,
    height: ballSize.heigth,
    transform: isGameActive
      ? `translate(
        ${
          ballSize.width / 2 +
          (ballCoordinates[0] / dohGameBoard.length) * gameBoardSize.width
        }px,
        ${
          -gameBoardSize.height +
          (ballCoordinates[1] / dohGameBoard.length) * gameBoardSize.height
        }px
        )`
      : `translate(
        ${dohCoordinateX - ballSize.width / 2}px, ${-ballSize.heigth}px
        )`,
    transition: isGameActive ? "transform 0.1s linear" : "none",
  };

  return <div className="ball" style={ballStyles} />;
}
