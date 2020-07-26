import React, { Fragment, useEffect, useState } from 'react';
import { longRangeScan, shortRangeScan } from 'trek-engine';
import { Cel, CelPanel, colors, FrameButton, FrameButtonBar, GameContext, ScannerContext, ShipContext, Sprite, Spritesheet } from '.';
import { Vector, Convert } from 'coordinates'

const draw = {
    Axis: ctx => {
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
    },
    GalacticGrid: ctx => {
        ctx.strokeStyle = 'lightgray';

        ctx.beginPath();
        for (let i = 1; i <= 4; i++) {
            const r = 225 * Math.sqrt(i / 4)
            ctx.arc(0, 0, r, 0, 2 * Math.PI)
        }
        ctx.stroke();
    },
    SectorGrid: ctx => {
        ctx.strokeStyle = 'white';
        draw.Axis(ctx);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let i = 1; i <= 4; i++) {
            const r = 225 * 0.25 * i;
            ctx.arc(0, 0, r, 0, 2 * Math.PI)
        }
        ctx.stroke();
    },
    Sectors: ctx => {
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
}

const mk = {
    relativeTitle: position => {
        return { title: `Range: ${position.r.toFixed(3)}\nBearing: ${position.theta.toFixed(3)}` }
    },
    absoluteTitle: position => {
        return { title: `ρ: ${position.r.toFixed(3)}\nθ: ${position.theta.toFixed(3)}` }
    },
    LrsMarkers: (objs = []) => {
        const sprite = {
            federation: { index: 0, scale: 0.5 },
            enemy: { index: 1, scale: 0.4 },
            base: { index: 2, scale: 0.4 },
            star: { index: 3, scale: 0.2 }
        }
        let key = 0
        return objs.map(o => <Sprite {...sprite[o.type]}
            position={o.position}
            {...mk.absoluteTitle(o.position)}
            key={key++} />)
    },
    SrsMarkers: (objs = []) => {
        const sprite = {
            federation: { index: 0, scale: 0.7 },
            enemy: { index: 1, scale: 0.5 },
            base: { index: 2, scale: 0.5 },
            star: { index: 3, scale: 0.4 }
        }

        let key = 0
        const scale = 1 / Math.max(...objs.map(o => o.position.r))
        return objs.map(o => <Sprite {...sprite[o.type]}
            position={{ ...o.position, r: scale * o.position.r }}
            {...mk.relativeTitle(o.position)}
            key={key++} />)
    }
}

const scan = {
    srs: (gameCtx, scannerCtx, shipCtx) => {
        const results = shortRangeScan(gameCtx.game, scannerCtx.sectors, shipCtx.ship)
        scannerCtx.setSectorName(results.sector.name)
        scannerCtx.setSrsScan(results.objs)
    },
    lrs: (gameCtx, scannerCtx, shipCtx) => {
        const results = longRangeScan(gameCtx.game, shipCtx.ship, 0.2)
        scannerCtx.setLrsScan(prev => {
            const items = new Set(prev)
            results.forEach(o => items.add(o))
            return items;
        })
    }
}

const evt = {
    lrsClick: (e, shipCtx) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        let point = { x: e.clientX - bounds.left, y: e.clientY - bounds.top }
        point = Convert.canvas2polar(point, bounds)
        point = Vector.Polar.diff(point, shipCtx.ship.position,)
        shipCtx.setShip(prev => { return { ...prev, heading: point } })
    }
}

export const Scanners = props => {
    const [current, setCurrent] = useState('srs');
    const gameCtx = React.useContext(GameContext)
    const scannerCtx = React.useContext(ScannerContext)
    const shipCtx = React.useContext(ShipContext)

    const onSelected = (scanner) => {
        setCurrent(scanner)
        scan[scanner](gameCtx, scannerCtx, shipCtx)
    }

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton onClick={() => onSelected('srs')} className='lcars-hopbush-bg' text='Short Range Scan' />
                <FrameButton onClick={() => onSelected('lrs')} className='lcars-hopbush-bg' text='Long Range Scan' />
            </FrameButtonBar>
            <CelPanel height={450} width={450} >
                {current === 'srs'
                    ? <ShortRangeScanner items={scannerCtx.srsScan} name={scannerCtx.sectorName} />
                    : <LongRangeScanner items={scannerCtx.lrsScan} position={shipCtx.ship.position} />}
            </CelPanel>
        </Fragment>
    )
}

export const ShortRangeScanner = ({ items, name }) => {
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        setMarkers(mk.SrsMarkers(items))
    }, [items])

    return (
        <Fragment>
            <Cel draw={draw.SectorGrid} polar />
            <Spritesheet src='/assets/spritesheet.png' size={50}>
                <Sprite index={0} scale={0.7} />
                {markers}
            </Spritesheet>
            <p style={{ position: 'absolute', top: '90%', right: 0, fontSize: '1.5rem' }}>{name}</p>
        </Fragment>
    );
}

export const LongRangeScanner = ({ items, position }) => {
    const [markers, setMarkers] = useState([])
    const shipCtx = React.useContext(ShipContext)

    useEffect(() => {
        setMarkers(mk.LrsMarkers(Array.from(items.values())))
    }, [items])

    return (
        <Fragment>
            <Cel draw={draw.Sectors} polar />
            <Cel draw={draw.GalacticGrid} polar onClick={e => evt.lrsClick(e, shipCtx)} />
            <Spritesheet src='/assets/spritesheet.png' size={50}>
                <Sprite index={0} scale={0.5} position={position} {...mk.absoluteTitle(position)} />
                {markers}
            </Spritesheet>
        </Fragment>
    );
}
