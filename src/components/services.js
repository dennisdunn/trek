import { toRect, toPolar, Vector } from 'coordinates'

export const logMessage = (shipCtx, msg) => {
    shipCtx.setShip(prev => { return { ...prev, comms: [...prev.comms, msg] } })
}

// convert canvas coordinates {x,y} to game field coordinates {r,theta}
export const canvas2gamefield = (coord, bounds) => {
    // translate to the cartesian plane
    let position = Vector.Rect.diff(coord, { x: bounds.width / 2, y: bounds.height / 2 })
    // scale to the unit square
    position = Vector.Rect.scale(position, 1 / bounds.width * 2)
    // flip across the x-axis
    //position = { ...position, y: -1 * position.y }
    // convert to polar
    position = toPolar(position)

    return position
}

// convert game field coordinates {r,theta} to canvas coordinates {x,y}
export const gamefield2canvas = (coord, bounds) => {

}