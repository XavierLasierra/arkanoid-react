import React, { useEffect, useState } from "react";
import { IDeathProps } from "../../types/interfaces";

import { DEATH_ANIMATION_TIME } from "../../constants/gameBoard.constants";

import "./death.styles.scss";

export default function Death({ lives, canPlay }: IDeathProps) {
  const [deathAnimation, setDeathAnimation] = useState(false);

  function animateDeath(animationTime: number) {
    setDeathAnimation(true);
    setTimeout(() => setDeathAnimation(false), animationTime);
  }

  useEffect(() => {
    if (lives < 3) {
      animateDeath(DEATH_ANIMATION_TIME);
    }
  }, [lives]);

  return (
    <div className={`death-screen ${deathAnimation && "death-screen--active"}`}>
      {!canPlay && <p className="death-screen__game-over">START NEW GAME</p>}
    </div>
  );
}
