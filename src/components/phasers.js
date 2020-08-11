import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { usePhasers, useSensors, useWarp, useDispatch } from './store'

export const PhaserControl = props => {
    const sensor = useSensors()
    const phasers = usePhasers()
    const warp = useWarp()
    const dispatch = useDispatch()

    const handleInput = e => {
        const value = Number.parseFloat(e.target.value)
        if (value <= warp.energy) {
            const available = warp.energy + phasers.energy - value
            dispatch('warp', { type: 'store-energy', payload: available })
            dispatch('phasers', { type: 'store-energy', payload: value })
        }
    }

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Fire' disabled={sensor.selected !== 'srs'} />
            </FrameButtonBar>
            <ControlBox>
                <RangeControl min={0} max={500} value={phasers.energy} onInput={handleInput} />
                <DisplayControl title='Energy' value={phasers.energy} />
            </ControlBox>
        </Fragment>
    )
}