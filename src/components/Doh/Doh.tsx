import React from "react";
import { IDohProps } from "../../types/interfaces";

import "./doh.styles.scss";

export default function Doh({ positionX, dohSize }: IDohProps) {
  const dohStyles = {
    transform: `translate(${positionX - dohSize.width / 2}px, 0px)`,
    width: `${dohSize.width}px`,
    height: `${dohSize.height}px`,
  };

  return <div className="doh" style={dohStyles} />;
}
