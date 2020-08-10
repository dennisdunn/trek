import Init from '../services/initialization';
import { longRangeScan, shortRangeScan } from '../services/ship';

const game = Init.game();
const player = Init.ship();
const sectors = Init.sectors();

describe('ship scans', () => {
    it('short range scan', () => {
        const objs = shortRangeScan(game, player, sectors);

        expect(objs.length).toBeGreaterThan(0);
        expect(objs.length).toBeLessThan(game.length);
    });
    it('long range scan', () => {
        const objs = longRangeScan(game, player, 0.2);
        expect(objs.length).toBeGreaterThan(0);
        expect(objs.length).toBeLessThan(game.length);
    });
});
