import React from "react";
import { useSelector } from "react-redux";

import EditingInformation from "../EditingInformation/EditingInformation";
import PlayingInformation from "../PlayingInformation/PlayingInformation";

import GithubLogo from "../../assets/github.svg";
import LinkedinLogo from "../../assets/linkedin.svg";
import "./informationContainer.styles.scss";
import GameInformation from "../GameInformation/GameInformation";

export default function InformationContainer() {
  const { canPlay, canEdit } = useSelector((store: any) => store.gameState);

  const userPlayingOrEditing = canPlay ? (
    <PlayingInformation />
  ) : (
    <EditingInformation />
  );

  return (
    <section className="information-container">
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
      {canPlay || canEdit ? userPlayingOrEditing : <GameInformation />}
    </section>
  );
}
