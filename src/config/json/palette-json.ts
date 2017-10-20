/**
 * A JSON representation of a Palette.
 */
export interface PaletteJSON {
	border: string;
	fill: string;
	label: string;
}

/**
 * Returns true if some value is a PaletteJSON object.
 */
export function isPaletteJSON(input: any): input is PaletteJSON {
	return (
		typeof input === "object" &&
		typeof input.border === "string" &&
		typeof input.fill === "string" &&
		typeof input.label === "string"
	);
}
