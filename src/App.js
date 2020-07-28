import React from 'react'
import { Bridge, Introduction, StoreProvider } from './components'

function App() {

  return (
    <div className='App'>
      <StoreProvider>
        <Bridge />
        <Introduction />
      </StoreProvider>
    </div >
  )
}

export default App
