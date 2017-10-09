import {AxisObject, isAxisObject} from "./axis-object";

/**
 * Controller data as a plain object for storage.
 */
export interface ControllerObject {
	axes?: AxisObject[];
}

/**
 * Returns true if some arbitrary value is a valid ControllerObject.
 */
export function isControllerObject(input: any): input is ControllerObject {
	return (
		typeof input === "object" &&
		(
			input.axes === undefined ||
			(Array.isArray(input.axes) && input.axes.every((axisObj) => isAxisObject(axisObj)))
		)
	);
}
