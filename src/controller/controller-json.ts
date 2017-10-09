import {AxisJSON, isAxisJSON} from "./axis-json";

/**
 * A JSON representation of a Controller.
 */
export interface ControllerJSON {
	axes?: AxisJSON[];
}

/**
 * Returns true if some value is a valid ControllerJSON object.
 */
export function isControllerJSON(input: any): input is ControllerJSON {
	return (
		typeof input === "object" &&
		(
			input.axes === undefined ||
			(Array.isArray(input.axes) && input.axes.every((axis) => isAxisJSON(axis)))
		)
	);
}
