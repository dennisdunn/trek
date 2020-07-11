import React, { useState } from 'react';
import { GameContext, PlayerContext, Bridge } from './components';
import { newGame, newPlayer } from 'star-trek-game';

function App() {
  const [game, setGame] = useState(newGame());
  const [player, setPlayer] = useState(newPlayer());

  return (
    <div className="App">
      <GameContext.Provider value={{ game, setGame }}>
        <PlayerContext.Provider value={{ player, setPlayer }}>
          <Bridge />
        </PlayerContext.Provider>
      </GameContext.Provider>
    </div>
  );
}

export default App;
