import React from 'react';
import { CommsLog, Frame, FrameButton, FrameButtonBar, FrameTitle, Scanners, WarpControl } from '.';

export const Bridge = props => {

  return (
    <div className='bridge'>
      <Frame className='comms lcars-atomic-tangerine-border' type='bottom'>
        <FrameTitle title='Communications Log' />
        <CommsLog />
      </Frame>

      <Frame className='status lcars-atomic-tangerine-border' type='bottom'>
        <FrameTitle title='Ship Status' />
      </Frame>

      <Frame className='sensors lcars-atomic-tangerine-border' type='bracket'>
        <FrameTitle title='Sciences' />
        <Scanners />
      </Frame>

      <Frame className='shields lcars-atomic-tangerine-border' type='left'>
        <FrameTitle title='Shields' />
      </Frame>

      <Frame className='warp lcars-atomic-tangerine-border' type='left'>
        <FrameTitle title='Warp Drive' />
        <WarpControl />
      </Frame>

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
