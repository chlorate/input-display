import {Direction4, sortedDirection4s} from "../../direction/direction4";

/**
 * Type values for distinguishing Button subclass JSON representations.
 */
export enum ButtonType {
	Normal = "normal",
	Dpad = "dpad",
}

/**
 * JSON representations of all Button subclasses.
 */
export type ButtonJSON = NormalButtonJSON | DpadButtonJSON;

/**
 * A JSON representation of a NormalButton.
 */
export interface NormalButtonJSON extends BaseButtonJSON {
	type: ButtonType.Normal;
	index: number;
}

/**
 * A JSON representation of a DpadButton.
 */
export interface DpadButtonJSON extends BaseButtonJSON {
	type: ButtonType.Dpad;
	direction: Direction4;
}

/**
 * Common properties for all Button JSON representations.
 */
export interface BaseButtonJSON {
	presses: number;
	bestMashSpeed: number;
}

/**
 * Returns true if some value is a ButtonJSON object.
 */
export function isButtonJSON(input: any): input is ButtonJSON {
	return (
		typeof input === "object" &&
		typeof input.presses === "number" &&
		typeof input.bestMashSpeed === "number" &&
		(
			(input.type === ButtonType.Normal && typeof input.index === "number") ||
			(input.type === ButtonType.Dpad && sortedDirection4s.indexOf(input.direction) >= 0)
		)
	);
}
