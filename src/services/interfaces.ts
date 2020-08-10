export interface ISector extends IBoundingArc {
    name: string;
}

export interface IStatus {
    endDate: number;
    starDate: number;
    alert: 'green' | 'yellow' | 'red'
}

export interface IDamageControl {
    srs: number;
    lrs: number;
    warp: number;
    shield: number;
    paaser: number;
    torpedo: number;
    damageControl: number;
    libraryComputer: number;
    [index: string]: number;
}

export interface IShip extends IPositionable {
    name: string;
}

export interface IComms {
    log: string[];
}

export interface ISensors {
    selected: 'srs' | 'lrs';
    sector: ISector;
    sectors: ISector[];
    srs: IPositionable[];
    lrs: IPositionable[];
}

export interface IWarp {
    energy: number;
    heading: IPolar,
}

export interface IShields {
    energy: number;
}

export interface IPhasers {
    energy: number;
}

export interface ITorpedos {
    inventory: number;
    target: IPolar
}

export interface IEnemy extends IPositionable {
    name: string;
    shields: number;
    phaser: number;
}

export interface IPolar {
    r: number;
    theta: number;
}

export interface IRect {
    x: number;
    y: number;
}

export interface IBoundingBox {
    lowerLeft: IRect;
    upperRight: IRect;
}

export interface IBoundingArc {
    inner: IPolar;
    outer: IPolar;
}

export interface IBoundingCircle {
    center: IPolar;
    radius: number;
}

export interface IBounds {
    width: number;
    height: number;
}

export interface IPositionable {
    type: 'friendly' | 'enemy' | 'base' | 'star';
    position: IPolar;
}

