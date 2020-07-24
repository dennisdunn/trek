import React, { useState } from 'react';
import { CommsLog, Frame, FrameButton, FrameButtonBar, FrameTitle, Sensors, WarpControl } from '.';

export const Bridge = props => {
  const [refresh, setRefresh] = useState(0)

  return (
    <div className='bridge'>
      <Frame className='comms lcars-atomic-tangerine-border' type='bottom'>
        <FrameTitle title='Communications Log' />
        <CommsLog />
      </Frame>
      <Frame className='status lcars-atomic-tangerine-border' type='bottom'>
        <FrameTitle title='Ship Status' />
      </Frame>
      <Sensors refresh={refresh} />
      <Frame className='shields lcars-atomic-tangerine-border' type='left'>
        <FrameTitle title='Shields' />
      </Frame>
      <WarpControl onMove={() => setRefresh(Math.random())} />
      <Frame className='phasers lcars-atomic-tangerine-border' type='top'>
        <FrameTitle title='Phasers' />
        <FrameButtonBar>
          <FrameButton className='lcars-tamarillo-bg' text='Fire' />
        </FrameButtonBar>
      </Frame>
      <Frame className='torpedos lcars-atomic-tangerine-border' type='top'>
        <FrameTitle title='Photon Torpedo' />
        <FrameButtonBar>
          <FrameButton className='lcars-tamarillo-bg' text='Launch' />
        </FrameButtonBar>
      </Frame>
    </div>
  )
}
