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

export const DisplayControl = ({ title, value, ...rest }) => {
    return (
        <div style={{ fontSize: '1.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <p style={{ margin: 0 }}>{title}</p>
            <p style={{ margin: 0 }}>&nbsp;&nbsp;</p>
            <p style={{ margin: 0 }}>{value.toFixed(5)}</p>
        </div>
    )
}