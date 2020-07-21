import React, { useEffect, useRef } from 'react';

export const DisplayContext = React.createContext({ width: 300, height: 150 });

export const Display = ({ height, width, children, ...rest }) => {
    const styles = {
        position: 'relative',
        height: height,
        width: width
    }

    return (
        <DisplayContext.Provider value={{ width, height, ...rest }}>
            <div style={styles}>
                {children}
            </div>
        </DisplayContext.Provider>
    );
}

export const GraphicsLayer = ({ draw, children, ...rest }) => {
    const canvas = useRef();
    const styles = {
        position: 'absolute',
        top: 0,
        left: 0
    }

    useEffect(() => {
        let f = () => { };
        if (typeof (children) === 'function') {
            f = children;
        } else if (typeof (draw) === 'function') {
            f = draw;
        } else {
            throw new Error('A GraphicsLayer needs a draw(ctx) function')
        }

        const ctx = canvas.current.getContext('2d');

        ctx.beginPath();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        f.call(canvas.current, ctx);
    })

    return (
        <DisplayContext.Consumer>
            {
                ({ width, height }) => (<canvas style={styles} width={width} height={height} ref={canvas} {...rest}></canvas>)
            }
        </DisplayContext.Consumer>
    );
}