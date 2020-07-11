import React from 'react';
import './bridge.css';
import { CommsLog } from '.';

export const Bridge = props => {
    return (
        <div className='bridge'>
            <div className="cell-no-top comms">
                <CommsLog />
            </div>
            <div className="cell sensors">
                Sciences
            </div>
            <div className="cell shields">
                Shields
            </div>
            <div className="cell warp">
                Warp Drive
            </div>
            <div className="cell-no-bottom  computer">
                Library Computer
            </div>
            <div className="cell-no-bottom  phasars">
                Phaser
            </div>
            <div className="cell-no-bottom  torpedos">
                Photon Torpedo
            </div>
        </div >
    );
}
