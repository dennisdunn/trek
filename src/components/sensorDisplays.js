import React, { Fragment } from 'react';
import { colors, MarkerLayer, FederationShipMarker, GraphicsLayer, SpriteLayer, Sprite } from '.';

const drawAxis = graphics => {
    const halfW = graphics.canvas.width / 2;
    const halfH = graphics.canvas.height / 2;

    graphics.beginPath();
    graphics.moveTo(0, 0);
    graphics.lineTo(0, halfH);
    graphics.moveTo(0, 0);
    graphics.lineTo(0, -halfH);
    graphics.moveTo(0, 0);
    graphics.lineTo(halfW, 0);
    graphics.moveTo(0, 0);
    graphics.lineTo(-halfW, 0);

    graphics.stroke();
}

const drawGalacticGrid = graphics => {
    graphics.strokeStyle = 'white';
    drawAxis(graphics);

    graphics.beginPath();
    for (let i = 1; i <= 4; i++) {
        const r = 225 * Math.sqrt(i / 4)
        graphics.arc(0, 0, r, 0, 2 * Math.PI)
    }
    graphics.stroke();
}

const drawSectorGrid = graphics => {
    graphics.strokeStyle = 'white';
    drawAxis(graphics);

    graphics.beginPath();
    graphics.moveTo(0, 0);
    for (let i = 1; i <= 4; i++) {
        const r = 225 * 0.25 * i;
        graphics.arc(0, 0, r, 0, 2 * Math.PI)
    }
    graphics.stroke();
}

const drawSectors = graphics => {

    const arc = 2 * Math.PI / 16;
    graphics.strokeStyle = 'none';
    for (let i = 0; i < 16; i++) {
        const color = colors[i % colors.length];
        graphics.moveTo(0, 0);
        graphics.beginPath();
        graphics.arc(0, 0, 225, i * arc, (i + 1) * arc);
        graphics.lineTo(0, 0);
        graphics.fillStyle = color + 'c';
        graphics.fill();
    }
}

export const SrsDisplay = ({ markers, ...rest }) => {
    return (<Fragment>
        <GraphicsLayer draw={drawSectorGrid} />
        {/* <MarkerLayer {...rest}>
            <FederationShipMarker position={{ r: 0, theta: 0 }} />
            {markers}
        </MarkerLayer> */}
        <SpriteLayer src='/images/icons8-star-trek-united-federation-ship-50.png'>
            <Sprite />
        </SpriteLayer>
    </Fragment>
    );
}

export const LrsDisplay = ({ markers, ...rest }) => {
    return (
        <Fragment>
            <GraphicsLayer draw={drawGalacticGrid} />
            <GraphicsLayer draw={drawSectors} />
            <MarkerLayer {...rest}>
                <FederationShipMarker position={{ r: 0, theta: 0 }} />
                {markers}
            </MarkerLayer>
        </Fragment>
    );
}