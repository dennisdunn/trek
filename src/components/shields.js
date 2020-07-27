import React, { Fragment } from 'react'
import { ControlBox, ShipContext } from '.'
import { DisplayControl, RangeControl } from './controls'

export const ShieldControl = props => {
    const shipCtx = React.useContext(ShipContext)

    return (
        <Fragment>
            <ControlBox>
                <RangeControl />
                <DisplayControl title='Shield Engergy' value={shipCtx.ship.shields} />
            </ControlBox>
        </Fragment>
    )
}