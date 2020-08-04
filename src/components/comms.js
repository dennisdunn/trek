import React from 'react';
import { useComms } from './store';

export const Comms = props => {
    const { log = [] } = useComms()

    return (
        <div style={{ fontSize: '1.4rem', marginLeft: '1rem', display: 'flex', flexDirection: 'column', marginTop: '1rem' }}>
            {log.slice(log.length - 2).map(m => (<div>{m}</div>))}
        </div>
    );
}