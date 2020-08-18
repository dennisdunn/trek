import React from 'react'
import { Bridge, StoreProvider, Game } from './components'

function App() {
  return (
    <div className='App'>
      <StoreProvider>
        <Game>
          <Bridge />
        </Game>
      </StoreProvider>
    </div >
  )
}

export default App
