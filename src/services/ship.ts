import { getSectorContaining } from "./cartography";
import Geometry from "./geometry";
import { IDamageControl, IPolar, IPositionable, ISector, IShields, IShip } from "./interfaces";
import Vector from "./vector";

const SHIELD_EFFICIENCY = 0.15;

const clamp = (value: number): number => {
    if (value < 0) {
        return 0;
    } else if (value > 1.0) {
        return 1.0;
    } else {
        return value;
    }
}

// functions to change ship state initiated by the player
export const repairDamage = (damage: IDamageControl, repairs: number): IDamageControl => {
    Object.keys(damage.status).forEach(system => {
        damage[system] -= repairs;
        damage[system] = clamp(damage[system]);
    });

    return { ...damage };
}

export const repairAllDamage = (damage: IDamageControl): IDamageControl => {
    return repairDamage(damage, 1.0);
}

export const warp = (ship: IShip, heading: IPolar): IShip => {
    const position = Vector.Polar.sum(ship.position, heading);

    return { ...ship, position };
}

export const shortRangeScan = (objs: IPositionable[], ship: IShip, sectors: ISector[]): IPositionable[] => {
    const sector = getSectorContaining(sectors, ship);
    return objs.filter(obj => Geometry.Polar.contains(sector, obj.position))
}

export const longRangeScan = (objs: IPositionable[], ship: IShip, radius: number): IPositionable[] => {
    return objs.filter(obj => Geometry.Polar.within({ center: ship.position, radius: radius }, obj.position))
}

// handleX() functions change the ship state initiated by outside events
export const handleEnergyHit = (shields: IShields, damage: IDamageControl, energyHit: number): [IShields, IDamageControl] => {

    if (energyHit > shields.energy * SHIELD_EFFICIENCY) {
        const systems = Object.keys(damage);
        const system = systems[Math.floor(Math.random() * systems.length)];
        damage[system] += Math.random();
        damage[system] = clamp(damage[system]);
    }
    shields.energy -= energyHit; // ship is destroyed when shields < 0

    return [{ ...shields }, { ...damage }]
}
