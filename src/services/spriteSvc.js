import { Vector } from 'trek-engine'
import { sensor } from '../components/reducers/sensors'

// const addBearing = sprites => sprites.map(s => ({ ...s, data: Vector.Polar.diff(s.position, ship.position), onClick: e => console.log(e.target) }))//torpedo.dispatch({ type: 'new-target', payload: e.target.bearing }) }))


// const mk = {
//     titleAsBearing: position => {
//         return { title: `Range: ${position?.r?.toFixed(3) || "[...]"}\nBearing: ${position?.theta?.toFixed(3) || "[...]"}` }
//     },
//     titleAsPosition: position => {
//         return { title: `ρ: ${position?.r?.toFixed(3) || "[...]"}\nθ: ${position?.theta?.toFixed(3) || "[...]"}` }
//     }
// }

const props = {
    srs: {
        friendly: { index: 0, scale: 0.7, zIndex: 2400 },
        enemy: { index: 1, scale: 0.5, zIndex: 2300 },
        base: { index: 2, scale: 0.5, zIndex: 2200 },
        star: { index: 3, scale: 0.3, zIndex: 2100 }
    },
    lrs: {
        friendly: { index: 0, scale: 0.6, zIndex: 2400 },
        enemy: { index: 1, scale: 0.4, zIndex: 2300 },
        base: { index: 2, scale: 0.4, zIndex: 2200 },
        star: { index: 3, scale: 0.2, zIndex: 2100 }
    }
}

export const spritePropsFactory = {
    srs: (sensors, ship) => {
        const center = {
            r: sensors.sector.outer.r - sensors.sector.inner.r,
            theta: sensors.sector.outer.theta - sensors.sector.inner.theta
        }
        const getPosition = position => Vector.Polar.scale(Vector.Polar.diff(position, center), 1.7)
        const getHandler = position => e => Vector.Polar.diff(position, ship.position)

        return [{ ...props.srs['friendly'], ...ship, position: getPosition(ship.position) }].concat(sensors.srs.map(o => ({ ...props.srs[o.type], ...o, position: getPosition(o.position), onclick: getHandler(o.position) })))
    },
    lrs: (sensors, ship) => {
        return [{ ...props.lrs['friendly'], ...ship }].concat(sensors.lrs.map(o => ({ ...props.lrs[o.type], ...o })))
    }
}