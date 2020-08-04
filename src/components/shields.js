import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { useShield, useWarp } from './store'


export const ShieldControl = props => {
    const shields = useShield()
    const warp = useWarp()

    const handleInput = e => {
        const value = Number.parseFloat(e.target.value)
        if (value <= warp.energy) {
            const available = warp.energy + shields.energy - value
            warp.dispatch({ type: 'store-energy', payload: available })
            shields.dispatch({ type: 'store-energy', payload: value })
        }
    }

    return (
        <Fragment>
            <ControlBox>
                <RangeControl min={0} max={500} value={shields.energy} onInput={handleInput} />
                <DisplayControl title='Energy' value={shields.energy} />
            </ControlBox>
        </Fragment>
    )
}