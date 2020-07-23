import { toRect, Vector } from 'coordinates';
import React, { createContext, Fragment, useEffect, useRef, useState } from 'react';
import { DisplayContext, LayerContext } from '.';
import { CelContext } from './display';

const loadImage = url => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    })
}

const getSpriteIndex = (key, size, height, width) => {
    // sprites are stored in the sheet in row-major order 
    // and are 0-indexed
    const cols = width % size + 1;
    const rows = height % size + 1;
    const col = key % cols;
    const row = key - col * rows;

    return {
        x: col * size,
        y: row * size
    };
}

const getSpriteTopLeft = (position, dimensions, size) => {
    let pos = toRect(position)
    pos = Vector.Rect.sum(pos, { x: Math.SQRT2, y: Math.SQRT2 })
    pos = Vector.Rect.scale(pos, dimensions.height / 2 / Math.SQRT2)
    pos = { ...pos, y: dimensions.height - pos.y }
    pos = Vector.Rect.diff(pos, { x: size / 2, y: size / 2 })
    return { top: pos.y, left: pos.x }
}

// export const SpriteContext = createContext({});
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

export const Sprite = ({ key = 0, scale = 1.0, position = { r: 0, theta: 0 }, title = '', onClick = () => { } }) => {
    const ref = React.createRef()
    const panel = React.useContext(CelContext)
    const spritesheet = React.useContext(SpritesheetContext)
    const [size, setSize] = useState(scale * spritesheet.size)
    const [spritePosition, setSpritePosition] = useState({ top: 0, left: 0 })

    useEffect(() => {
        // draw the sprite
        const { x, y } = getSpriteIndex(key, spritesheet.size, spritesheet.sprites.width, spritesheet.sprites.height)
        const ctx = ref.current.getContext('2d')
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.drawImage(spritesheet.sprites, x, y, spritesheet.size, spritesheet.size, 0, 0, size, size)
        // set the position in the container
        setSpritePosition(getSpriteTopLeft(position, panel, size))
    }, [spritesheet.sprites])

    return (
        <canvas style={{ position: 'absolute', ...spritePosition }}
            height={size}
            width={size}
            title={title}
            onClick={onClick}
            ref={ref}></canvas>
    );
}

// export const SpriteLayer = ({ src, size = 50, children }) => {
//     const [sprites, setSprites] = useState(new Image());
//     const canvas = useRef();

//     useEffect(() => {
//         initializeCanvas(canvas.current.getContext('2d'));
//         loadImage(src).then(setSprites);
//     }, [src])

//     return (
//         <DisplayContext.Consumer>
//             {
//                 ({ height, width }) => (
//                     <Fragment>
//                         <canvas style={{ position: 'absolute', top: 0, left: 0 }} width={width} height={height} ref={canvas}></canvas>
//                         <SpriteContext.Provider value={{ sprites, canvas, size }}>
//                             {children}
//                         </SpriteContext.Provider>
//                     </Fragment>
//                 )
//             }
//         </DisplayContext.Consumer>
//     )
// }

// export const Sprite = ({ key = 0, scale = 1.0, position = { r: 0, theta: 0 } }) => {
//     const ref = React.useContext(LayerContext);
//     const { sprites, size } = React.useContext(SpritesheetContext);

//     useEffect(() => {
//         if (ref.current) {
//             const ctx = ref.current.getContext('2d');

//             ctx.setTransform(1, 0, 0, 1, 0, 0);
//             ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
//             const { x, y } = toRect(position);
//             const { spriteX, spriteY } = getSpritePosition(key, size, sprites.width, sprites.height);

//             console.log(size)
//             ctx.drawImage(sprites, spriteX, spriteY, size, size, x - scale * size / 2, y - scale * size / 2, scale * size, scale * size);
//         }
//     })

    // return null;

    // return (
    //     <SpriteContext.Consumer>
    //         {({ sprites, canvas, size }) => {
    //             if (canvas.current) {
    //                 const { x, y } = toRect(position);
    //                 const { spriteX, spriteY } = getSpritePosition(key, size, sprites.width, sprites.height);
    //                 const ctx = canvas.current.getContext('2d');
    //                 ctx.drawImage(sprites, spriteX, spriteY, size, size, x - scale * size / 2, y - scale * size / 2, scale * size, scale * size);
    //             }
    //         }}
    //     </SpriteContext.Consumer>
    // )
// }