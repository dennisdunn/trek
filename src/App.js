import React from 'react'
import { Bridge, Introduction } from './components'
import { Context } from './components/context'

function App() {

  return (
    <div className='App'>
      <Context>
        <Bridge />
        <Introduction />
      </Context>
    </div >
  )
}

export default App
