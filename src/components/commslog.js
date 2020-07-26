import React from 'react';
import { ShipContext } from '.';

export const CommsLog = props => {
    const shipCtx = React.useContext(ShipContext)

    return (
        <ul>
            {shipCtx.ship.comms.map(m => (<li>{m}</li>))}
        </ul>
    );
}