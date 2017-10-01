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
