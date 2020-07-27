import React, { Fragment } from 'react'
import { ControlBox, FrameButton, FrameButtonBar, ShipContext } from '.'
import { DisplayControl } from './controls'

export const TorpedoControl = props => {
    const shipCtx = React.useContext(ShipContext)

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Launch' /> </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Torpedos' value={shipCtx.ship.torpedos} />
                <DisplayControl title='Range' value={shipCtx.ship.target.r} precision={3} />
                <DisplayControl title='Bearing' value={shipCtx.ship.target.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}