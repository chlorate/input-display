/**
 * A JSON representation of a ButtonPalette.
 */
export interface ButtonPaletteJSON {
	border: string;
	fill: string;
	label: string;
}

/**
 * Returns true if some value is a ButtonPaletteJSON object.
 */
export function isButtonPaletteJSON(input: any): input is ButtonPaletteJSON {
	return (
		typeof input === "object" &&
		typeof input.border === "string" &&
		typeof input.fill === "string" &&
		typeof input.label === "string"
	);
}
