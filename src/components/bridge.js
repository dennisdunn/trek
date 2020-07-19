import React from 'react';
import { colors, CommsLog, Display, ElementLayer, FederationShipMarker, Frame, FrameButton, FrameButtonBar, FrameTitle, GraphicsLayer, KlingonShipMarker } from '.';

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
        <FrameButtonBar>
          <FrameButton className='lcars-hopbush-bg' text='Short Range Scan' />
          <FrameButton className='lcars-hopbush-bg' text='Long Range Scan' />
        </FrameButtonBar>
        <Display height={450} width={450}>
          <GraphicsLayer>
            {graphics => {
              graphics.strokeStyle = 'lightgray';
              graphics.moveTo(225, 450);
              graphics.lineTo(225, 0);
              graphics.moveTo(0, 225);
              graphics.lineTo(450, 225);

              for (let i = 1; i <= 4; i++) {
                const r = 225 * Math.sqrt(i / 4)
                graphics.arc(225, 225, r, 0, 2 * Math.PI)
              }
              graphics.stroke();
            }}
          </GraphicsLayer>
          <GraphicsLayer>
            {graphics => {
              const arc = 2 * Math.PI / 16;
              graphics.strokeStyle = 'none';
              for (let i = 0; i < 16; i++) {
                const color = colors[i % colors.length];
                graphics.moveTo(225, 255);
                graphics.beginPath();
                graphics.arc(225, 225, 225, i * arc, (i + 1) * arc);
                graphics.lineTo(225, 225);
                graphics.fillStyle = color + 'c';
                graphics.fill();
              }
            }}
          </GraphicsLayer>
          <ElementLayer>
            <FederationShipMarker position={{ r: 0, theta: 0 }} />
            <KlingonShipMarker position={{ r: 0.5, theta: Math.PI / 3.2 }} />
          </ElementLayer>
        </Display>
      </Frame>
      <Frame className='shields lcars-atomic-tangerine-border' type='left'>
        <FrameTitle title='Shields' />
      </Frame>
      <Frame className='warp lcars-atomic-tangerine-border' type='left'>
        <FrameTitle title='Warp Drive' />
        <FrameButtonBar>
          <FrameButton className='lcars-dodger-blue-bg' text='Engage' />
        </FrameButtonBar>
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
