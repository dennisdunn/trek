import React, { Fragment } from 'react';
import { Cel, colors, Sprite, Spritesheet } from '.';

const drawAxis = ctx => {
    const halfW = ctx.canvas.width / 2;
    const halfH = ctx.canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, halfH);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -halfH);
    ctx.moveTo(0, 0);
    ctx.lineTo(halfW, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(-halfW, 0);

    ctx.stroke();
}

const drawGalacticGrid = ctx => {
    ctx.strokeStyle = 'white';
    drawAxis(ctx);

    ctx.beginPath();
    for (let i = 1; i <= 4; i++) {
        const r = 225 * Math.sqrt(i / 4)
        ctx.arc(0, 0, r, 0, 2 * Math.PI)
    }
    ctx.stroke();
}

const drawSectorGrid = ctx => {
    // ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.strokeStyle = 'white';
    drawAxis(ctx);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let i = 1; i <= 4; i++) {
        const r = 225 * 0.25 * i;
        ctx.arc(0, 0, r, 0, 2 * Math.PI)
    }
    ctx.stroke();
}

const drawSectors = ctx => {

    const arc = 2 * Math.PI / 16;
    ctx.strokeStyle = 'none';
    for (let i = 0; i < 16; i++) {
        const color = colors[i % colors.length];
        ctx.moveTo(0, 0);
        ctx.beginPath();
        ctx.arc(0, 0, 225, i * arc, (i + 1) * arc);
        ctx.lineTo(0, 0);
        ctx.fillStyle = color + 'c';
        ctx.fill();
    }
}

export const SrsDisplay = ({ markers }) => {
    return (
        <Fragment>
            <Cel draw={drawSectorGrid} polar />
            {/* <SpriteLayer src='/images/icons8-star-trek-united-federation-ship-50.png' size={50}>
                <Sprite scale={0.7} />
            </SpriteLayer> */}
            <Spritesheet src='/assets/spritesheet.png' size={50}>
                <Sprite scale={0.7} />
                <Sprite index={1} scale={0.5} position={{ r: 1, theta: Math.PI }} />
                <Sprite index={1} scale={0.5} position={{ r: .7, theta: Math.PI / 2 }} />
                <Sprite index={1} scale={0.5} position={{ r: .7, theta: Math.PI / 3 }} />
            </Spritesheet>
        </Fragment>
    );
}

export const LrsDisplay = ({ markers }) => {
    return (
        <Fragment>
            <Cel draw={drawSectors} polar />
            {/* <Layer>
                <Graphics draw={drawGalacticGrid} reset />
                <Graphics draw={drawSectors} />
            </Layer>
            <MarkerLayer >
                <FederationShipMarker position={{ r: 0, theta: 0 }} />
                {markers}
            </MarkerLayer> */}
        </Fragment>
    );
}