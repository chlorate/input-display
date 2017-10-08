/**
 * Returns true if two arrays are exactly equal.
 */
export function arraysEqual(x: any[], y: any[]): boolean {
	return x.length === y.length && x.every((value, i) => value === y[i]);
}
