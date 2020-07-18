import React from 'react'
import { CommsLog, Display, GraphicsLayer, ElementLayer } from '.'
import './bridge.css'
import './lcarsColors.css'
import { colors } from './colors';
import { FederationShipMarker, KlingonShipMarker } from './marker';

export const Bridge = props => {
  return (
    <div className='bridge'>
      <div className='cell no-top comms'>
        <div className='cell-title'>Communications Log</div>
        <CommsLog />
      </div>
      <div className='cell no-top status'>
        <div className='cell-title'>Ship Status</div>
      </div>
      <div className='cell bracket sensors'>
        <div className='cell-title'>Sciences</div>
        <div className='flex-centered'>
          <div className='button-box'>
            <button className='lcars-hopbush-bg'>Short Range Scan</button>
            <button className='lcars-hopbush-bg'>Long Range Scan</button>
          </div>
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
        </div>
      </div>
      <div className='cell shields'>
        <div className='cell-title'>Shields</div>
      </div>
      <div className='cell warp'>
        <div className='button-box'>
          <button className='lcars-dodger-blue-bg'>Engage</button>
        </div>
        <div className='cell-title'>Warp Drive</div>
      </div>
      <div className='cell no-bottom  phasers'>
        <div className='button-box'>
          <button className='lcars-tamarillo-bg'>Fire</button>
        </div>
        <div className='cell-title'>Phaser</div>
      </div>
      <div className='cell no-bottom  torpedos'>
        <div className='button-box'>
          <button className='lcars-tamarillo-bg'>Launch</button>
        </div>
        <div className='cell-title'>Photon Torpedo</div>
      </div>
    </div>
  )
}
