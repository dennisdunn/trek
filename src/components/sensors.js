import React, { Fragment, useEffect } from 'react'
import { getSectorContaining } from 'trek-engine'
import { e2heading, spritePropsFactory } from '../services'
import { CelPanel } from './cel'
import { FrameButton, FrameButtonBar, FrameSubtitle } from './frame'
import { LongRangeScanner, ShortRangeScanner } from './scanners'
import { Sprite } from './sprite'
import { useComms, useGame, useSensor, useShip, useStatus, useTorpedo, useWarp } from './store'

export const Sensors = props => {
    const sensors = useSensor()
    const game = useGame()
    const ship = useShip()
    const warp = useWarp()
    const torpedo = useTorpedo()
    const status = useStatus()
    const comms = useComms()

    useEffect(() => {
        const sector = getSectorContaining(sensors.sectors, ship)
        sensors.dispatch({ type: 'store-sector', payload: sector })
    }, [ship.position])

    useEffect(() => {
        const enemies = sensors.srs.filter(o => o.type === 'enemy').length
        if (enemies > 0) {
            comms.dispatch({ type: 'log-message', payload: 'CHEKOV: Enemy wessels detected.' })
            status.dispatch({ type: 'set-alert', payload: 'red' })
        } else {
            status.dispatch({ type: 'set-alert', payload: 'green' })
        }
    }, [sensors.srs])

    return (
        <Fragment>
            <FrameSubtitle text={sensors.sector.name} />
            <FrameButtonBar>
                <FrameButton onClick={() => sensors.dispatch({ type: 'srs-scan', payload: { game, ship, sensors } })} className='lcars-hopbush-bg' text='Short Range Scan' />
                <FrameButton onClick={() => sensors.dispatch({ type: 'lrs-scan', payload: { game, ship } })} className='lcars-hopbush-bg' text='Long Range Scan' />
            </FrameButtonBar>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <CelPanel height={450} width={450} >
                    {sensors.selected === 'srs'
                        ? <ShortRangeScanner>
                            {spritePropsFactory.srs(sensors, ship).map(p => <Sprite {...p} onclick={target => torpedo.dispatch({ type: 'get-target', payload: { ship: ship.position, target } })} />)}
                        </ShortRangeScanner>
                        : <LongRangeScanner onclick={e => warp.dispatch({ type: 'new-heading', payload: e2heading(e, ship.position) })} >
                            {spritePropsFactory.lrs(sensors, ship).map(p => <Sprite {...p} />)}
                        </LongRangeScanner>
                    }
                </CelPanel>
            </div>
        </Fragment >
    )
}