import Vector from './vector'

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

        return [{ ...props.srs.friendly, ...ship, position: translate(ship.position), data: ship.position }].concat(sensors.srs.map(o => ({ ...props.srs[o.type], ...o, position: translate(o.position), data: o.position })))
    },
    lrs: (sensors, ship) => {
        return [{ ...props.lrs.friendly, data: ship.position, ...ship }].concat(sensors.lrs.map(o => ({ ...props.lrs[o.type], ...o })))
    }
}

export const sector2translation = sector => {
    const center = centerOfSector(sector)
    const rotatedCenter = rotate(center, center)
    // functional pipes are looking pretty good right about now
    return point => scale(depthOfSector(sector), translate(rotatedCenter, rotate(center, { ...point })))
}


export const centerOfSector = ({ inner, outer }) => ({ r: (outer.r - inner.r) / 2 + inner.r, theta: (outer.theta - inner.theta) / 2 + inner.theta })

export const depthOfSector = ({ inner, outer }) => outer.r - inner.r

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