import React from 'react';
import './bridge.css';

export const Bridge = props => {
    return (
        <div className='bridge'>
            <div className="cell comms">
                Communications Log
            </div>
            <div className="cell sensors">
                Sensor Control
            </div>
            <div className="cell shields">
                Shield Control
            </div>
            <div className="cell warp">
                Warp Drive Control
            </div>
            <div className="cell computer">
                Library Computer
            </div>
            <div className="cell phasars">
                Phaser Control
            </div>
            <div className="cell torpedos">
                Photon Torpedo Control
            </div>
        </div >
    );
}
