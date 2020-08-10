import { createSectors, getSectorByName, getSectorContaining, QUADRANT_NAMES, REGION_NAMES } from '../services/cartography';
import { ISector } from '../services/interfaces';

const sectors: ISector[] = createSectors(REGION_NAMES, QUADRANT_NAMES);

describe('region names', () => {
    it('Aldebaran I', () => {
        const r = getSectorByName(sectors, 'Aldebaran I')
        expect(r).not.toBeUndefined();
        if (r) {
            expect(r.name).toBe('Aldebaran I');
            expect(r.inner.r).toBeCloseTo(0);
            expect(r.inner.theta).toBeCloseTo(0);
        }
    })
    it('Vega IV', () => {
        const r = getSectorByName(sectors, 'Vega IV');
        expect(r).not.toBeUndefined();
        if (r) {
            expect(r.name).toBe('Vega IV');
            expect(r.outer.r).toBeCloseTo(1);
            expect(r.outer.theta).toBeCloseTo(2 * Math.PI)
        }
    })
})

describe('sector map', () => {
    it('find by name', () => {
        const r = getSectorByName(sectors, 'Aldebaran I');
        expect(r.name).toBe('Aldebaran I');
    });
    it('find by unknown name', () => {
        expect(() => getSectorByName(sectors, 'Aldebaran LX')).toThrow();
    });
    it('find by content', () => {
        const r = getSectorContaining(sectors, { type: 'friendly', position: { r: 0, theta: 0 } })
        expect(r.name).toBe('Aldebaran I');
    })
    it('finds Vega III', () => {
        const r = getSectorContaining(sectors, { type: 'friendly', position: { r: 0.8066712280169888, theta: 6.063263702984299 } })
        expect(r.name).toBe('Vega III');
    })
})
