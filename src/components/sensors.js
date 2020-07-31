import React, { Fragment, useEffect } from 'react'
import { getSectorContaining } from 'trek-engine'
import { e2heading, spritePropsFactory } from '../services'
import { CelPanel } from './cel'
import { FrameButton, FrameButtonBar, FrameSubtitle } from './frame'
import { LongRangeScanner, ShortRangeScanner } from './scanners'
import { useGame, useSensor, useShip, useTorpedo, useWarp } from './store'
import { Sprite } from './sprite'

export const Sensors = props => {
    const sensors = useSensor()
    const game = useGame()
    const ship = useShip()
    const warp = useWarp()
    const torpedo = useTorpedo()

    useEffect(() => {
        const sector = getSectorContaining(sensors.sectors, ship)
        sensors.dispatch({ type: 'store-sector', payload: sector })
    }, [ship.position])

    return (
        <Fragment>
            <FrameSubtitle text={sensors.sector.name} />
            <FrameButtonBar>
                <FrameButton onClick={() => sensors.dispatch({ type: 'srs-scan', payload: { game, ship, sensors } })} className='lcars-hopbush-bg' text='Short Range Scan' />
                <FrameButton onClick={() => sensors.dispatch({ type: 'lrs-scan', payload: { game, ship } })} className='lcars-hopbush-bg' text='Long Range Scan' />
            </FrameButtonBar>
            <CelPanel height={450} width={450} >
                {sensors.selected === 'srs'
                    ? <ShortRangeScanner  >
                        {spritePropsFactory.srs(sensors, ship).map(p => <Sprite {...p} onclick={e => torpedo.dispatch({ type: 'new-target', payload: p.onclick() })} />)}
                    </ShortRangeScanner>
                    : <LongRangeScanner onclick={e => warp.dispatch({ type: 'new-heading', payload: e2heading(e, ship.position) })} >
                        {spritePropsFactory.lrs(sensors, ship).map(p => <Sprite {...p} />)}
                    </LongRangeScanner>
                }
            </CelPanel>
        </Fragment >
    )
}