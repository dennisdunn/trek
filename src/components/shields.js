import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { useShield } from './store'


export const ShieldControl = props => {
    const { state: shields, dispatch } = useShield()

    return (
        <Fragment>
            <ControlBox>
                <RangeControl min={0} max={500} value={shields.energy} onInput={e => dispatch({ type: 'store-energy', payload: Number.parseFloat(e.target.value) })} />
                <DisplayControl title='Shield Engergy' value={shields.energy} />
            </ControlBox>
        </Fragment>
    )
}