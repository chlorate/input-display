/**
 * Returns true if two numbers are approximately equal.
 */
export function almostEqual(x: number, y: number): boolean {
	return Math.abs(x - y) <= 0.0005;
}

/**
 * Converts a number to an integer and optionally clamps it to a min and/or max
 * value.
 */
export function clampInt(n: any, min?: number, max?: number): number {
	if (min !== undefined && max !== undefined && min > max) {
		throw new RangeError("min must be less than max");
	}

	n = parseInt(n, 10);
	if (isNaN(n)) {
		n = 0;
	}
	if (min !== undefined && n < min) {
		n = min;
	}
	if (max !== undefined && n > max) {
		n = max;
	}
	return Math.trunc(n);
}
