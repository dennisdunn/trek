import { Vector } from 'coordinates'
import React, { Fragment } from 'react'
import { ControlBox, DisplayControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { useShip, useWarp } from './store'

const move = ({ state, dispatch }, heading) => {
    const position = Vector.Polar.sum(state.position, heading)
    dispatch({ action: 'setPosition', payload: position })
}

export const WarpControl = props => {
    const shipCtx = useShip()
    const { state: warp } = useWarp()

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