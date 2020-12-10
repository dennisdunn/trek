import React from 'react'

const format = (value, precision) => typeof (value) === 'number' ? value.toFixed(precision) : value

export const ControlBox = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
            {children}
        </div>
    )
}

export const NumberControl = ({ title, onChange = () => { }, ...rest }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <p>{title}</p>
            <input type='number' onChange={e => onChange(Number.parseFloat(e.target.value))} {...rest} />
        </div>
    )
}

export const RangeControl = ({ title, onChange = () => { }, ...rest }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <input orient='vertical' type='range' onChange={e => onChange(Number.parseFloat(e.target.value))} {...rest} />
        </div>
    )
}

export const DisplayControl = ({ title, value, precision = 0, ...rest }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <p style={{ margin: 0 }}>{title}</p>
            <p style={{ margin: 0 }}>&nbsp;&nbsp;</p>
            <p style={{ margin: 0 }}>{format(value, precision)}</p>
        </div>
    )
}

export const AnnunciatorControl = ({ title, value, ...rest }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <p style={{ margin: 0 }}>{title}</p>
            <p style={{ margin: 0 }}>&nbsp;&nbsp;</p>
            <p style={{ margin: 0, backgroundColor: value, height: '1.5rem', width: '4rem', border: 'none', borderRadius: '16px 16px 16px 16px' }} />
        </div>
    )
}