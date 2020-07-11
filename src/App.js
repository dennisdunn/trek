import React, { useState } from 'react';
import { GameContext } from './GameContext';

function App() {
  const [state, setState] = useState({});
  return (
    <div className="App">
      <GameContext.Provider value={{ context: state, updateContext: setState }}>
        hello world
      </GameContext.Provider>
    </div>
  );
}

export default App;
