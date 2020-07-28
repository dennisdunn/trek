import React, { Fragment, useContext } from 'react'
import { ControlBox, FrameButton, FrameButtonBar } from '.'
import { TorpedosContext } from './context'
import { DisplayControl } from './controls'

export const TorpedoControl = props => {
    const [torpedos, _] = useContext(TorpedosContext)

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