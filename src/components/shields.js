import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { useShields, useWarp, useDispatch } from './store'


export const ShieldControl = props => {
    const shields = useShields()
    const warp = useWarp()
    const dispatch = useDispatch()

    const handleInput = e => {
        const value = Number.parseFloat(e.target.value)
        let available = warp.energy + shields.energy
        if (value <= available) {
            available -= value
            dispatch({ sys: 'warp', type: 'store-energy', payload: available })
            dispatch({ sys: 'shields', type: 'store-energy', payload: value })
        }
    }

    return (
        <Fragment>
            <ControlBox>
                <RangeControl min={0} max={100} value={shields.energy} onInput={handleInput} />
                <DisplayControl title='Level' value={shields.energy} suffix='%' />
            </ControlBox>
        </Fragment>
    )
}