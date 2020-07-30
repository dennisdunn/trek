import React, { Fragment } from 'react'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'
import { usePhaser, useSensor } from './store'

export const PhaserControl = props => {
    const sensor = useSensor()
    const phasers = usePhaser()

    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Fire' disabled={sensor.selected !== 'srs'} />
            </FrameButtonBar>
            <ControlBox>
                <RangeControl min={0} max={500} value={phasers.energy} onInput={e => phasers.dispatch({ type: 'store-energy', payload: Number.parseFloat(e.target.value) })} />
                <DisplayControl title='Phaser Engergy' value={phasers.energy} />
            </ControlBox>
        </Fragment>
    )
}