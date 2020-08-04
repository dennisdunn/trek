import { longRangeScan, shortRangeScan } from "trek-engine"

export const sensor = (state, action) => {
    switch (action.type) {
        case 'store-sector':
            return { ...state, sector: action.payload }
        case 'srs-scan': {
            const { game, ship } = action.payload
            const objs = shortRangeScan(game.state, ship, state.sectors)
            return { ...state, srs: objs, selected: 'srs' }
        }
        case 'lrs-scan': {
            const { game, ship } = action.payload
            const objs = longRangeScan(game.state, ship, 0.3)
            const data = new Set(state.lrs.concat(objs))
            return { ...state, lrs: Array.from(data.values()), selected: 'lrs' }
        }
        default:
            return state
    }
}