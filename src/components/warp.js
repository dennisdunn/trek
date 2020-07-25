import { Vector } from 'coordinates'
import React, { useState, Fragment } from 'react'
import { GameContext, ControlBox, Frame, FrameButton, FrameButtonBar, FrameTitle, NumberControl } from '.'

const move = (context, warp, heading) => {
    const delta = { r: warp, theta: heading }
    const position = Vector.Polar.sum(context.ship.position, delta)
    context.setShip({ ...context.ship, position })
}

export const WarpControl = props => {
    const [heading, setHeading] = useState(0)
    const [warp, setWarp] = useState(0)

    return (
        <GameContext.Consumer>
            {gameCtx => {
                return (
                    <Fragment>
                        <FrameButtonBar>
                            <FrameButton className='lcars-dodger-blue-bg' text='Engage' onClick={() => move(gameCtx, warp, heading)} />
                        </FrameButtonBar>
                        <ControlBox>
                            <NumberControl title='Warp Factor' onChange={setWarp} min={0} step={0.2} defaultValue={warp} />
                            <NumberControl title='Heading' onChange={setHeading} min={0} step={0.2} defaultValue={heading} />
                        </ControlBox>
                    </Fragment>
                )
            }}
        </GameContext.Consumer>
    )
}