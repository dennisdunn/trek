import React, { createContext, useContext, useReducer } from 'react';
import { Init } from 'trek-engine';
import * as Reducers from './reducers';

const list2obj = ([state, dispatch]) => ({ state, dispatch })

export const Context = createContext()

export const useGame = () => useContext(Context).game
export const useShip = () => useContext(Context).ship
export const useComms = () => useContext(Context).comms
export const useDamage = () => useContext(Context).damage
export const useStatus = () => useContext(Context).status
export const useSensor = () => useContext(Context).sensor
export const useWarp = () => useContext(Context).warp
export const useShield = () => useContext(Context).shields
export const useTorpedo = () => useContext(Context).torpedos
export const usePhaser = () => useContext(Context).phasers

export const StoreProvider = ({ children }) => {
    const store = {
        game: list2obj(useReducer(Reducers.game, Init.game())),
        ship: list2obj(useReducer(Reducers.ship, Init.ship())),
        comms: list2obj(useReducer(Reducers.comms, Init.comms())),
        damage: list2obj(useReducer(Reducers.damage, Init.damage())),
        status: list2obj(useReducer(Reducers.status, Init.status())),
        sensor: list2obj(useReducer(Reducers.sensor, Init.sensors())),
        warp: list2obj(useReducer(Reducers.warp, Init.warp())),
        shields: list2obj(useReducer(Reducers.shield, Init.shields())),
        torpedos: list2obj(useReducer(Reducers.torpedo, Init.torpedos())),
        phasers: list2obj(useReducer(Reducers.phaser, Init.phasers()))
    }

    return (
        <Context.Provider value={store} >
            {children}
        </Context.Provider >
    )
}