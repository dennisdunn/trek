import React, { createContext, useState, useEffect, Fragment, useRef } from 'react';
import { toRect } from 'coordinates';
import { DisplayContext } from '.';

export const SpriteContext = createContext({});

export const SpriteLayer = ({ src, children, ...rest }) => {
    const [sprites, setSpriteSheet] = useState(new Image());
    const canvas = useRef();
    const styles = {
        position: 'absolute',
        top: 0,
        left: 0
    }

    useEffect(() => {
        const img = new Image();
        img.src = src;
        setSpriteSheet(img);

        const ctx = canvas.current.getContext('2d');

        ctx.beginPath();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    }, [src])

    return (
        <DisplayContext.Consumer>
            {
                ({ height, width }) => (
                    <Fragment>
                        <canvas style={styles} width={width} height={height} ref={canvas} {...rest}></canvas>
                        <SpriteContext.Provider value={{ sheet: sprites, canvas: canvas }}>
                            <Fragment>{children}</Fragment>
                        </SpriteContext.Provider>
                    </Fragment>
                )
            }
        </DisplayContext.Consumer>
    )
}

export const Sprite = ({ key = 0, scale = 1.0, position = { r: 0, theta: 0 } }) => {
    return (
        <SpriteContext.Consumer>
            {({ sheet, canvas }) => {
                if (canvas.current) {
                    const size = sheet.height;
                    const { x, y } = toRect(position);
                    const ctx = canvas.current.getContext('2d');
                    ctx.drawImage(sheet, key * size, 0, size, size, x - (size / 2), y - (size / 2), scale * size, scale * size);
                }
            }}
        </SpriteContext.Consumer>
    )
}