import { Vector } from 'coordinates'
import React, { Fragment, useState } from 'react'
import { ControlBox, FrameButton, FrameButtonBar, GameContext, NumberControl, ShipContext } from '.'
import { DisplayControl } from './controls'

export const TorpedoControl = props => {
    const shipCtx = React.useContext(ShipContext)

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Launch' /> </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Torpedos' value={shipCtx.ship.torpedos} />
                <DisplayControl title='Range' value={shipCtx.ship.target.r} />
                <DisplayControl title='Bearing' value={shipCtx.ship.target.theta} />
            </ControlBox>
        </Fragment>
    )
}