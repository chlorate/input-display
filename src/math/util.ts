/**
 * Returns true if two numbers are approximately equal.
 */
export function almostEqual(x: number, y: number): boolean {
	return Math.abs(x - y) <= 0.0005;
}

/**
 * Converts any value to a number and optionally clamps it to a min and/or max
 * value.
 */
export function clamp(value: any, min?: number, max?: number): number {
	if (min !== undefined && max !== undefined && min > max) {
		throw new RangeError("min must be less than max");
	}

	value = parseFloat(value);
	if (!isFinite(value)) {
		value = 0;
	}
	if (min !== undefined && value < min) {
		value = min;
	}
	if (max !== undefined && value > max) {
		value = max;
	}
	return value;
}

/**
 * Converts any value to an integer and optionally clamps it to a min and/or max
 * value.
 */
export function clampInt(value: any, min?: number, max?: number): number {
	return Math.trunc(clamp(value, min, max));
}

/**
 * Converts any value to an integer and clamps it to a valid array index (0 or
 * larger).
 */
export function clampIndex(value: any): number {
	return clampInt(value, 0);
}

/**
 * Returns a number formatted with commas.
 */
export function formatNumber(n: number): string {
	let out = n.toFixed(6).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
	out = out.replace(/0+$/, "");
	out = out.replace(/\.$/, "");
	return out;
}
