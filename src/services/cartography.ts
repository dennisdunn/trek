import Geometry from "./geometry";
import { IPositionable, ISector } from "./interfaces";

export const REGION_NAMES = [
    'Aldebaran', 'Altair',
    'Antares', 'Arcturus',
    'Betelguse', 'Canapus',
    'Capella', 'Deneb',
    'Pollux', 'Procyon',
    'Regulus', 'Rigel',
    'Sagitarius', 'Sirus',
    'Spica', 'Vega'
]

export const QUADRANT_NAMES = [
    "I",
    "II",
    "III",
    "IV"
]

// radius of equal-area rings
// see https://math.stackexchange.com/questions/270287/how-to-divide-a-circle-into-9-rings-1-inner-circle-with-the-same-area
export const createSectors = (regionNames: string[], quadrantNames: string[]): ISector[] => {
    const quadrantWidth = 2 * Math.PI / regionNames.length;
    return regionNames.map((rname, ridx) => quadrantNames.map((qname, qidx) => {
        return {
            name: `${rname} ${qname}`,
            inner: {
                r: Math.sqrt(qidx / 4),
                theta: ridx * quadrantWidth
            },
            outer: {
                r: Math.sqrt((qidx + 1) / 4),
                theta: (ridx + 1) * quadrantWidth
            }
        }
    }))
        .reduce((prev, current) => prev.concat(current), []);
}

export const getSectorByName = (sectors: ISector[], name: string): ISector => {
    const sector = sectors.find(sector => sector.name === name);
    if (!sector) throw new Error('invalid sector name');
    return sector;
}

export const getSectorContaining = (sectors: ISector[], obj: IPositionable): ISector => {
    const sector = sectors.find(sector => Geometry.Polar.contains(sector, obj.position));
    if (!sector) throw new Error('obj is not contained in a sector');
    return sector;
}
