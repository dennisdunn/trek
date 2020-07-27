import React, { Fragment, useState } from 'react'
import { ControlBox, ShipContext } from '.'
import { DisplayControl, RangeControl } from './controls'

export const ShieldControl = props => {
    const shipCtx = React.useContext(ShipContext)
    const [value, setValue] = useState(shipCtx.ship.shields)

    return (
        <Fragment>
            <ControlBox>
                <RangeControl min={0} max={500} value={value} onInput={e => setValue(Number.parseFloat(e.target.value))} />
                <DisplayControl title='Shield Engergy' value={value} />
            </ControlBox>
        </Fragment>
    )
}