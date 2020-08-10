export const between = (lower: number, value: number, upper: number): boolean => {
    return value >= lower && value <= upper;
}