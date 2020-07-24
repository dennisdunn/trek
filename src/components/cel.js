import React, { useEffect } from 'react';

export const CelContext = React.createContext({ width: 300, height: 150 });
export const LayerContext = React.createContext(null);

export const CelPanel = ({ height, width, init = () => { }, children }) => {

    return (
        <CelContext.Provider value={{ height, width, init }}>
            <div style={{ position: 'relative', height, width }}>
                {children}
            </div>
        </CelContext.Provider>
    );
}

export const Cel = ({ draw, polar = false }) => {
    const ref = React.createRef();

    useEffect(() => {
        const ctx = ref.current.getContext('2d');
        if (polar) ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        draw(ctx);
    }, [])

    return (
        <CelContext.Consumer>
            {({ height, width }) => {
                return (
                    <canvas style={{ position: 'absolute', top: 0, left: 0 }}
                        height={height}
                        width={width}
                        ref={ref}>
                    </canvas>
                );
            }}
        </CelContext.Consumer>
    );
}

