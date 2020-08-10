import * as Convert from "../convert";
import { IPolar } from "../interfaces";
import * as Rect from './rect';

export const sum = (a: IPolar, b: IPolar): IPolar => {
    const c = Convert.polar2rect(a);
    const d = Convert.polar2rect(b);
    return Convert.rect2polar(Rect.sum(c, d));
}

export const diff = (a: IPolar, b: IPolar): IPolar => {
    const c = Convert.polar2rect(a);
    const d = Convert.polar2rect(b);
    return Convert.rect2polar(Rect.diff(c, d));
}

export const negation = (a: IPolar): IPolar => {
    throw new Error('not implemented');
}

export const magnitude = (a: IPolar): number => {
    return a.r;
}

export const scale = (a: IPolar, scalar: number): IPolar => {
    return { ...a, r: a.r * scalar };
}

// dot product
export const dot = (a: IPolar, b: IPolar): number => {
    const c = Convert.polar2rect(a);
    const d = Convert.polar2rect(b);
    return Rect.dot(c, d);
}