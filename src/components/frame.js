import React from 'react';

const styles = {
    title: {
        position: 'absolute',
        right: '1rem',
        zIndex: 1000,
        fontSize: '1.2rem'
    },
    subtitle: {
        position: 'absolute',
        top: '90%',
        right: '1rem',
        fontSize: '1.5rem'
    },
    frame: {
        border: '1rem solid gray',
        borderRadius: '2rem',
        position: 'relative'
    },
    justify: {
        center: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        },
        left: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start'
        }
    },
    top: {
        borderBottom: 'none',
        borderRight: 'none'
    },
    bottom: {
        borderTop: 'none',
        borderRight: 'none'
    },
    left: {
        borderRight: 'none'
    },
    right: {
        borderLeft: 'none'
    },
    bracket: {
        borderTop: 'none',
        borderBottom: 'none'
    },
    buttonBar: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
        left: 0,
        top: 25
    },
    button: {
        border: 'none',
        borderRadius: '0px 16px 16px 0px',
        marginBottom: '16px',
        height: '2rem',
        width: '5em',
        display: 'block',
        fontFamily: 'okuda',
        fontSize: '1rem',
        cursor: 'pointer',
        zIndex: 2000
    }
}

const getStyles = type => {
    return type ? { ...styles.frame, ...styles[type] } : { ...styles.frame, ...styles.left };
}

export const Frame = ({ type, children, justify = 'center', ...rest }) => {
    return (
        <div style={{ ...getStyles(type), ...styles.justify[justify] }} {...rest}>
            {children}
        </div>
    );
}

export const FrameTitle = ({ title: text, ...rest }) => {
    return (
        <div style={styles.title} {...rest}>{text}</div>
    )
}

export const FrameButtonBar = ({ children, ...rest }) => {
    return (
        <div style={styles.buttonBar} {...rest}>{children}</div>
    )
}

export const FrameButton = ({ onClick, text, ...rest }) => {
    return (
        <button onClick={onClick} style={styles.button} {...rest}>{text}</button>
    )
}

export const FrameSubtitle = ({ text, ...rest }) => {
    return (
        <div style={styles.subtitle} {...rest}>{text}</div>
    )
}
