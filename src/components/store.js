import React, { createContext, useContext, useReducer } from "react";
import Init from "../services/initialization";
import * as Reducers from "../services/reducers/reducers";
import { sensor } from "../services/reducers/sensors";
import { status } from "../services/reducers/status";

export const Context = createContext();

const useGameState = (key) => useContext(Context)[key][0];

export const useGame = () => useGameState("game");
export const useShip = () => useGameState("ship");
export const useComms = () => useGameState("comms");
export const useDamage = () => useGameState("damage");
export const useStatus = () => useGameState("status");
export const useSensors = () => useGameState("sensors");
export const useWarp = () => useGameState("warp");
export const useShields = () => useGameState("shields");
export const useTorpedos = () => useGameState("torpedos");
export const usePhasers = () => useGameState("phasers");

export const useDispatch = () => {
  const ctx = useContext(Context);
  return ({ sys, type, payload }) => ctx[sys][1]({ type, payload });
};

export const StoreProvider = ({ children }) => {
  const store = {
    game: useReducer(Reducers.game, Init.game()),
    ship: useReducer(Reducers.ship, Init.ship()),
    comms: useReducer(Reducers.comms, Init.comms()),
    damage: useReducer(Reducers.damage, Init.damage()),
    status: useReducer(status, Init.status()),
    sensors: useReducer(sensor, Init.sensors()),
    warp: useReducer(Reducers.warp, Init.warp()),
    shields: useReducer(Reducers.shield, Init.shields()),
    torpedos: useReducer(Reducers.torpedo, Init.torpedos()),
    phasers: useReducer(Reducers.phaser, Init.phasers()),
  };

  store.sensors[0].lrs = store.game[0].filter((item) => item.type == "base");

  return <Context.Provider value={store}>{children}</Context.Provider>;
};
