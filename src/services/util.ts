export const between = (lower: number, value: number, upper: number): boolean => {
    return lower <= value && value < upper;
}

export const clamp = (lower: number, value: number, upper: number): number => {
    return value < lower ? lower : value > upper ? upper : value
}