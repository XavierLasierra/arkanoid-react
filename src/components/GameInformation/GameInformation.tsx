import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { canPlayState } from '../../redux/actions/gameState.creator';
import EditingInformation from '../EditingInformation/EditingInformation';
import PlayingInformation from '../PlayingInformation/PlayingInformation';
import SmallGameCanvas from '../SmallGameCanvas/SmallGameCanvas';

import './gameInformation.styles.scss';

export default function GameInformation() {
  const { canPlay, canEdit } = useSelector((store: any) => store.gameState);
  const boards = useSelector((store: any) => store.boards);
  const dispatch = useDispatch();
  function handleCanPlay() {
    dispatch(canPlayState());
  }

  const userInteractive = canPlay
    ? <PlayingInformation />
    : <EditingInformation />;

  return (
    <div className="information-container">
      {(canPlay || canEdit)
        ? userInteractive
        : (
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
            <div className="game-information__demos">
              {boards.map((board: number[][], index: number) => (
                <SmallGameCanvas
                  board={board}
                  currentBoard={index}
                />
              ))}
              <button className="add-button" type="button">+</button>
            </div>
          </section>
        )}
    </div>
  );
}
