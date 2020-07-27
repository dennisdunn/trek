import React from 'react';
import { ShipContext } from '.';

export const CommsLog = props => {
    const shipCtx = React.useContext(ShipContext)

    return (
        <div style={{ fontSize: '1.4rem', marginLeft: '1rem', display: 'flex', flexDirection: 'column-reverse', marginTop: '1rem' }}>
            {shipCtx.ship.comms.reverse().map(m => (<div>{m}</div>))}
        </div>
    );
}