import React from 'react';

const styles = {
    title: {
        position: 'absolute',
        right: '1rem',
        zIndex: 1000,
        fontSize: '1.2rem'
    },
    frame: {
        border: '1rem solid gray',
        borderRadius: '2rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
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

    //   button: hover {
    //     background-color: lightgray;
    //   }


}

const getStyles = type => {
    return type ? { ...styles.frame, ...styles[type] } : { ...styles.frame, ...styles.left };
}

export const Frame = ({ type, children, ...rest }) => {
    return (
        <div style={getStyles(type)} {...rest}>
            {children}
        </div>
    );
}

export const FrameTitle = ({ title, ...rest }) => {
    return (
        <div style={styles.title} {...rest}>{title}</div>
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