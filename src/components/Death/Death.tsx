import React, { useEffect, useState } from 'react';
import { IDeathProps } from '../../types/interfaces';

import './death.styles.scss';

export default function Death({ lives, canPlay }: IDeathProps) {
  const [deathAnimation, setDeathAnimation] = useState(false);

  useEffect(() => {
    if (lives < 3) {
      setDeathAnimation(true);
      setTimeout(() => setDeathAnimation(false), 100);
    }
  }, [lives]);

  return (
    <div className={`death-screen ${deathAnimation && 'death-screen--active'}`}>
      {!canPlay && <p className="death-screen__game-over">START NEW GAME</p>}
    </div>
  );
}
