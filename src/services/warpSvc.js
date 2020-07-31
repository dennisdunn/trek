import { Convert, Vector } from 'trek-engine'

export const e2position = e => {
    const bounds = e.currentTarget.getBoundingClientRect()
    let point = { x: e.clientX - bounds.left, y: e.clientY - bounds.top }
    return Convert.canvas2polar(point, bounds)
}

export const e2heading = (e, position) => {
    return Vector.Polar.diff(e2position(e), position)
}