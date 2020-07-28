import React, { useContext } from 'react';
import { CommsContext } from './context';

export const Comms = props => {
    const [comms, _] = useContext(CommsContext)
    console.log('comms')
    return (
        <div style={{ fontSize: '1.4rem', marginLeft: '1rem', display: 'flex', flexDirection: 'column-reverse', marginTop: '1rem' }}>
            {comms.log.reverse().map(m => (<div>{m}</div>))}
        </div>
    );
}