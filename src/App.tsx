import React from "react";
import GamePage from "./components/GamePage/GamePage";

import "./app.styles.scss";
import InformationContainer from "./components/InformationContainer/InformationContainer";

function App() {
  return (
    <main className="main">
      <GamePage />
      <InformationContainer />
    </main>
  );
}

export default App;
