export const between = (lower: number, value: number, upper: number): boolean => {
    return lower <= value && value < upper;
}