import {AxisJSON, isAxisJSON} from "./axis-json";
import {ButtonJSON, isButtonJSON} from "./button-json";

/**
 * A JSON representation of a Controller.
 */
export interface ControllerJSON {
	axes: AxisJSON[];
	buttons: ButtonJSON[];
}

/**
 * Returns true if some value is a valid ControllerJSON object.
 */
export function isControllerJSON(input: any): input is ControllerJSON {
	return (
		typeof input === "object" &&
		Array.isArray(input.axes) && input.axes.every((axis) => isAxisJSON(axis)) &&
		Array.isArray(input.buttons) && input.buttons.every((button) => isButtonJSON(button))
	);
}
