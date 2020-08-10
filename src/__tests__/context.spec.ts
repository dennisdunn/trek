import { Geometry } from '../services/geometry';
import { getSectorByName } from '../services/cartography';
import Init from '../services/initialization';
import { IPositionable } from '../services/interfaces';

const game = Init.game();
const player = Init.ship();
const sectors = Init.sectors();

describe('initialize a new game', () => {
    it('game is created', () => {
        expect(game).not.toBeNull();
        expect(sectors).not.toBeNull();
    });
    it('player is created', () => {
        expect(player).not.toBeNull();
    })
})

describe('get game objects', () => {
    it('get objects by proximity', () => {
        const bounds = { center: player.position, radius: 0.2 };
        const objs = game.filter((obj: IPositionable) => Geometry.Polar.within(bounds, obj.position));
        expect(objs.length).toBeLessThan(game.length);

    })
    it('get objects by sector', () => {
        const bounds = getSectorByName(sectors, 'Deneb II');
        const objs = game.filter((obj: IPositionable) => Geometry.Polar.contains(bounds, obj.position));
        expect(objs.length).toBeLessThan(game.length);
    })
})