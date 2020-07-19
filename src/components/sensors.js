import React, { Fragment, useState } from 'react';
import { colors, Context, Display, ElementLayer, FederationShipMarker, Frame, FrameButton, FrameButtonBar, FrameTitle, GraphicsLayer, KlingonShipMarker } from '.';
import { shortRangeScan } from 'trek-engine';
import { Vector } from 'coordinates';
import { StarMarker, StarbaseMarker } from './marker';

const drawGrids = graphicsContext => {
    graphicsContext.strokeStyle = 'lightgray';
    graphicsContext.moveTo(225, 450);
    graphicsContext.lineTo(225, 0);
    graphicsContext.moveTo(0, 225);
    graphicsContext.lineTo(450, 225);

    for (let i = 1; i <= 4; i++) {
        const r = 225 * Math.sqrt(i / 4)
        graphicsContext.arc(225, 225, r, 0, 2 * Math.PI)
    }
    graphicsContext.stroke();
}

const drawSectors = graphicsContext => {
    const arc = 2 * Math.PI / 16;
    graphicsContext.strokeStyle = 'none';
    for (let i = 0; i < 16; i++) {
        const color = colors[i % colors.length];
        graphicsContext.moveTo(225, 255);
        graphicsContext.beginPath();
        graphicsContext.arc(225, 225, 225, i * arc, (i + 1) * arc);
        graphicsContext.lineTo(225, 225);
        graphicsContext.fillStyle = color + 'c';
        graphicsContext.fill();
    }
}

const drawMarkers = (objs = []) => {
    console.log(objs)
    let key = 0;
    const maxR = Math.max(...objs.map(o => o.position.r));
    const scale = 225 / maxR;

    const markers = objs.map(o => {
        const position = Vector.Polar.scale(o.position, scale)

        switch (o.type) {
            case 'star':
                return (<StarMarker position={position} key={key++} />)
            case 'enemy':
                return (<KlingonShipMarker position={position} key={key++} />)
            case 'base':
                return (<StarbaseMarker position={position} key={key++} />)
            default:
                break;
        }
    })

    return (
        <Fragment>
            <FederationShipMarker position={{ r: 0, theta: 0 }} />
            {markers}
        </Fragment>
    )
}

const srs = (context, setScan) => {
    const scan = shortRangeScan(context.game, context.sectors, context.ship)
    setScan(scan)
}

export const Sensors = props => {
    const [scan, setScan] = useState({ sector: '', objs: [] })

    return (
        <Context.Consumer>
            {context => {
                return (
                    <Frame className='sensors lcars-atomic-tangerine-border' type='bracket'>
                        <FrameTitle title={scan.sector.name} />
                        <FrameButtonBar>
                            <FrameButton onClick={() => srs(context, setScan)} className='lcars-hopbush-bg' text='Short Range Scan' />
                            <FrameButton className='lcars-hopbush-bg' text='Long Range Scan' />
                        </FrameButtonBar>
                        <Display height={450} width={450}>
                            <GraphicsLayer>
                                {drawGrids}
                            </GraphicsLayer>
                            <GraphicsLayer>
                                {drawSectors}
                            </GraphicsLayer>
                            <ElementLayer>
                                {drawMarkers(scan.objs)}
                            </ElementLayer>
                        </Display>
                    </Frame>)
            }}
        </Context.Consumer>
    )
}