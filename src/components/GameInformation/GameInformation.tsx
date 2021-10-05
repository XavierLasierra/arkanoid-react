import React from 'react';
import { useDispatch } from 'react-redux';
import { canPlayState } from '../../redux/actions/gameState.creator';

import './gameInformation.styles.scss';

export default function GameInformation() {
  const dispatch = useDispatch();
  function handleCanPlay() {
    dispatch(canPlayState());
  }

  return (
    <section className="game-information">
      <div className="web-title">
        <h1 className="web-title__main-title">Arkanoid</h1>
        <h2 className="web-title__subtitle">by Xavier Lasierra</h2>
      </div>
      <p className="game-information__description">
        This application is a simple version of the arcade game
        {' '}
        <a className="game-information__game-link" href="https://en.wikipedia.org/wiki/Arkanoid">arcanoid</a>
        .
      </p>
      <div className="game-information__buttons">
        <button className="button" type="button" onClick={handleCanPlay}>START</button>
        <button className="button" type="button">EDIT</button>
      </div>
    </section>
  );
}
