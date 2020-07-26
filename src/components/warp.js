import { Vector } from 'coordinates'
import React, { Fragment, useState } from 'react'
import { ControlBox, FrameButton, FrameButtonBar, GameContext, NumberControl, ShipContext } from '.'
import { DisplayControl } from './controls'

const move = (shipCtx) => {
    const position = Vector.Polar.sum(shipCtx.ship.position, shipCtx.ship.heading)
    shipCtx.setShip(prev => ({ ...prev, position }))
}

export const WarpControl = props => {
    const shipCtx = React.useContext(ShipContext)

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-dodger-blue-bg' text='Engage' onClick={() => move(shipCtx)} />
            </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Energy' value={shipCtx.ship.energy} />
                <DisplayControl title='Warp Factor' value={shipCtx.ship.heading.r} />
                <DisplayControl title='Heading' value={shipCtx.ship.heading.theta} />
            </ControlBox>
        </Fragment>
    )
}