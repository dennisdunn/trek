import { IAction, IPolar } from '../interfaces'

export const doTargetTorpedo = (target: IPolar): IAction => {
    return { sys: 'torpedos', type: 'set-target', payload: target }
}
