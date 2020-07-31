import React, { Fragment } from 'react'
import { Cel, colors, Spritesheet } from '.'

const grid = {
    lrs: ctx => {
        const arc = 2 * Math.PI / 16;
        ctx.strokeStyle = 'none';
        for (let i = 0; i < 16; i++) {
            const color = colors[i % 16];
            ctx.moveTo(0, 0);
            ctx.beginPath();
            ctx.arc(0, 0, ctx.canvas.width / 2, i * arc, (i + 1) * arc);
            ctx.lineTo(0, 0);
            ctx.fillStyle = color + 'c';
            ctx.fill();
        }
        ctx.strokeStyle = 'lightgray';
        for (let i = 1; i <= 4; i++) {
            const r = ctx.canvas.width / 2 * Math.sqrt(i / 4)
            ctx.beginPath();
            ctx.arc(0, 0, r, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.stroke();
        }
    }, srs: ctx => {
        ctx.strokeStyle = 'lightgray';
        for (let i = 1; i <= 4; i++) {
            ctx.beginPath()
            ctx.arc(0, 0, ctx.canvas.width * i * .125, 0, 2 * Math.PI)
            ctx.closePath()
            ctx.stroke()
        }
    }
}

const Scanner = ({ children, draw, onclick }) => {
    return (
        <Fragment>
            <Cel draw={draw} polar onClick={onclick} />
            <Spritesheet src='/assets/spritesheet.png' size={50}>
                {children}
            </Spritesheet>
        </Fragment>
    );
}

export const ShortRangeScanner = props => {
    return (
        <Scanner {...props} draw={grid.srs} />
    );
}

export const LongRangeScanner = props => {
    return (
        <Scanner {...props} draw={grid.lrs} />
    );
}