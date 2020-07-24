import React, { useState } from 'react'
import { Context, Frame, FrameButton, FrameButtonBar, FrameTitle, ControlBox, NumberControl } from '.'
import { Vector } from 'coordinates'

const move = (context, warp, heading, onMove) => {
    const delta = { r: warp, theta: heading }
    const position = Vector.Polar.sum(context.ship.position, delta)
    context.setShip({ ...context.ship, position })
    if (onMove) onMove()
}

export const WarpControl = ({ onMove }) => {
    const [heading, setHeading] = useState(0)
    const [warp, setWarp] = useState(0)

    return (
        <Context.Consumer>
            {context => {
                return (
                    <Frame className='warp lcars-atomic-tangerine-border' type='left'>
                        <FrameTitle title='Warp Drive' />
                        <FrameButtonBar>
                            <FrameButton className='lcars-dodger-blue-bg' text='Engage' onClick={() => move(context, warp, heading, onMove)} />
                        </FrameButtonBar>
                        <ControlBox>
                            <NumberControl title='Warp Factor' onChange={setWarp} min={0} step={0.2} defaultValue={warp} />
                            <NumberControl title='Heading' onChange={setHeading} min={0} step={0.2} defaultValue={heading} />
                        </ControlBox>
                    </Frame>
                )
            }}
        </Context.Consumer>
    )
}