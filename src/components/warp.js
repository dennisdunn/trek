import { Vector } from 'coordinates'
import React, { Fragment } from 'react'
import { ControlBox, DisplayControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { useShip, useWarp, useSensor } from './store'
import { getSectorContaining } from 'trek-engine'

export const WarpControl = props => {
    const ship = useShip()
    const sensor = useSensor()
    const { state: warp } = useWarp()

    const engageClicked = () => {
        const position = Vector.Polar.sum(ship.state.position, warp.heading)
        const sector = getSectorContaining(sensor.state.sectors, { ...ship.state, position })
        ship.dispatch({ type: 'new-position', payload: position })
        sensor.dispatch({ type: 'store-sector', payload: sector })
    }

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-dodger-blue-bg' text='Engage' onClick={engageClicked} />
            </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Energy' value={warp.energy} />
                <DisplayControl title='Warp Factor' value={warp.heading.r} precision={3} />
                <DisplayControl title='Heading' value={warp.heading.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}