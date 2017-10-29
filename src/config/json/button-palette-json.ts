import {isPaletteJSON, PaletteJSON} from "./palette-json";

/**
 * A JSON representation of a ButtonPalette.
 */
export interface ButtonPaletteJSON extends PaletteJSON {
	label: string;
}

/**
 * Returns true if some value is a ButtonPaletteJSON object.
 */
export function isButtonPaletteJSON(input: any): input is ButtonPaletteJSON {
	return (
		isPaletteJSON(input as object) &&
		typeof input.label === "string"
	);
}
