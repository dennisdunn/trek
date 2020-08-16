import React, { Fragment, useEffect, useState } from 'react'
import Vector from '../services/vector'
import { ControlBox, DisplayControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { useDispatch, useSensors, useShip, useTorpedos } from './store'

export const TorpedoControl = props => {
    const dispatch = useDispatch()
    const torpedo = useTorpedos()
    const sensor = useSensors()
    const ship = useShip()
    const [bearing, setBearing] = useState({ r: 0, theta: 0 })

    useEffect(() => {
        if (torpedo.target.r === 0 && torpedo.target.theta === 0) {
            setBearing({ r: 0, theta: 0 })
        } else {
            setBearing(Vector.Polar.diff(ship.position, torpedo.target))
        }
    }, [torpedo.target, ship.position]);

    const onClick = e => {
        if (torpedo.inventory > 0) {
            const target = sensor.srs.find(o => torpedo.target.r === o.position.r && torpedo.target.theta === o.position.theta)
            dispatch('torpedos', { type: 'dec-inventory', payload: '' })
            dispatch('torpedos', { type: 'clear-target', payload: '' })
            switch (target.type) {
                case 'base':
                    dispatch('game', { type: 'remove-item', payload: target })
                    dispatch('sensors', { type: 'remove-item', payload: target })
                    dispatch('comms', { type: 'log-message', payload: 'CHEKOV: Direct hit on the starbase!' })
                    break;
                case 'enemy':
                    dispatch('game', { type: 'remove-item', payload: target })
                    dispatch('sensors', { type: 'remove-item', payload: target })
                    dispatch('comms', { type: 'log-message', payload: 'CHEKOV: Enemy wessel destroyed.' })
                    break;
                case 'star':
                    dispatch('comms', { type: 'log-message', payload: 'CHEKOV: The star absorbed the energy of the torpedo.' })
                    break;
            }
        } else {
            dispatch('comms', { type: 'log-message', payload: 'CHEKOV: We have no torpedos left!' })
        }
    }

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Launch' disabled={sensor.selected !== 'srs'} onClick={onClick} />
            </FrameButtonBar>
            <ControlBox>
                <DisplayControl title='Inventory' value={torpedo.inventory} />
                <DisplayControl title='Range' value={bearing.r} precision={3} />
                <DisplayControl title='Bearing' value={bearing.theta} precision={3} />
            </ControlBox>
        </Fragment>
    )
}