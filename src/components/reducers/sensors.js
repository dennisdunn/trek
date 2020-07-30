import { shortRangeScan, longRangeScan } from "trek-engine"

const spriteProps = {
    srs: {
        friendly: { index: 0, scale: 0.7, zIndex: 2010 },
        enemy: { index: 1, scale: 0.5, zIndex: 2009 },
        base: { index: 2, scale: 0.5, zIndex: 2008 },
        star: { index: 3, scale: 0.3, zIndex: 2007 }
    },
    lrs: {
        friendly: { index: 0, scale: 0.6, zIndex: 2010 },
        enemy: { index: 1, scale: 0.4, zIndex: 2009 },
        base: { index: 2, scale: 0.4, zIndex: 2008 },
        star: { index: 3, scale: 0.2, zIndex: 2007 }
    }
}


export const sensor = (state, action) => {
    switch (action.type) {
        case 'new-scan':
            return { ...state, selected: action.payload }
        case 'store-srs':
            return { ...state, srs: action.payload }
        case 'append-lrs':
            const data = new Set(state.lrs.concat(action.payload))
            return { ...state, lrs: Array.from(data.values()) }
        case 'store-sector':
            return { ...state, sector: action.payload }
        case 'srs-scan': {
            const { game, sensors, ship } = action.payload
            const objs = shortRangeScan(game.state, ship, sensors.sectors)
            const sprites = objs.map(o => ({ position: o.position, ...spriteProps.srs[o.type] }))
            return { ...state, srs: sprites, selected: 'srs' }
        }
        case 'lrs-scan': {
            const { game, sensors, ship } = action.payload
            const objs = longRangeScan(game.state, ship, 0.2)
            const sprites = objs.map(o => ({ position: o.position, ...spriteProps.lrs[o.type] }))
            const data = new Set(state.lrs.concat(sprites))
            return { ...state, lrs: Array.from(data.values()), selected: 'lrs' }
        }
        default:
            return state
    }
}