import { Vector } from 'coordinates';
import React, { Fragment, useState } from 'react';
import { shortRangeScan } from 'trek-engine';
import { Context, Display, Frame, FrameButton, FrameButtonBar, FrameTitle, KlingonShipMarker, LrsDisplay, SrsDisplay, StarbaseMarker, StarMarker } from '.';
import { CelPanel } from './display';

// const drawMarkers = (objs = []) => {
//     let key = 0;
//     const maxR = Math.max(...objs.map(o => o.position.r));

//     const markers = objs.map(o => {
//         const pos = Vector.Polar.scale(o.position, maxR * o.position.r);
//         switch (o.type) {
//             case 'star':
//                 return (<StarMarker position={pos} key={key++} />)
//             case 'enemy':
//                 return (<KlingonShipMarker position={pos} key={key++} />)
//             case 'base':
//                 return (<StarbaseMarker position={pos} key={key++} />)
//             default:
//                 throw new Error('unknown galactic object type')
//         }
// //     })

//     return (
//         <Fragment>
//             {markers}
//         </Fragment>
//     )
// }

export const Sensors = props => {
    const [title, setTitle] = useState('Sensor Scan');
    const [layers, setLayers] = useState(<SrsDisplay />);

    const srs = (context) => {
        const scan = shortRangeScan(context.game, context.sectors, context.ship);
        // const markers = drawMarkers(scan.objs);
        setTitle(scan.sector.name);
        setLayers(<SrsDisplay />);
    }

    const lrs = (context) => {
        setTitle('Long Range Scan')
        setLayers(<LrsDisplay />);
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