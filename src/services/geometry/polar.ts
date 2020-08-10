import { IBoundingArc, IBoundingCircle, IPolar } from '../interfaces';
import { between } from '../util';
import Vector from '../vector';

export const contains = (bounds: IBoundingArc, point: IPolar): boolean => {
    return between(bounds.inner.r, point.r, bounds.outer.r)
        && between(bounds.inner.theta, point.theta, bounds.outer.theta)
}

export const within = (bounds: IBoundingCircle, point: IPolar): boolean => {
    return distance(bounds.center, point) < bounds.radius;
}

export const distance = (a: IPolar, b: IPolar): number => {
    return Vector.Polar.magnitude(Vector.Polar.diff(a, b));
}
