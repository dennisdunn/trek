import React, { createContext, useContext, useReducer } from 'react';
import { Init } from 'trek-engine';
import * as Reducers from './reducers';

const list2obj = ([state, dispatch]) => ({ ...state, dispatch })
const list2objWstate = ([state, dispatch]) => ({ state, dispatch })

export const Context = createContext()

export const useGame = () => list2objWstate(useContext(Context).game)
export const useShip = () => list2obj(useContext(Context).ship)
export const useComms = () => list2obj(useContext(Context).comms)
export const useDamage = () => list2obj(useContext(Context).damage)
export const useStatus = () => list2obj(useContext(Context).status)
export const useSensor = () => list2obj(useContext(Context).sensor)
export const useWarp = () => list2obj(useContext(Context).warp)
export const useShield = () => list2obj(useContext(Context).shields)
export const useTorpedo = () => list2obj(useContext(Context).torpedos)
export const usePhaser = () => list2obj(useContext(Context).phasers)

export const StoreProvider = ({ children }) => {
    const store = {
        game: useReducer(Reducers.game, Init.game()),
        ship: useReducer(Reducers.ship, Init.ship()),
        comms: useReducer(Reducers.comms, Init.comms()),
        damage: useReducer(Reducers.damage, Init.damage()),
        status: useReducer(Reducers.status, Init.status()),
        sensor: useReducer(Reducers.sensor, Init.sensors()),
        warp: useReducer(Reducers.warp, Init.warp()),
        shields: useReducer(Reducers.shield, Init.shields()),
        torpedos: useReducer(Reducers.torpedo, Init.torpedos()),
        phasers: useReducer(Reducers.phaser, Init.phasers())
    }

    return (
        <Context.Provider value={store} >
            {children}
        </Context.Provider >
    )
}