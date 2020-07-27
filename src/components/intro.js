import React, { useEffect } from 'react'
import { ShipContext } from '.'

const defaultDialog = [
    "SPOCK: Captain on deck.",
    "SCOTT: The warp core has breached!",
    "MCCOY: Spock, you green-blooded, pointy-eared...",
    "SPOCK: Doctor McCoy, I raise my eybrows at you.",
    "SCOTT: Is'a no one listening? The warp core is'a not doing well!",
    "MCCOY: Damn it, Scotty! I'm a doctor, not an engineer!"
]

export const Introduction = ({ dialog = defaultDialog }) => {
    const shipCtx = React.useContext(ShipContext)

    const logMessage = msg => {
        const comms = shipCtx.ship.comms
        comms.push(msg)
        shipCtx.setShip(prev => ({ ...prev, comms }))
    }

    useEffect(() => {
        dialog.forEach((item, idx) => {
            setTimeout(() => logMessage(item), idx * 2000)
        })
    }, [])

    return null;
}