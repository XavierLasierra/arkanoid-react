import React from 'react';
import { useDispatch } from 'react-redux';
import { discardBoardChanges, startBoardSave } from '../../redux/actions/gameState.creator';

import './editingInformation.styles.scss';

export default function EditingInformation() {
  const dispatch = useDispatch();

  function handleSave() {
    dispatch(startBoardSave());
  }

  function handleDiscard() {
    dispatch(discardBoardChanges());
  }

  return (
    <section className="edit-information">
      <p className="edit-information__description">Click on the screen to add or delete a block</p>
      <div className="edit-information__buttons">
        <button className="button button--wide" type="button" onClick={handleSave} aria-label="Save edit">SAVE</button>
        <button className="button button--wide" type="button" onClick={handleDiscard} aria-label="Discard edit">DISCARD</button>
      </div>
    </section>
  );
}
