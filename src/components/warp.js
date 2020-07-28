import { Vector } from 'coordinates'
import React, { Fragment, useContext } from 'react'
import { ControlBox, FrameButton, FrameButtonBar } from '.'
import { ShipContext, WarpContext } from './context'
import { DisplayControl } from './controls'

const move = ([ship, setShip], heading) => {
    const position = Vector.Polar.sum(ship.position, heading)
    setShip(prev => ({ ...prev, position }))
}

export const WarpControl = props => {
    const shipCtx = useContext(ShipContext)
    const [warp, _] = useContext(WarpContext)
    console.log('warp')
    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-dodger-blue-bg' text='Engage' onClick={() => move(shipCtx, warp.heading)} />
            </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Energy' value={warp.energy} />
                <DisplayControl title='Warp Factor' value={warp.heading.r} precision={3} />
                <DisplayControl title='Heading' value={warp.heading.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}