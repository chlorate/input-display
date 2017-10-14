import {sortedDirections} from "../direction";
import {DpadButtonJSON} from "./dpad-button-json";
import {NormalButtonJSON} from "./normal-button-json";

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
			(input.type === ButtonType.Dpad && sortedDirections.indexOf(input.direction) >= 0)
		)
	);
}
