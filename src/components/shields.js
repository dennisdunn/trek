import React, { Fragment, useContext } from 'react'
import { ControlBox } from '.'
import { DisplayControl, RangeControl } from './controls'
import { ShieldsContext } from './context'

export const ShieldControl = props => {
    const [shields, setShields] = useContext(ShieldsContext)

    return (
        <Fragment>
            <ControlBox>
                <RangeControl min={0} max={500} value={shields.energy} onInput={e => setShields(prev => ({ ...prev, energy: Number.parseFloat(e.target.value) }))} />
                <DisplayControl title='Shield Engergy' value={shields.energy} />
            </ControlBox>
        </Fragment>
    )
}