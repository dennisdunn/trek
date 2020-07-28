import React, { useState, createContext } from 'react';
import { Init } from 'trek-engine';


export const GameContext = createContext()
export const ShipContext = createContext()
export const CommsContext = createContext()
export const DamageContext = createContext()
export const StatusContext = createContext()
export const SensorContext = createContext()
export const WarpContext = createContext()
export const ShieldsContext = createContext()
export const TorpedosContext = createContext()
export const PhasersContext = createContext()



export const Context = ({ children }) => {

    return (
        <GameContext.Provider value={useState(Init.game())}>
            <ShipContext.Provider value={useState(Init.ship())}>
                <CommsContext.Provider value={useState(Init.comms())}>
                    <DamageContext.Provider value={useState(Init.damage())}>
                        <StatusContext.Provider value={useState(Init.status())}>
                            <SensorContext.Provider value={useState(Init.sensors())}>
                                <WarpContext.Provider value={useState(Init.warp())}>
                                    <ShieldsContext.Provider value={useState(Init.shields())}>
                                        <TorpedosContext.Provider value={useState(Init.torpedos())}>
                                            <PhasersContext.Provider value={useState(Init.phasers())}>
                                                {children}
                                            </PhasersContext.Provider>
                                        </TorpedosContext.Provider>
                                    </ShieldsContext.Provider>
                                </WarpContext.Provider>
                            </SensorContext.Provider>
                        </StatusContext.Provider>
                    </DamageContext.Provider>
                </CommsContext.Provider>
            </ShipContext.Provider>
        </GameContext.Provider>
    )
}