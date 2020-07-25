import React, { useEffect, useState } from 'react';
import { Pubsub } from './pubsub';

export const CommsLog = props => {
    const [msgs, setMsgs] = useState([])

    const handler = data => {
        setMsgs([...msgs, data])
    }

    useEffect(() => {
        return Pubsub.subscribe('comms', handler)
    }, [])

    return (
        <ul>
            {msgs.map(m => (<li>{m}</li>))}
        </ul>
    );
}