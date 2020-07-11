import React, { useState } from 'react';
import { newGame, newPlayer } from 'star-trek-game';
import { Bridge, GameContext, PlayerContext } from './components';
import cloneDeep from 'lodash.clonedeep';

function App() {
  const [game, setGame] = useState(newGame());
  const [player, setPlayer] = useState(newPlayer());

  // player.log.push("SCOTTY: I'donna tink she'll make it!");
  // player.log.push("MCCOY: Spock, you green-blooded, pointy-eared...");
  // player.log.push("MCCOY: Damn it, Scotty! I'm a doctor, not an engineer!");
  // player.log.push("SPOCK: Doctor McCoy, I raise my eybrows at you.");
  // player.log.push("SCOTTY: Is'a no one listening? The warp core is overloading! Shes'a gonna' blow!");

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
