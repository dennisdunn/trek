import React, { useState } from 'react'
import { initGameState, initSectors, initShip } from 'trek-engine'
import { Bridge, GameContext, Introduction, ScannerContext, ShipContext } from './components'

function App() {
  const [game, setGame] = useState(initGameState())
  const [ship, setShip] = useState(initShip())

  return (
    <div className='App'>
      <GameContext.Provider value={{
        game, setGame
      }}>
        <ShipContext.Provider value={{
          ship, setShip
        }}>
          <Bridge />
          <Introduction />
        </ShipContext.Provider>
      </GameContext.Provider>
    </div >
  )
}

export default App
