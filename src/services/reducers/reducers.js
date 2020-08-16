import Vector from '../vector'
import { clamp } from '../util'

export const game = (state, action) => {
    switch (action.type) {
        case 'remove-item':
            state.splice(state.indexOf(action.payload), 1)
            return [...state];
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
        case 'set-target':
            return { ...state, target: action.payload }
        case 'dec-inventory':
            return { ...state, inventory: state.inventory > 0 ? state.inventory - 1 : state.inventory }
        case 'set-inventory':
            return { ...state, inventory: action.payload }
        case 'clear-target':
            return { ...state, target: { r: 0, theta: 0 } }
        default:
            return state
    }
}

export const phaser = (state, action) => {
    switch (action.type) {
        case 'store-energy':
            return { ...state, energy: action.payload }
        case 'deplete-energy':
            return { ...state, energy: clamp(0, state.energy - action.payload, state.energy) }
        default:
            return state
    }
}

