import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl, ShipContext } from '.'
import { FrameButton, FrameButtonBar } from './frame'

export const PhaserControl = props => {
    const shipCtx = React.useContext(ShipContext)

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Fire' />
            </FrameButtonBar>
            <ControlBox>
                <RangeControl />
                <DisplayControl title='Phaser Engergy' value={shipCtx.ship.phaser} />
            </ControlBox>
        </Fragment>
    )
}