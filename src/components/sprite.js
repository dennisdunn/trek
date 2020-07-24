import { toRect, Vector } from 'coordinates';
import React, { createContext, useEffect, useState } from 'react';
import { CelContext } from './cel';

const loadImage = url => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    })
}

const getSpriteIndex = (index, size, height, width) => {
    // sprites are stored in the sheet in row-major order 
    // and are 0-indexed
    const cols = width / size;
    const rows = height / size;
    const col = index % cols;
    const row = Math.floor((index - col) / rows);

    return {
        x: col * size,
        y: row * size
    };
}

const getSpriteTopLeft = (position, dimensions, size) => {
    let pos = toRect(position)
    // translate the position into quadrant IV
    // // scale
    const xScale = dimensions.width / 2
    const yScale = -dimensions.height / 2
    pos = { x: pos.x * xScale, y: pos.y * yScale }
    // project into the canvas coordinate space
    const projection = { x: dimensions.width / 2, y: dimensions.height / 2 }
    pos = Vector.Rect.sum(pos, projection)
    // adjust to the center of the sprite
    pos = Vector.Rect.diff(pos, { x: size / 2, y: size / 2 })

    return { top: pos.y, left: pos.x }
}

export const SpritesheetContext = createContext(null);

export const Spritesheet = ({ src, size = 50, children }) => {
    const [sprites, setSprites] = useState(new Image());
    useEffect(() => {
        loadImage(src).then(setSprites);
    }, [src])

    return (
        <SpritesheetContext.Provider value={{ sprites, size }}>
            {children}
        </SpritesheetContext.Provider>
    )
}

export const Sprite = ({ index = 0, scale = 1.0, position = { r: 0, theta: 0 }, title = '', onClick = () => { } }) => {
    const ref = React.createRef()
    const panel = React.useContext(CelContext)
    const spritesheet = React.useContext(SpritesheetContext)
    const [spritePosition, setSpritePosition] = useState({ top: 0, left: 0 })

    const size = scale * spritesheet.size;

    useEffect(() => {
        // draw the sprite
        const { x, y } = getSpriteIndex(index, spritesheet.size, spritesheet.sprites.width, spritesheet.sprites.height)

        console.log({ x, y })

        const ctx = ref.current.getContext('2d')
        ctx.drawImage(spritesheet.sprites, x, y, spritesheet.size, spritesheet.size, 0, 0, size, size)
        // set the position in the container
        setSpritePosition(getSpriteTopLeft(position, panel, size))
    }, [spritesheet])

    return (
        <canvas style={{ position: 'absolute', ...spritePosition }}
            height={size}
            width={size}
            title={title}
            onClick={onClick}
            ref={ref}></canvas>
    );
}