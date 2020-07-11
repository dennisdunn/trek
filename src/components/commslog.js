import React from 'react';
import { PlayerContext } from '.';

export const CommsLog = props => {
    const list = arr => {
        let key = 0;
        return (
            <ul>
                {arr.map(item => (<li key={key++}>{item}</li>))}
            </ul>
        )
    }

    return (
        <PlayerContext.Consumer >
            {({ player }) => list(player.log)}
        </PlayerContext.Consumer>
    );
}