import React, { Fragment } from 'react'
import { getSectorContaining } from '../services'
import Vector from '../services/vector'
import { ControlBox, DisplayControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { useSensor, useShip, useWarp } from './store'

export const WarpControl = props => {
    const sensor = useSensor()
    const ship = useShip()
    const warp = useWarp()

    const engageClicked = () => {
        const position = Vector.Polar.sum(ship.position, warp.heading)
        const sector = getSectorContaining(sensor.sectors, { ...ship.state, position })
        ship.dispatch({ type: 'new-position', payload: position })
        sensor.dispatch({ type: 'store-sector', payload: sector })
    }

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-dodger-blue-bg' text='Engage' onClick={engageClicked} disabled={sensor.selected === 'srs'} />
            </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Energy' value={warp.energy} />
                <DisplayControl title='Warp Factor' value={warp.heading.r} precision={3} />
                <DisplayControl title='Heading' value={warp.heading.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}