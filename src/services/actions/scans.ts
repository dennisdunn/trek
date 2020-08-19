import { IAction, IPositionable, IShip, ISensors } from '../interfaces'

export const doSrsScan = (game: IPositionable[], ship: IShip, sensors: ISensors): IAction => {
    return { sys: 'sensors', type: 'srs-scan', payload: { game, ship, sensors } }
}

export const doLrsScan = (game: IPositionable[], ship: IShip): IAction => {
    return { sys: 'sensors', type: 'lrs-scan', payload: { game, ship } }
}
