/**
 * Ensures a string is a valid hex color and returns it. If it's not a valid
 * color, then a default color is returned.
 */
export function ensureColor(color: string, defaultColor: string): string {
	if (!/^#[\da-f]{6}$/i.test(color)) {
		color = defaultColor;
	}
	return color.toLowerCase();
}

export function tempEnsureColor(color?: string): string | undefined {
	if (!color) {
		return undefined;
	}

	color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, "$1$1$2$2$3$3");
	if (color[0] !== "#") {
		color = `#${color}`;
	}
	return /^#[\da-f]{6}$/i.test(color) ? color.toLowerCase() : undefined;
}

/**
 * Wraps some string value in quotes.
 */
export function quote(value: string): string {
	return `"${value.replace(/\\/g, "\\\\").replace(/"/g, `\\"`)}"`;
}
