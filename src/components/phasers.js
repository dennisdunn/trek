import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { usePhaser, useSensor, useWarp } from './store'

export const PhaserControl = props => {
    const sensor = useSensor()
    const phasers = usePhaser()
    const warp = useWarp()

    const handleInput = e => {
        const value = Number.parseFloat(e.target.value)
        if (value <= warp.energy) {
            const available = warp.energy + phasers.energy - value
            warp.dispatch({ type: 'store-energy', payload: available })
            phasers.dispatch({ type: 'store-energy', payload: value })
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