import React, { Fragment } from 'react'
import { ControlBox, DisplayControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { useTorpedo } from './store'

export const TorpedoControl = props => {
    const torpedos = useTorpedo()

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Launch' /> </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Torpedos' value={torpedos.inventory} />
                <DisplayControl title='Range' value={torpedos.target.r} precision={3} />
                <DisplayControl title='Bearing' value={torpedos.target.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}