import React from 'react'

export const ControlBox = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {children}
        </div>
    )
}

export const NumberControl = ({ title, onChange, ...rest }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <p>{title}</p>
            <input type='number' onChange={e => onChange(Number.parseFloat(e.target.value))} {...rest} />
        </div>
    )
}