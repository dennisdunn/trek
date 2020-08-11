import React, { Fragment } from 'react'
import { ControlBox, DisplayControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { useTorpedo, useSensor } from './store'

export const TorpedoControl = props => {
    const sensor = useSensor()
    const torpedo = useTorpedo()

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Launch' disabled={sensor.state.selected !== 'srs'} />
            </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Inventory' value={torpedo.state.inventory} />
                <DisplayControl title='Range' value={torpedo.state.target.r} precision={3} />
                <DisplayControl title='Bearing' value={torpedo.state.target.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}