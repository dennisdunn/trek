import React from 'react'
import './bridge.css'
import { CommsLog } from '.'
import { Sensors } from './sensors'

export const Bridge = props => {
  return (
    <div className='bridge'>
      <div className='cell no-top comms'>
        <div className='cell-title'>Communications Log</div>
        <CommsLog />
      </div>
      <div className='cell sensors'>
        <div className='cell-title'>Sciences</div>
        <Sensors />
      </div>
      <div className='cell shields'>
        <div className='cell-title'>Shields</div>
      </div>
      <div className='cell warp'>
        <div className='cell-title'>Warp Drive</div>
      </div>
      <div className='cell no-bottom  computer'>
        <div className='cell-title'>Library Computer</div>
      </div>
      <div className='cell no-bottom  phasars'>
        <div className='cell-title'>Phaser</div>
      </div>
      <div className='cell no-bottom  torpedos'>
        <div className='cell-title'>Photon Torpedo</div>
      </div>
    </div>
  )
}
