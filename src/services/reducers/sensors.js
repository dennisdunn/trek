import { longRangeScan, shortRangeScan } from ".."

export const sensor = (state, action) => {
    switch (action.type) {
        case 'store-sector':
            return { ...state, sector: action.payload }
        case 'srs-scan': {
            const { game, ship } = action.payload
            const objs = shortRangeScan(game, ship, state.sectors)
            return { ...state, srs: objs, selected: 'srs' }
        }
        case 'lrs-scan': {
            const { game, ship } = action.payload
            const objs = longRangeScan(game, ship, 0.3)
            const data = new Set(state.lrs.concat(objs))
            return { ...state, lrs: Array.from(data.values()), selected: 'lrs' }
        }
        case 'remove-item':
            let { srs, lrs } = state
            srs.splice(srs.indexOf(action.payload), 1)
            lrs.splice(lrs.indexOf(action.payload), 1)
            return { ...state, srs, lrs }
        default:
            return state
    }
}