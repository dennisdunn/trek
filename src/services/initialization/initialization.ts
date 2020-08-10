import { createSectors, QUADRANT_NAMES, REGION_NAMES } from "../cartography";
import { IComms, IDamageControl, IEnemy, IPhasers, IPolar, IPositionable, ISector, ISensors, IShields, IShip, IStatus, ITorpedos, IWarp } from '../interfaces';

const START_ENERGY = 3000;
const START_PHOTON_TORPEDOES = 10;
const MIN_ENEMY_SHIELD_ENERGY = 100;
const MAX_ENEMY_SHIELD_ENERGY = 300;
const MIN_ENEMY_PHASER_FIRE = 50;
const MAX_ENEMY_PHASER_FIRE = 200;
const MAX_STARS_SECTOR = 9;
const MIN_ENEMYS_GALAXY = 7;
const MAX_ENEMYS_GALAXY = 28;
const MAX_STARBASES_GALAXY = 5;
const MIN_DAYS_MISSION = 15;
const MAX_DAYS_MISSION = 45;
const START_STAR_DATE = 3000;

// create a random coordinate on the unit circle
const rndPosition = (): IPolar => {
    return {
        r: Math.random(),
        theta: Math.random() * 2 * Math.PI
    }
}

const range = (n: number): Array<number> => {
    return Array.from(Array(n).keys())
}

const rndMinmax = (min: number, max: number): number => {
    return Math.floor(min + Math.random() * (max - min));
}

const createStar = (): IPositionable => {
    return {
        type: 'star',
        position: rndPosition()
    }
}

const createBase = (): IPositionable => {
    return {
        type: 'base',
        position: rndPosition()
    }
}

const createEnemy = (): IEnemy => {
    return {
        name: '',
        type: 'enemy',
        position: rndPosition(),
        shields: rndMinmax(MIN_ENEMY_SHIELD_ENERGY, MAX_ENEMY_SHIELD_ENERGY),
        phaser: rndMinmax(MIN_ENEMY_PHASER_FIRE, MAX_ENEMY_PHASER_FIRE)
    }
}

export const game = (): IPositionable[] => {
    return range(rndMinmax(64, MAX_STARS_SECTOR * 16)).map(createStar)
        .concat(range(rndMinmax(1, MAX_STARBASES_GALAXY)).map(createBase))
        .concat(range(rndMinmax(MIN_ENEMYS_GALAXY, MAX_ENEMYS_GALAXY)).map(createEnemy));
}

export const sectors = (): ISector[] => {
    return createSectors(REGION_NAMES, QUADRANT_NAMES)
}

export const ship = (): IShip => {
    return {
        type: 'friendly',
        name: '',
        position: rndPosition(),
    };
}

export const comms = (): IComms => {
    return { log: [] }
}

export const status = (): IStatus => {
    return {
        endDate: START_STAR_DATE + rndMinmax(MIN_DAYS_MISSION, MAX_DAYS_MISSION),
        starDate: START_STAR_DATE,
        alert: 'green'
    }
}

export const damage = (): IDamageControl => {
    return {
        srs: 0,
        lrs: 0,
        warp: 0,
        shield: 0,
        paaser: 0,
        torpedo: 0,
        damageControl: 0,
        libraryComputer: 0,
    }
}

export const sensors = (): ISensors => {
    return {
        selected: 'srs',
        sector: {
            name: '',
            inner: { r: 0, theta: 0 },
            outer: { r: 0, theta: 0 }
        },
        sectors: sectors(),
        srs: [],
        lrs: []
    }
}

export const warp = (): IWarp => {
    return {
        energy: START_ENERGY,
        heading: { r: 0, theta: 0 }
    }
}

export const shields = (): IShields => {
    return { energy: 0 }
}

export const torpedos = (): ITorpedos => {
    return {
        inventory: START_PHOTON_TORPEDOES,
        target: { r: 0, theta: 0 }
    }
}

export const phasers = (): IPhasers => {
    return { energy: 0 }
}
