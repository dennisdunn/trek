import React, { useEffect, useRef } from 'react';
import { DisplayContext } from '.';

const styles = {
    position: 'absolute',
    top: 0,
    left: 0
};

export const GraphicsLayer = (props) => {
    const canvas = useRef();

    useEffect(() => {
        if (typeof (props.children) === 'function') {
            const ctx = canvas.current.getContext('2d');
            props.children.call(canvas.current, ctx);
        }
    })

    return (
        <DisplayContext.Consumer>
            {
                ({ width, height }) => (<canvas style={styles} width={width} height={height} ref={canvas}></canvas>)
            }
        </DisplayContext.Consumer>
    );
}

export const ElementLayer = ({ children }) => {
    return (
        <DisplayContext.Consumer>
            {
                ({ width, height }) => (<div style={styles} width={width} height={height} >
                    {children}
                </div>)
            }
        </DisplayContext.Consumer>
    )
}