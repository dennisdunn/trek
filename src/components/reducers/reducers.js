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

export const status = (state, action) => {
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
    console.log(action)
    switch (action.type) {
        case 'new-target':
            return { ...state, target: action.payload }
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

