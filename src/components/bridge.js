import React, { useState } from 'react'
import { initGameState, initSectors, initShip } from 'trek-engine'
import { CommsLog, Frame, FrameTitle, Scanners, WarpControl, ScannerContext } from '.';
import { PhaserControl } from './phasers';
import { ShieldControl } from './shields';
import { TorpedoControl } from './torpedos';
import { CommsContext, ShipContext } from './context';

export const Bridge = props => {
  const [srsScan, setSrsScan] = useState([])
  const [lrsScan, setLrsScan] = useState(new Set())
  const [sectorName, setSectorName] = useState('Unknown Sector')
  const sectors = initSectors()
  const shipctx = React.useContext(ShipContext)

  return (
    <div className='bridge'>
      <Frame className='comms lcars-atomic-tangerine-border' type='bottom' justify='left'>
        <FrameTitle title='Communications Log' />
        <CommsContext.Provider value={shipctx.ship.comms}>
          <CommsLog />
        </CommsContext.Provider>
      </Frame>

      <Frame className='status lcars-atomic-tangerine-border' type='bottom'>
        <FrameTitle title='Ship Status' />
      </Frame>

      <Frame className='sensors lcars-atomic-tangerine-border' type='bracket'>
        <FrameTitle title='Sciences' />
        <ScannerContext.Provider value={{
          srsScan, setSrsScan,
          lrsScan, setLrsScan,
          sectorName, setSectorName,
          sectors
        }}>
          <Scanners />
        </ScannerContext.Provider>
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
        <FrameTitle title='Photon Torpedo' />
        <TorpedoControl />
      </Frame>
    </div>
  )
}
