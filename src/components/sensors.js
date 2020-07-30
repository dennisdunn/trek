import React, { Fragment, useEffect, useState } from 'react'
import { Convert, getSectorContaining, longRangeScan, shortRangeScan, Vector } from 'trek-engine'
import { Cel, CelPanel, colors, FrameButton, FrameButtonBar, Sprite, Spritesheet } from '.'
import { useGame, useSensor, useShip, useTorpedo, useWarp } from './store'
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
            const r = ctx.canvas.width / 2 * Math.sqrt(i / 4)
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
            friendly: { index: 0, scale: 0.6, zIndex: 2010 },
            enemy: { index: 1, scale: 0.4, zIndex: 2009 },
            base: { index: 2, scale: 0.4, zIndex: 2008 },
            star: { index: 3, scale: 0.2, zIndex: 2007 }
        }
        let key = 0
        return objs.map(o => <Sprite {...sprite[o.type]}
            position={o.position}
            {...mk.absoluteTitle(o.position)}
            key={key++} />)
    },
    SrsMarkers: (localOrigin, objs = []) => {
        const sprite = {
            friendly: { index: 0, scale: 0.7, zIndex: 2010 },
            enemy: { index: 1, scale: 0.5, zIndex: 2009 },
            base: { index: 2, scale: 0.5, zIndex: 2008 },
            star: { index: 3, scale: 0.3, zIndex: 2007 }
        }

        let key = 0
        const scale = 1 / Math.max(...objs.map(o => o.position.r))
        return objs.map(o => <Sprite {...sprite[o.type]}
            position={Vector.Polar.diff(localOrigin, o.position)}
            {...mk.relativeTitle(o.position)}
            key={key++} />)
    }
}

const scan = {
    srs: (sensors, game, ship) => {
        const results = shortRangeScan(game.state, ship, sensors.sectors)
        sensors.dispatch({ type: 'store-srs', payload: results })
        sensors.dispatch({ type: 'new-scan', payload: 'srs' })
    },
    lrs: (sensors, game, ship) => {
        const results = longRangeScan(game.state, ship, sensors.sectors, 0.2)
        sensors.dispatch({ type: 'append-lrs', payload: results })
        sensors.dispatch({ type: 'new-scan', payload: 'lrs' })
    }
}

const evt = {
    lrsClick: (e, ship, dispatch) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        let point = { x: e.clientX - bounds.left, y: e.clientY - bounds.top }
        point = Convert.canvas2polar(point, bounds)
        point = Vector.Polar.diff(point, ship.position,)
        dispatch({ type: 'new-heading', payload: point })
    },
    srsClick: (e, ship, dispatch) => {
        const bounds = e.currentTarget.getBoundingClientRect()
        let point = { x: e.clientX - bounds.left, y: e.clientY - bounds.top }
        point = Convert.canvas2polar(point, bounds)
        point = Vector.Polar.diff(point, ship.position,)
        dispatch({ type: 'new-target', payload: point })
    }
}

export const Sensors = props => {
    const sensors = useSensor()
    const game = useGame()
    const ship = useShip()
    const warp = useWarp()
    const torpedo = useTorpedo()

    useEffect(() => {
        const sector = getSectorContaining(sensors.sectors, ship)
        sensors.dispatch({ type: 'store-sector', payload: sector })
    }, [ship.position])

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton onClick={() => scan.srs(sensors, game, ship)} className='lcars-hopbush-bg' text='Short Range Scan' />
                <FrameButton onClick={() => scan.lrs(sensors, game, ship)} className='lcars-hopbush-bg' text='Long Range Scan' />
            </FrameButtonBar>
            <CelPanel height={450} width={450} >
                {sensors.selected === 'srs'
                    ? <ShortRangeScanner items={sensors.srs} onClick={e => evt.srsClick(e, ship, torpedo.dispatch)} />
                    : <LongRangeScanner items={sensors.lrs} position={ship.position} onClick={e => evt.lrsClick(e, ship, warp.dispatch)} />}
            </CelPanel>
            <div style={{ position: 'absolute', top: '90%', right: '1rem', fontSize: '1.5rem' }}>{sensors.sector.name}</div>
        </Fragment>
    )
}

export const ShortRangeScanner = ({ items, onClick = () => { } }) => {
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        setMarkers(mk.SrsMarkers({ r: 0, theta: 0 }, items))
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

export const LongRangeScanner = ({ items, position, onClick = () => { } }) => {
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        setMarkers(mk.LrsMarkers(items))
    }, [items])

    return (
        <Fragment>
            <Cel draw={draw.Sectors} polar />
            <Cel draw={draw.GalacticGrid} polar onClick={onClick} />
            <Spritesheet src='/assets/spritesheet.png' size={50}>
                <Sprite index={0} scale={0.6} position={position} zIndex={2010} />
                {markers}
            </Spritesheet>
        </Fragment>
    );
}
