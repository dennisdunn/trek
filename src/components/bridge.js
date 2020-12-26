import React, { useEffect } from 'react';
import { Comms, Frame, FrameTitle, Sensors, Status, WarpControl } from '.';
import { PhaserControl } from './phasers';
import { ShieldControl } from './shields';
import { useDispatch, useGame, useShip } from './store';
import { TorpedoControl } from './torpedos';

export const Bridge = props => {
  const game = useGame()
  const ship = useShip()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ sys: 'sensors', type: 'srs-scan', payload: { game, ship } })
  }, [])

  return (
    <div className='bridge'>
      <Frame className='comms lcars-atomic-tangerine-border' type='bottom' justify='left'>
        <FrameTitle title='Comms' />
        <Comms />
      </Frame>

      <Frame className='status lcars-atomic-tangerine-border' type='bottom' justify='left'>
        <FrameTitle title='Status' />
        <Status />
      </Frame>

      <Frame className='sensors lcars-atomic-tangerine-border' type='bracket'>
        <FrameTitle title='Sciences' />
        <Sensors />
      </Frame>

      <Frame className='shields lcars-atomic-tangerine-border' type='left'>
        <FrameTitle title='Shields' />
        <ShieldControl />
      </Frame>

      <Frame className='warp lcars-atomic-tangerine-border' type='left'>
        <FrameTitle title='Warp Drive' />
        <WarpControl />
      </Frame>

      <Frame className='phasers lcars-atomic-tangerine-border' type='top'>
        <FrameTitle title='Phasers' />
        <PhaserControl />
      </Frame>

      <Frame className='torpedos lcars-atomic-tangerine-border' type='top'>
        <FrameTitle title='Photon Torpedos' />
        <TorpedoControl />
      </Frame>
    </div>
  )
}
