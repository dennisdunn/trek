import React, { useState } from 'react'
import { initGameState, initSectors, initShip } from 'trek-engine'
import { Bridge, Context } from './components'

function App() {
  const [game, setGame] = useState(initGameState())
  const [ship, setShip] = useState(initShip())
  const sectors = initSectors()

  // player.log.push("SCOTTY: I'donna tink she'll make it!");
  // player.log.push("MCCOY: Spock, you green-blooded, pointy-eared...");
  // player.log.push("MCCOY: Damn it, Scotty! I'm a doctor, not an engineer!");
  // player.log.push("SPOCK: Doctor McCoy, I raise my eybrows at you.");
  // player.log.push("SCOTTY: Is'a no one listening? The warp core is overloading! Shes'a gonna' blow!");

  return (
    <div className='App'>
      <Context.Provider value={{ game, setGame, ship, setShip, sectors }}>
        <Bridge />
      </Context.Provider>
    </div>
  )
}

export default App
