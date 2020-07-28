import React, { Fragment, useContext } from 'react'
import { PhasersContext } from './context'
import { ControlBox, DisplayControl, RangeControl } from './controls'
import { FrameButton, FrameButtonBar } from './frame'

export const PhaserControl = props => {
    const [phasers, setPhasers] = useContext(PhasersContext)
    console.log('phaser')
    return (
        <Fragment>
            <FrameButtonBar>
                <FrameButton className='lcars-tamarillo-bg' text='Fire' />
            </FrameButtonBar>
            <ControlBox>
                <RangeControl min={0} max={500} value={phasers.energy} onInput={e => setPhasers(prev => ({ ...prev, energy: Number.parseFloat(e.target.value) }))} />
                <DisplayControl title='Phaser Engergy' value={phasers.energy} />
            </ControlBox>
        </Fragment>
    )
}