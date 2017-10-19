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
