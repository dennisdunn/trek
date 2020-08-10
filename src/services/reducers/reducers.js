import Vector from '../vector'

export const game = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const ship = (state, action) => {
    switch (action.type) {
        case 'new-position':
            return { ...state, position: action.payload }
        default:
            return state
    }
}

export const comms = (state, action) => {
    switch (action.type) {
        case 'set':
            return { log: action.payload }
        case 'log-message':
            return { log: [...state.log, action.payload] }
        default:
            return state
    }
}

export const damage = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

export const warp = (state, action) => {
    switch (action.type) {
        case 'new-heading':
            return { ...state, heading: action.payload }
        case 'store-energy':
            return { ...state, energy: action.payload }
        default:
            return state
    }
}

export const shield = (state, action) => {
    switch (action.type) {
        case 'store-energy':
            return { ...state, energy: action.payload }
        default:
            return state
    }
}

export const torpedo = (state, action) => {

    switch (action.type) {
        case 'new-target':
            return { ...state, target: action.payload }
        case 'get-target':
            return { ...state, target: Vector.Polar.diff(action.payload.ship, action.payload.target) }
        default:
            return state
    }
}

export const phaser = (state, action) => {
    switch (action.type) {
        case 'store-energy':
            return { ...state, energy: action.payload }
        default:
            return state
    }
}
