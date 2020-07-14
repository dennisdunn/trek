import React, { useState } from 'react';
import { lrs, srs } from 'star-trek-game';
import { GameContext, logMessage, Lrs, PlayerContext, Srs } from '.';
import './sensors.css';

const LRS_RANGE = 0.2;
const DAMAGE_THRESHOLD = 0.85;

export const Sensors = props => {
    const [sensor, setSensor] = useState(<div />);

    const handleSrs = (game, player) => {
        if (player.ship.status.srs >= DAMAGE_THRESHOLD) {
            logMessage(player, 'SPOCK: The short range scanners are inoperative.');
        } else {
            const items = srs(game.objs, game.sectors, player.ship);
            setSensor(<Srs items={items} />)
        }
    }

    const handleLrs = (game, player) => {
        if (player.ship.status.lrs >= DAMAGE_THRESHOLD) {
            logMessage(player, 'SPOCK: The long range scanners are inoperative.');
        } else {
            const items = lrs(game.objs, player.ship, LRS_RANGE);
            setSensor(<Lrs items={items} />)
        }
    }

    return (
        <PlayerContext.Consumer >
            {player => (
                <GameContext.Consumer>{({ game }) => (
                    <div className='sensors'>
                        <div className='controls'>
                            <button className='btn info' onClick={() => handleSrs(game, player)}>S-R-S</button>
                            <button className='btn info' onClick={() => handleLrs(game, player)}>L-R-S</button>
                        </div>
                        {sensor}
                    </div>)}
                </GameContext.Consumer>
            )}
        </PlayerContext.Consumer>
    );
}