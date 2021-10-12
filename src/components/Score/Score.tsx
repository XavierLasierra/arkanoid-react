import React from "react";
import { IScoreProps } from "../../types/interfaces";

import "./score.styles.scss";

export default function Score({ value }: IScoreProps) {
  function fixNumberCharacters(numberOfCharacters: number, number: number) {
    return `${number}`.padStart(numberOfCharacters, "0");
  }

  return <p className="score">{fixNumberCharacters(6, value)}</p>;
}
