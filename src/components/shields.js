import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { useShield, useWarp } from './store'


export const ShieldControl = props => {
    const shields = useShield()
    const warp = useWarp()

    const handleInput = e => {
        const value = Number.parseFloat(e.target.value)
        if (value <= warp.state.energy) {
            const available = warp.state.energy + shields.state.energy - value
            warp.dispatch({ type: 'store-energy', payload: available })
            shields.dispatch({ type: 'store-energy', payload: value })
        }
    }

    return (
        <Fragment>
            <ControlBox>
                <RangeControl min={0} max={500} value={shields.state.energy} onInput={handleInput} />
                <DisplayControl title='Energy' value={shields.state.energy} />
            </ControlBox>
        </Fragment>
    )
}