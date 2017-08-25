export function clampIntOrNull(n: any, min?: number, max?: number): number | null {
	if (n === null) {
		return n;
	}

	n = parseInt(n, 10);
	if (min !== undefined && n < min) {
		n = min;
	}
	if (max !== undefined && n > max) {
		n = max;
	}
	return isNaN(n) ? null : Math.trunc(n);
}
