import React from "react";
import { useDispatch, useSelector } from "react-redux";

import EditingInformation from "../EditingInformation/EditingInformation";
import PlayingInformation from "../PlayingInformation/PlayingInformation";
import SmallGameCanvas from "../SmallGameCanvas/SmallGameCanvas";

import {
  canEditState,
  canPlayState,
  createBoard,
  deleteBoard,
} from "../../redux/actions/gameState.creator";
import { MAX_BOARDS } from "../../constants/gameBoard.constants";

import GithubLogo from "../../assets/github.svg";
import LinkedinLogo from "../../assets/linkedin.svg";
import "./informationContainer.styles.scss";

export default function InformationContainer() {
  const dispatch = useDispatch();
  const { canPlay, canEdit } = useSelector((store: any) => store.gameState);
  const boards = useSelector((store: any) => store.boards);

  function handleCanPlay() {
    dispatch(canPlayState());
  }

  function handleCanEdit() {
    dispatch(canEditState());
  }

  function handleBoardCreation() {
    dispatch(createBoard());
  }

  function handleBoardDelete(currentBoard: number) {
    dispatch(deleteBoard(currentBoard));
  }

  const userPlayingOrEditing = canPlay ? (
    <PlayingInformation />
  ) : (
    <EditingInformation />
  );

  return (
    <div className="information-container">
      <div className="creator-information">
        <div className="web-title">
          <h1 className="web-title__main-title">Arkanoid</h1>
          <h2 className="web-title__subtitle">by Xavier Lasierra</h2>
        </div>
        <div className="social-networks">
          <a href="https://github.com/XavierLasierra">
            <img
              className="social-networks__icon"
              src={GithubLogo}
              alt="Github"
            />
          </a>
          <a href="https://www.linkedin.com/in/xavierlasierra/">
            <img
              className="social-networks__icon"
              src={LinkedinLogo}
              alt="Linkedin"
            />
          </a>
        </div>
      </div>
      {canPlay || canEdit ? (
        userPlayingOrEditing
      ) : (
        <section className="game-information">
          <p className="game-information__description">
            This application is a simple version of the arcade game{" "}
            <a
              className="game-information__game-link"
              href="https://en.wikipedia.org/wiki/Arkanoid"
            >
              arcanoid
            </a>
            .
          </p>
          <div className="game-information__buttons">
            <button
              className="button"
              type="button"
              onClick={handleCanPlay}
              aria-label="Start Game"
            >
              START
            </button>
            <button
              className="button"
              type="button"
              onClick={handleCanEdit}
              aria-label="Edit Gameboard"
            >
              EDIT
            </button>
          </div>
          <div className="game-information__demos">
            {boards.map((board: number[][], index: number) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`board-${index}`}
                className="demo"
              >
                <SmallGameCanvas board={board} currentBoard={index} />
                {boards.length > 1 && (
                  <button
                    className="demo__delete"
                    type="button"
                    onClick={() => handleBoardDelete(index)}
                  >
                    D
                  </button>
                )}
              </div>
            ))}
            {boards.length < MAX_BOARDS && (
              <button
                className="add-button"
                type="button"
                onClick={handleBoardCreation}
              >
                +
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
