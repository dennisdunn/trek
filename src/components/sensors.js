import React, { useState, Fragment } from 'react';
import { shortRangeScan, longRangeScan } from 'trek-engine';
import { Context, Frame, FrameButton, FrameButtonBar, FrameTitle, LrsDisplay, SrsDisplay } from '.';
import { CelPanel } from './cel';
import { Sprite } from './sprite';

const sprite = {
    federation: { index: 0, scale: 0.7 },
    enemy: { index: 1, scale: 0.5 },
    base: { index: 2, scale: 0.5 },
    star: { index: 3, scale: 0.4 }
}

const mkTitle = obj => {
    return { title: `Range: ${obj.position.r.toFixed(2)}\nBearing: ${obj.position.theta.toFixed(3)}` }
}

const mkLrsMarkers = objs => {
    const sprite = {
        federation: { index: 0, scale: 0.5 },
        enemy: { index: 1, scale: 0.4 },
        base: { index: 2, scale: 0.4 },
        star: { index: 3, scale: 0.2 }
    }
    let key = 0
    return objs.map(o => <Sprite {...sprite[o.type]}
        position={o.position}
        key={key++} />)
}

const mkSrsMarkers = objs => {
    let key = 0
    const scale = 1 / Math.max(...objs.map(o => o.position.r))
    return objs.map(o => <Sprite {...sprite[o.type]}
        position={{ ...o.position, r: scale * o.position.r }}
        {...mkTitle(o)}
        key={key++} />)
}

export const Sensors = props => {
    const [title, setTitle] = useState('Sensor Scan');
    const [layers, setLayers] = useState(<SrsDisplay />);

    const srs = (context) => {
        const scan = shortRangeScan(context.game, context.sectors, context.ship);
        const markers = mkSrsMarkers(scan.objs);
        setTitle(scan.sector.name);
        setLayers(<SrsDisplay markers={markers} />);
    }

    const lrs = (context) => {
        const scan = longRangeScan(context.game, context.ship, 0.1);
        const markers = mkLrsMarkers(scan);
        // setTitle(scan.sector.name);
        setLayers(<LrsDisplay markers={markers} position={context.ship.position} />);
    }

    return (
        <Context.Consumer>
            {context => {
                return (
                    <Frame className='sensors lcars-atomic-tangerine-border' type='bracket'>
                        <FrameTitle title={title} />
                        <FrameButtonBar>
                            <FrameButton onClick={() => srs(context)} className='lcars-hopbush-bg' text='Short Range Scan' />
                            <FrameButton onClick={() => lrs(context)} className='lcars-hopbush-bg' text='Long Range Scan' />
                        </FrameButtonBar>
                        <CelPanel height={450} width={450} >
                            {layers}
                        </CelPanel>
                    </Frame>)
            }}
        </Context.Consumer>
    )
}