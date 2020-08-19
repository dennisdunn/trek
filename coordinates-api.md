# Coordinates

A simple library for manipulating rectangular, polar, and canvas coordinates.

## Coordinates

Rectangular coordinates are objects with x and y properties: {x:0, y:0} denoting
a point on the Cartesian plane.

Polar coordinates are objects with r (radius) and theta (angle) properties: {r:0, theta:0} describing
points on the polar plane.

Canvas coordinates are similar to cartesian coordinates except x and y are constrainted to positive values and describe a position on an HTML5 or svg canvas where the origin is the upper-left corner of the canvas.

Angels are measured in radians, 1 radian = 57.2958 degrees.

## API

### Conversion Functions

```
Convert.deg2rad(degree: number)=> number
Convert.rad2deg(radian: number) => number
Convert.rect2polar(point: IRect) => IPolar
Covert.polar2rect(point: IPolar) => IRect
Covert.canvas2polar(point: IRect, bounds: IBounds) => IPolar
Covert.polar2canvas (point: IPolar, bounds: IBounds) => IRect
```

### Vector Math

```
Vector.Rect.sum(a: IRect, b: IRect) => IRect
Vector.Rect.diff(a: IRect, b: IRect) => IRect
Vector.Rect.negate(a: IRect) => IRect
Vector.Rect.magnitude(a: IRect) => number
Vector.Rect.scale(a: IRect, scalar: number) => IRect
Vector.Rect.scaleXY(a: IRect, scale: IRect) => IRect
Vector.Rect.dot(a: IRect, b: IRect) => number
```

```
Vector.Polar.sum(a: IPolar, b: IPolar) => IPolar
Vector.Polar.diff(a: IPolar, b: IPolar) => IPolar
Vector.Polar.negate(a: IPolar) => IPolar
Vector.Polar.magnitude(a: IPolar) => number
Vector.Polar.scale(a: IPolar, scalar: number) => IPolar
Vector.Polar.dot(a: IPolar, b: IPolar) => number
```

### Geometry Functions

```
Geometry.Polar.contains(bounds: IBoundingArc, point: IPolar) => boolean
Geometry.Polar.within (bounds: IBoundingCircle, point: IPolar) => boolean
Geometry.Polar.distance(a: IPolar, b: IPolar) => number
```

```
Geometry.Rect.contains(bounds: IBoundingBox, point: IRect) => boolean
Geometry.Rect.distance(a: IRect, b: IRect) => number
```
