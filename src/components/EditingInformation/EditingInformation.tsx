import React from 'react';

import './editingInformation.styles.scss';

export default function EditingInformation() {
  function handleSave() {

  }

  function handleDiscard() {

  }

  return (
    <section className="edit-information">
      <p className="edit-information__description">Click on the screen to add or delete a block</p>
      <div className="edit-information__buttons">
        <button className="button" type="button" onClick={handleSave}>SAVE</button>
        <button className="button" type="button" onClick={handleDiscard}>DISCARD</button>
      </div>
    </section>
  );
}
