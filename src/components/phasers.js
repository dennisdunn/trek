import React, { Fragment } from 'react'
import Vector from '../services/vector'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { useDispatch, usePhasers, useSensors, useShip, useWarp } from './store'

const SHIELD_EFFICIENCY = 0.15
const SCALE_FACTOR = 10e-2

export const PhaserControl = props => {
    const sensor = useSensors()
    const phasers = usePhasers()
    const warp = useWarp()
    const ship = useShip()
    const dispatch = useDispatch()

    const onclick = e => {
        const targets = sensor.srs.filter(o => o.type === 'enemy')
        targets.forEach(target => {
            let hit = phasers.energy / Vector.Polar.distance(target.position, ship.position) * SCALE_FACTOR
            dispatch({ sys: 'comms', type: 'log-message', payload: `SPOCK: ${hit.toFixed(2)} unit hit on target vessel.` })
            dispatch({ sys: 'phasers', type: 'deplete-energy', payload: hit })
            if (hit > SHIELD_EFFICIENCY * target.shields) {
                target.shields -= hit
            }
            if (target.shields <= 0) {
                dispatch({ sys: 'game', type: 'remove-item', payload: target })
                dispatch({ sys: 'sensors', type: 'remove-item', payload: target })
                dispatch({ sys: 'comms', type: 'log-message', payload: 'CHEKOV: Enemy wessel destroyed.' })
            } else {
                dispatch({ sys: 'comms', type: 'log-message', payload: `SPOCK: Target shields are at ${target.shields.toFixed(0)}.` })
            }
        })
    }

    const handleInput = e => {
        const value = Number.parseFloat(e.target.value)
        let available = warp.energy + phasers.energy
        if (value <= available) {
            available -= value
            dispatch({ sys: 'warp', type: 'store-energy', payload: available })
            dispatch({ sys: 'phasers', type: 'store-energy', payload: value })
        }
    }

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Fire' disabled={sensor.selected !== 'srs'} onClick={onclick} />
            </FrameButtonBar>
            <ControlBox>
                <RangeControl min={0} max={500} value={phasers.energy} onInput={handleInput} />
                <DisplayControl title='Energy' value={phasers.energy} />
            </ControlBox>
        </Fragment>
    )
}