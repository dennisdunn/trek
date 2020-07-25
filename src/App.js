import React, { useState } from 'react'
import { initGameState, initSectors, initShip } from 'trek-engine'
import { Bridge, GameContext, ScannerContext, ShipContext } from './components'

function App() {
  const [game, setGame] = useState(initGameState())
  const [ship, setShip] = useState(initShip())
  const [srsScan, setSrsScan] = useState([])
  const [lrsScan, setLrsScan] = useState(new Set())
  const [sectorName, setSectorName] = useState('Unknown Sector')
  const sectors = initSectors()

  // comms.add("SPOCK: Captain on deck.");
  // comms.add("SCOTTY: I'donna tink she'll make it!");
  // comms.add("MCCOY: Spock, you green-blooded, pointy-eared...");
  // comms.add("SPOCK: Doctor McCoy, I raise my eybrows at you.");
  // comms.add("SCOTTY: Is'a no one listening? The warp core is overloading! Shes'a not feeling well!");
  // comms.add("MCCOY: Damn it, Scotty! I'm a doctor, not an engineer!");

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
