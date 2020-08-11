import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { useShields, useWarp, useDispatch } from './store'


export const ShieldControl = props => {
    const shields = useShields()
    const warp = useWarp()
    const dispatch = useDispatch()

    const handleInput = e => {
        const value = Number.parseFloat(e.target.value)
        if (value <= warp.energy) {
            const available = warp.energy + shields.energy - value
            dispatch('warp', { type: 'store-energy', payload: available })
            dispatch('shields', { type: 'store-energy', payload: value })
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