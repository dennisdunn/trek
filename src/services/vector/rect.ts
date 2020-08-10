import { IRect } from "../interfaces";

export const sum = (a: IRect, b: IRect): IRect => {
    return {
        x: a.x + b.x,
        y: a.y + b.y
    }
}

export const diff = (a: IRect, b: IRect): IRect => {
    return sum(a, negate(b))
}

export const negate = (a: IRect): IRect => {
    return {
        x: -1 * a.x,
        y: -1 * a.y
    }
}

export const magnitude = (a: IRect): number => {
    return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2))
}

export const scale = (a: IRect, scalar: number): IRect => {
    return {
        x: a.x * scalar,
        y: a.y * scalar
    }
}

export const scaleXY = (a: IRect, b: IRect): IRect => {
    return {
        x: a.x * b.x,
        y: a.y * b.y
    }
}

// dot product
export const dot = (a: IRect, b: IRect): number => {
    return a.x * b.x + a.y * b.y;
}
