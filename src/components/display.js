import React, { Fragment, useEffect, useState } from 'react';

export const DisplayContext = React.createContext({ width: 300, height: 150 });
export const LayerContext = React.createContext(null);

export const initializeCanvas = ctx => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
}

export const Display = ({ height, width, children }) => {

    return (
        <DisplayContext.Provider value={{ height, width }}>
            <div style={{ position: 'relative', height, width }}>
                {children}
            </div>
        </DisplayContext.Provider>
    );
}

export const Layer = ({ children }) => {
    const ref = React.createRef();

    return (
        <DisplayContext.Consumer>
            {
                ({ height, width }) => (
                    <Fragment>
                        <canvas style={{ position: 'absolute', top: 0, left: 0 }}
                            height={height}
                            width={width}
                            ref={ref}>
                        </canvas>
                        <LayerContext.Provider value={ref}>
                            {children}
                        </LayerContext.Provider>
                    </Fragment>
                )
            }
        </DisplayContext.Consumer>
    );
}

export const Graphics = ({ draw, reset = false }) => {
    const ref = React.useContext(LayerContext);

    useEffect(() => {
        if (ref.current) {
            const ctx = ref.current.getContext('2d');
            if (reset) {
                initializeCanvas(ctx);
            }
            draw(ctx);
        }
    })

    return null;
}