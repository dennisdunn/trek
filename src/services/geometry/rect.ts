import { IBoundingBox, IRect } from '../interfaces';
import { between } from '../util';
import Vector from '../vector';

export const contains = (bounds: IBoundingBox, point: IRect): boolean => {
    return between(bounds.lowerLeft.x, point.x, bounds.upperRight.x)
        && between(bounds.lowerLeft.y, point.y, bounds.upperRight.y)
}

export const distance = (a: IRect, b: IRect): number => {
    return Vector.Rect.magnitude(Vector.Rect.diff(a, b));
}
