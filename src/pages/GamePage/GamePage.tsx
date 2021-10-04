import React, { useState } from 'react';
import Doh from '../../components/Doh/Doh';

import { dohSize, gameBoardSize } from '../../constants/gameBoard.constants';

const useMove = () => {
  const [state, setState] = useState(0);

  const handleMouseMove = ({ persist, clientX }: any) => {
    persist();
    if (clientX < dohSize.width / 2) {
      setState(dohSize.width / 2);
    } else if (clientX > gameBoardSize.width - dohSize.width / 2) {
      setState(gameBoardSize.width - dohSize.width / 2);
    } else {
      setState(clientX);
    }
  };
  return {
    x: state,
    handleMouseMove,
  };
};

const gamePageStyles = {
  width: `${gameBoardSize.width}px`,
  height: `${gameBoardSize.height}px`,
  backgroundColor: 'blue',
};

export default function GamePage() {
  const { x, handleMouseMove } = useMove();

  return (
    <section style={gamePageStyles} onMouseMove={handleMouseMove}>
      <p>{x}</p>
      <Doh positionX={x} dohSize={dohSize} />
    </section>
  );
}
