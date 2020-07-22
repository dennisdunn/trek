import { toRect } from 'coordinates';
import React, { createContext, Fragment, useEffect, useRef, useState } from 'react';
import { DisplayContext, initializeCanvas } from '.';

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

export const Spritesheet = ({ src, size = 50, children }) => {
    const [sheet, setSheet] = useState(new Image());
    useEffect(() => {
        loadImage(src).then(setSheet);
    }, [src])

    return (
        <SpriteContext.Provider value={{ sheet, size }}>
            {children}
        </SpriteContext.Provider>
    )
}

export const SpriteLayer = ({ src, size = 50, children }) => {
    const [sprites, setSprites] = useState(new Image());
    const canvas = useRef();

    useEffect(() => {
        initializeCanvas(canvas.current.getContext('2d'));
        loadImage(src).then(setSprites);
    }, [src])

    return (
        <DisplayContext.Consumer>
            {
                ({ height, width }) => (
                    <Fragment>
                        <canvas style={{ position: 'absolute', top: 0, left: 0 }} width={width} height={height} ref={canvas}></canvas>
                        <SpriteContext.Provider value={{ sprites, canvas, size }}>
                            {children}
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
            {({ sprites, canvas, size }) => {
                if (canvas.current) {
                    const { x, y } = toRect(position);
                    const { spriteX, spriteY } = getSpritePosition(key, size, sprites.width, sprites.height);
                    const ctx = canvas.current.getContext('2d');
                    ctx.drawImage(sprites, spriteX, spriteY, size, size, x - scale * size / 2, y - scale * size / 2, scale * size, scale * size);
                }
            }}
        </SpriteContext.Consumer>
    )
}