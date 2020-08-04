import React from 'react'
import { Bridge, StoreProvider } from './components'

function App() {
  return (
    <div className='App'>
      <StoreProvider>
        <Bridge />
      </StoreProvider>
    </div >
  )
}

export default App
