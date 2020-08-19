import React, { Fragment } from 'react'
import { spritePropsFactory } from '../services'
import { doChangeHeading, doLrsScan, doSrsScan, doTargetTorpedo } from '../services/actions'
import { CelPanel } from './cel'
import { FrameButton, FrameButtonBar, FrameSubtitle } from './frame'
import { LongRangeScanner, ShortRangeScanner } from './scanners'
import { Sprite } from './sprite'
import { useDispatch, useGame, useSensors, useShip } from './store'

export const Sensors = props => {
    const sensors = useSensors()
    const game = useGame()
    const ship = useShip()
    const dispatch = useDispatch()

    return (
        <Fragment>
            <FrameSubtitle text={sensors.sector.name} />
            <FrameButtonBar>
                <FrameButton onClick={() => dispatch(doSrsScan(game, ship, sensors))} className='lcars-hopbush-bg' text='Short Range Scan' />
                <FrameButton onClick={() => dispatch(doLrsScan(game, ship))} className='lcars-hopbush-bg' text='Long Range Scan' />
            </FrameButtonBar>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CelPanel height={450} width={450} >
                    {sensors.selected === 'srs'
                        ? <ShortRangeScanner>
                            {spritePropsFactory.srs(sensors, ship).map(p => <Sprite {...p} onclick={target => dispatch(doTargetTorpedo(target))} />)}
                        </ShortRangeScanner>
                        : <LongRangeScanner onclick={e => dispatch(doChangeHeading(e, ship.position))} >
                            {spritePropsFactory.lrs(sensors, ship).map(p => <Sprite {...p} />)}
                        </LongRangeScanner>
                    }
                </CelPanel>
            </div>
        </Fragment >
    )
}