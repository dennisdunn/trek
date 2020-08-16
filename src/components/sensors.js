import React, { Fragment, useEffect } from 'react'
import { e2heading, getSectorContaining, spritePropsFactory } from '../services'
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

    useEffect(() => {
        const sector = getSectorContaining(sensors.sectors, ship)
        dispatch('sensors', { type: 'store-sector', payload: sector })
    }, [ship.position])

    useEffect(() => {
        const enemies = sensors.srs.filter(o => o.type === 'enemy').length
        if (enemies > 0) {
            dispatch('comms', { type: 'log-message', payload: 'CHEKOV: Enemy wessels detected.' })
            dispatch('status', { type: 'set-alert', payload: 'red' })
        } else {
            dispatch('status', { type: 'set-alert', payload: 'green' })
        }
    }, [sensors.srs])

    return (
        <Fragment>
            <FrameSubtitle text={sensors.sector.name} />
            <FrameButtonBar>
                <FrameButton onClick={() => dispatch('sensors', { type: 'srs-scan', payload: { game, ship, sensors } })} className='lcars-hopbush-bg' text='Short Range Scan' />
                <FrameButton onClick={() => dispatch('sensors', { type: 'lrs-scan', payload: { game, ship } })} className='lcars-hopbush-bg' text='Long Range Scan' />
            </FrameButtonBar>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CelPanel height={450} width={450} >
                    {sensors.selected === 'srs'
                        ? <ShortRangeScanner>
                            {spritePropsFactory.srs(sensors, ship).map(p => <Sprite {...p} onclick={target => dispatch('torpedos', { type: 'set-target', payload: target })} />)}
                        </ShortRangeScanner>
                        : <LongRangeScanner onclick={e => dispatch('warp', { type: 'new-heading', payload: e2heading(e, ship.position) })} >
                            {spritePropsFactory.lrs(sensors, ship).map(p => <Sprite {...p} />)}
                        </LongRangeScanner>
                    }
                </CelPanel>
            </div>
        </Fragment >
    )
}