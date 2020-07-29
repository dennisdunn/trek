import React from 'react';
import { useComms } from './store';

export const Comms = props => {
    const comms = useComms()

    return (
        <div style={{ fontSize: '1.4rem', marginLeft: '1rem', display: 'flex', flexDirection: 'column-reverse', marginTop: '1rem' }}>
            {comms.log.reverse().map(m => (<div>{m}</div>))}
        </div>
    );
}