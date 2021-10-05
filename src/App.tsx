import React from 'react';
import GamePage from './components/GamePage/GamePage';

import './app.styles.scss';
import GameInformation from './components/GameInformation/GameInformation';

function App() {
  return (
    <main className="main">
      <GamePage />
      <GameInformation />
    </main>
  );
}

export default App;
