import React, { Fragment, useEffect, useState } from 'react'
import { longRangeScan, shortRangeScan } from 'trek-engine'
import { Cel, CelPanel, colors, FrameButton, FrameButtonBar, Sprite, Spritesheet } from '.'
import { useGame, useSensor, useShip } from './store'

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
            friendly: { index: 0, scale: 0.7 },
            enemy: { index: 1, scale: 0.5 },
            base: { index: 2, scale: 0.7 },
            star: { index: 3, scale: 0.4 }
        }
        let key = 0
        return objs.map(o => <Sprite {...sprite[o.type]}
            position={o.position}
            {...mk.absoluteTitle(o.position)}
            key={key++} />)
    },
    SrsMarkers: (objs = []) => {
        const sprite = {
            friendly: { index: 0, scale: 0.7 },
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
    srs: ({ state: sensors, dispatch }, game, ship) => {
        const [sector, srs] = shortRangeScan(game, ship, sensors.sectors)
        dispatch({ type: 'store-sector', payload: sector })
        dispatch({ type: 'store-srs', payload: srs })
        dispatch({ type: 'new-scan', payload: 'srs' })
    },
    lrs: ({ dispatch }, game, ship) => {
        const lrs = longRangeScan(game, ship, 0.2).concat([ship])
        dispatch({ type: 'store-lrs', payload: lrs })
        dispatch({ type: 'new-scan', payload: 'lrs' })
    }
}

// const evt = {
//     lrsClick: (e, shipCtx) => {
//         const bounds = e.currentTarget.getBoundingClientRect()
//         let point = { x: e.clientX - bounds.left, y: e.clientY - bounds.top }
//         point = Convert.canvas2polar(point, bounds)
//         point = Vector.Polar.diff(point, shipCtx.ship.position,)
//         shipCtx.setShip(prev => { return { ...prev, heading: point } })
//     }
// }

export const Sensors = props => {

    const ctx = useSensor()
    const { state: game } = useGame()
    const { state: ship } = useShip()

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton onClick={() => scan.srs(ctx, game, ship)} className='lcars-hopbush-bg' text='Short Range Scan' />
                <FrameButton onClick={() => scan.lrs(ctx, game, ship)} className='lcars-hopbush-bg' text='Long Range Scan' />
            </FrameButtonBar>
            <CelPanel height={450} width={450} >
                {ctx.state.selected === 'srs'
                    ? <ShortRangeScanner items={ctx.state.srs} />
                    : <LongRangeScanner items={ctx.state.lrs} />}
            </CelPanel>
            <div style={{ position: 'absolute', top: '90%', right: 0, fontSize: '1.5rem' }}>{ctx.state.sector.name}</div>

        </Fragment>
    )
}

export const ShortRangeScanner = ({ items, onClick = () => { } }) => {
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        setMarkers(mk.SrsMarkers(items))
    }, [items])

    return (
        <Fragment>
            <Cel draw={draw.SectorGrid} polar onClick={onClick} />
            <Spritesheet src='/assets/spritesheet.png' size={50}>
                <Sprite index={0} scale={0.7} />
                {markers}
            </Spritesheet>
        </Fragment>
    );
}

export const LongRangeScanner = ({ items, onClick = () => { } }) => {
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        setMarkers(mk.LrsMarkers(items))
    }, [items])

    return (
        <Fragment>
            <Cel draw={draw.Sectors} polar />
            <Cel draw={draw.GalacticGrid} polar onClick={onClick} />
            <Spritesheet src='/assets/spritesheet.png' size={50}>
                {markers}
            </Spritesheet>
        </Fragment>
    );
}
