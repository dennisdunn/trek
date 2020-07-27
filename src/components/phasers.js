import React, { Fragment, useState } from 'react'
import { ControlBox, DisplayControl, RangeControl, ShipContext } from '.'
import { FrameButton, FrameButtonBar } from './frame'

export const PhaserControl = props => {
    const shipCtx = React.useContext(ShipContext)
    const [value, setValue] = useState(shipCtx.ship.phaser)

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Fire' />
            </FrameButtonBar>
            <ControlBox>
                <RangeControl min={0} max={500} value={value} onInput={e => setValue(Number.parseFloat(e.target.value))} />
                <DisplayControl title='Phaser Engergy' value={value} />
            </ControlBox>
        </Fragment>
    )
}