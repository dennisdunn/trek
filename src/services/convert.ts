import { IBounds, IPolar, IRect } from './interfaces'
import Vector from './vector'

export const deg2rad = (degree: number): number => {
    return degree / 57.2958
}

export const rad2deg = (radian: number): number => {
    return radian * 57.2958
}

export const rect2polar = (point: IRect): IPolar => {
    return {
        r: Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)),
        theta: point.y >= 0
            ? Math.atan2(point.y, point.x)
            : Math.atan2(point.y, point.x) + 2 * Math.PI,
    }
}

export const polar2rect = (point: IPolar): IRect => {
    return {
        x: point.r * Math.cos(point.theta),
        y: point.r * Math.sin(point.theta),
    }
}

export const canvas2polar = (point: IRect, bounds: IBounds): IPolar => {
    // translate to the cartesian plane
    let p = Vector.Rect.diff(point, { x: bounds.width / 2, y: bounds.height / 2 })
    // scale to the unit square and flip around the x-axis
    p = Vector.Rect.scaleXY(p, { x: 1 / bounds.width * 2, y: 1 / bounds.height * -2 })
    // convert to polar
    return rect2polar(p)
}

export const polar2canvas = (point: IPolar, bounds: IBounds): IRect => {
    // convert to rect
    let p = polar2rect(point)
    // scale to the bounds
    p = Vector.Rect.scaleXY(p, { x: bounds.width / 2, y: bounds.height / -2 })
    // translate to the canvas coordinate space
    p = Vector.Rect.sum(p, { x: bounds.width / 2, y: bounds.height / 2 })
    return p
}
