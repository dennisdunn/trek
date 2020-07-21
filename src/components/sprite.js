import { toRect } from 'coordinates';
import React, { createContext, Fragment, useEffect, useRef, useState } from 'react';
import { DisplayContext } from '.';

const loadImage = url => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    })
}

const getSpritePosition = (key, size, width, height) => {
    // sprites are stored in the sheet in row-major order
    const cols = width % size + 1;
    const rows = height % size + 1;
    const col = key % cols;
    const row = key - col * rows;

    return {
        spriteX: col * size,
        spriteY: row * size
    };
}

export const SpriteContext = createContext({});

export const SpriteLayer = ({ src, size = 50, children, ...rest }) => {
    const [sprites, setSprites] = useState(new Image());
    const canvas = useRef();
    const styles = {
        position: 'absolute',
        top: 0,
        left: 0
    }

    useEffect(() => {
        loadImage(src).then(setSprites);

        const ctx = canvas.current.getContext('2d');
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    }, [src])

    return (
        <DisplayContext.Consumer>
            {
                ({ height, width }) => (
                    <Fragment>
                        <canvas style={styles} width={width} height={height} ref={canvas} {...rest}></canvas>
                        <SpriteContext.Provider value={{ sheet: sprites, canvas: canvas, size: size }}>
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
            {({ sheet, size, canvas }) => {
                if (canvas.current) {
                    const { x, y } = toRect(position);
                    const { spriteX, spriteY } = getSpritePosition(key, size, sheet.width, sheet.height);
                    const ctx = canvas.current.getContext('2d');
                    ctx.drawImage(sheet, spriteX, spriteY, size, size, x - scale * size / 2, y - scale * size / 2, scale * size, scale * size);
                }
            }}
        </SpriteContext.Consumer>
    )
}