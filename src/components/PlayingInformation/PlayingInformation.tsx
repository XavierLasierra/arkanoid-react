import React from "react";
import { useDispatch } from "react-redux";
import { endGame } from "../../redux/actions/gameState.creator";

import "./playingInformation.styles.scss";

export default function PlayingInformation() {
  const dispatch = useDispatch();

  function handleQuitGame() {
    dispatch(endGame());
  }

  return (
    <section className="playing-information">
      <button
        className="button button--wide"
        type="button"
        onClick={handleQuitGame}
        aria-label="Quit game"
      >
        QUIT
      </button>
    </section>
  );
}
