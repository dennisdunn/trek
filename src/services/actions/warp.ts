import { IAction, IPolar } from '../interfaces'
import * as Convert from '../convert'
import Vector from '../vector'

export const doChangeHeading = (e: any, target: IPolar): IAction => {
    const bounds = e.currentTarget.getBoundingClientRect()
    let point = { x: e.clientX - bounds.left, y: e.clientY - bounds.top }
    const dest = Convert.canvas2polar(point, bounds)

    return { sys: 'warp', type: 'new-heading', payload: Vector.Polar.diff(dest, target) }
}
