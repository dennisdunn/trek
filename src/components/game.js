import React, { Fragment, useEffect } from 'react'
import { getSectorContaining, shortRangeScan } from '../services'
import { useDispatch, useGame, useSensors, useShip } from './store'

export const Game = ({ children }) => {
    const ship = useShip()
    const game = useGame()
    const sensors = useSensors()
    const dispatch = useDispatch()

    useEffect(() => {
        const sector = getSectorContaining(sensors.sectors, ship)
        dispatch('sensors', { type: 'store-sector', payload: sector })
    }, [ship.position])

    useEffect(() => {
        const objs = shortRangeScan(game, ship, sensors.sectors)
        if (objs.filter(o => o.type === 'base').length > 0) {
            dispatch('comms', { type: 'log-message', payload: 'UHURU: Starbase reports refitting complete.' })
            dispatch('damage', { type: 'repair-all' })
            dispatch('torpedos', { type: 'set-inventory', payload: 10 })
            dispatch('warp', { type: 'store-energy', payload: 3000 })
        }
    }, [sensors.sector])

    useEffect(() => {
        const objs = shortRangeScan(game, ship, sensors.sectors)
        if (objs.filter(o => o.type === 'enemy').length > 0) {
            dispatch('comms', { type: 'log-message', payload: 'CHEKOV: Enemy wessels detected.' })
            dispatch('status', { type: 'set-alert', payload: 'red' })
        }
    }, [sensors.sector])

    useEffect(() => {
        const objs = shortRangeScan(game, ship, sensors.sectors)
        if (objs.filter(o => o.type === 'enemy').length === 0) {
            dispatch('status', { type: 'set-alert', payload: 'green' })
        }
    }, [sensors.srs])

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}