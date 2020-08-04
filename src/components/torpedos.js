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
                <FrameButton className='lcars-tamarillo-bg' text='Launch' disabled={sensor.selected !== 'srs'} />
            </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Inventory' value={torpedo.inventory} />
                <DisplayControl title='Range' value={torpedo.target.r} precision={3} />
                <DisplayControl title='Bearing' value={torpedo.target.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}