import { Vector, between } from 'trek-engine'

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

        const translate = sector2translation(sensors.sector)
        const getHandler = position => e => Vector.Polar.diff(position, ship.position)

        return [{ ...props.srs['friendly'], ...ship, position: translate(ship.position) }].concat(sensors.srs.map(o => ({ ...props.srs[o.type], ...o, position: translate(o.position), onclick: getHandler(o.position) })))
    },
    lrs: (sensors, ship) => {
        return [{ ...props.lrs['friendly'], ...ship }].concat(sensors.lrs.map(o => ({ ...props.lrs[o.type], ...o })))
    }
}

export const sector2translation = sector => {
    const center = centerOfSector(sector)
    const rotatedCenter = rotate(center, center)

    return point => {
        let p = { ...point }
        p = rotate(center, p)
        p = translate(rotatedCenter, p)
        p = scale(depthOfSector(sector), p)
        return p
    }
}

export const centerOfSector = ({ inner, outer }) => ({ r: (outer.r - inner.r) / 2 + inner.r, theta: (outer.theta - inner.theta) / 2 + inner.theta })

export const depthOfSector = ({ inner, outer }) => outer.r - inner.r

export const getQuadrantIdx = ({ theta }) => between(0, theta, Math.PI / 2) ? 0
    : between(Math.PI / 2, theta, Math.PI) ? 1
        : between(Math.PI, theta, 3 / 2 * Math.PI) ? 2
            : between(3 / 2 * Math.PI, theta, 2 * Math.PI) ? 3
                : -1

export const getQuadrantNum = (point) => getQuadrantIdx(point) + 1

export const rotate = (center, point) => (
    {
        ...point,
        theta: point.theta + 5 / 2 * Math.PI - center.theta - 2 * Math.PI
    }
)

export const translate = (center, point) => Vector.Polar.diff(point, center)

export const scale = (depth, point) => (
    {
        ...point,
        r: point.r * 2 / depth
    }
)