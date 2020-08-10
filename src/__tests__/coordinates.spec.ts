import * as Convert from '../services/convert';
import Vector from '../services/vector';
import { IRect } from '../services/interfaces';

const polar_pole = { r: 0, theta: 0 }
const polar_I = { r: 1, theta: Math.PI / 4 };
const polar_II = { r: 1, theta: Math.PI * 3 / 4 };
const polar_III = { r: 1, theta: Math.PI * 5 / 4 };
const polar_IV = { r: 1, theta: Math.PI * 7 / 4 };

const rect_I = { x: 0.70711, y: 0.70711 };
const rect_II = { x: -0.70711, y: 0.70711 };
const rect_III = { x: -0.70711, y: -0.70711 };
const rect_IV = { x: 0.70711, y: -0.70711 };

const canvas_bounds = { height: 200, width: 200 }
const canvas_Center = { x: 100, y: 100 }
const canvas_I = { x: 200, y: 0 }
const canvas_II = { x: 0, y: 0 }
const canvas_III = { x: 0, y: 200 }
const canvas_IV = { x: 200, y: 200 }

const pointsRclose = (a: IRect, b: IRect) => {
  expect(a.x).toBeCloseTo(b.x, 12)
  expect(a.y).toBeCloseTo(b.y, 12)
}

describe('convert coordinates', () => {
  it('polar -> rect QI', () => {
    const a = Convert.polar2rect(polar_I);
    expect(a.x).toBeCloseTo(rect_I.x, 5);
    expect(a.y).toBeCloseTo(rect_I.y, 5);
  });
  it('rect -> polar QI', () => {
    const a = Convert.rect2polar(rect_I);
    expect(a.r).toBeCloseTo(polar_I.r, 5);
    expect(a.theta).toBeCloseTo(polar_I.theta, 5);
  });

  it('polar -> rect QII', () => {
    const a = Convert.polar2rect(polar_II);
    expect(a.x).toBeCloseTo(rect_II.x, 5);
    expect(a.y).toBeCloseTo(rect_II.y, 5);
  });
  it('rect -> polar QII', () => {
    const a = Convert.rect2polar(rect_II);
    expect(a.r).toBeCloseTo(polar_II.r, 5);
    expect(a.theta).toBeCloseTo(polar_II.theta, 5);
  });

  it('polar -> rect QIII', () => {
    const a = Convert.polar2rect(polar_III);
    expect(a.x).toBeCloseTo(rect_III.x, 5);
    expect(a.y).toBeCloseTo(rect_III.y, 5);
  });
  it('rect -> polar QIII', () => {
    const a = Convert.rect2polar(rect_III);
    expect(a.r).toBeCloseTo(polar_III.r, 5);
    expect(a.theta).toBeCloseTo(polar_III.theta, 5);
  });

  it('polar -> rect QIV', () => {
    const a = Convert.polar2rect(polar_IV);
    expect(a.x).toBeCloseTo(rect_IV.x, 5);
    expect(a.y).toBeCloseTo(rect_IV.y, 5);
  });
  it('rect -> polar QIV', () => {
    const a = Convert.rect2polar(rect_IV);
    expect(a.r).toBeCloseTo(polar_IV.r, 5);
    expect(a.theta).toBeCloseTo(polar_IV.theta, 5);
  });
})

describe('translation', () => {
  it('translates from QI to QII', () => {
    const a = Vector.Polar.sum(polar_I, { r: Math.SQRT2, theta: Math.PI });
    expect(a.r).toBeCloseTo(polar_II.r, 5);
    expect(a.theta).toBeCloseTo(polar_II.theta, 5);
  })
})

describe('polar', () => {
  it('scale', () => {
    const a = Vector.Polar.scale({ r: 2, theta: Math.PI }, 2);
    expect(a.r).toBe(4);
  })
})

describe('canvas conversions', () => {
  it('canvas center -> pole', () => {
    const a = Convert.canvas2polar(canvas_Center, canvas_bounds)
    expect(a).toEqual({ r: 0, theta: -0 }) // although 0 === -0, .toEqual() treats them differently
  })

  it('canvas I -> polar I', () => {
    const a = Convert.canvas2polar(canvas_I, canvas_bounds)
    expect(a).toEqual({ r: Math.SQRT2, theta: Math.PI * 1 / 4 })
  })

  it('canvas II -> polar II', () => {
    const a = Convert.canvas2polar(canvas_II, canvas_bounds)
    expect(a).toEqual({ r: Math.SQRT2, theta: Math.PI * 3 / 4 })
  })

  it('canvas III -> polar III', () => {
    const a = Convert.canvas2polar(canvas_III, canvas_bounds)
    expect(a).toEqual({ r: Math.SQRT2, theta: Math.PI * 5 / 4 })
  })

  it('canvas IV -> polar IV', () => {
    const a = Convert.canvas2polar(canvas_IV, canvas_bounds)
    expect(a).toEqual({ r: Math.SQRT2, theta: Math.PI * 7 / 4 })
  })

  it('pole -> canvas center', () => {
    const a = Convert.polar2canvas(polar_pole, canvas_bounds)
    expect(a).toEqual(canvas_Center)
  })

  it('polar I -> canvas I', () => {
    const a = Convert.polar2canvas(Vector.Polar.scale(polar_I, Math.SQRT2), canvas_bounds)
    pointsRclose(a, canvas_I)
  })

  it('polar II -> canvas II', () => {
    const a = Convert.polar2canvas(Vector.Polar.scale(polar_II, Math.SQRT2), canvas_bounds)
    pointsRclose(a, canvas_II)
  })

  it('polar III -> canvas III', () => {
    const a = Convert.polar2canvas(Vector.Polar.scale(polar_III, Math.SQRT2), canvas_bounds)
    pointsRclose(a, canvas_III)
  })

  it('polar IV -> canvas IV', () => {
    const a = Convert.polar2canvas(Vector.Polar.scale(polar_IV, Math.SQRT2), canvas_bounds)
    pointsRclose(a, canvas_IV)
  })
})
