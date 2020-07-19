import React from 'react';
import { Context } from '.';

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
        <Context.Consumer >
            {({ ship }) => list(ship.log)}
        </Context.Consumer>
    );
}