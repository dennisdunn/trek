import React from 'react'
import { AnnunciatorControl, ControlBox, DisplayControl } from './controls'
import { useStatus } from './store'

export const Status = props => {
    const status = useStatus()

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '50%' }}>
            <ControlBox>
                <DisplayControl title='Star Date' value={status.starDate} precision={1} />
                <DisplayControl title='Mission Date' value={status.endDate} precision={1} />
            </ControlBox>
            <ControlBox>
                <AnnunciatorControl title='Tactical' value={status.alert} />
            </ControlBox>
        </div>
    )
}