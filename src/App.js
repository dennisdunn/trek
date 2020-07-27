import React, { useState } from 'react'
import { initGameState, initSectors, initShip } from 'trek-engine'
import { Bridge, GameContext, Introduction, ScannerContext, ShipContext } from './components'

function App() {
  const [game, setGame] = useState(initGameState())
  const [ship, setShip] = useState(initShip())
  const [srsScan, setSrsScan] = useState([])
  const [lrsScan, setLrsScan] = useState(new Set())
  const [sectorName, setSectorName] = useState('Unknown Sector')
  const sectors = initSectors()

  return (
    <div className='App'>
      <GameContext.Provider value={{
        game, setGame
      }}>
        <ScannerContext.Provider value={{
          srsScan, setSrsScan,
          lrsScan, setLrsScan,
          sectorName, setSectorName,
          sectors
        }}>
          <ShipContext.Provider value={{
            ship, setShip
          }}>
            <Bridge />
          </ShipContext.Provider>
        </ScannerContext.Provider>
      </GameContext.Provider>
    </div>
  )
}

export default App
