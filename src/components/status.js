import React from 'react'
import { AnnunciatorControl, ControlBox, DisplayControl } from './controls'
import { useStatus } from './store'

export const Status = props => {
    const status = useStatus()

    return (
        <div style={{ fontSize: '1.4rem', marginLeft: '1rem', display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'space-between', marginTop: '1rem' }}>
            <DisplayControl title='Star Date' value={status.starDate} precision={1} />
            <DisplayControl title='Mission Date' value={status.endDate} precision={1} />
            <AnnunciatorControl title='Tactical' value={status.alert} />
        </div>
    )
}