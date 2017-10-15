import {Direction, sortedDirections} from "../../controller/direction";
import {ButtonType} from "../../controller/json/button-json";

/**
 * JSON representations of all ButtonReference subclasses.
 */
export type ButtonReferenceJSON = NormalButtonReferenceJSON | DpadButtonReferenceJSON;

/**
 * A JSON representation of a NormalButtonReference.
 */
export interface NormalButtonReferenceJSON {
	type: ButtonType.Normal;
	index: number;
}

/**
 * A JSON representation of a DpadButtonReference.
 */
export interface DpadButtonReferenceJSON {
	type: ButtonType.Dpad;
	direction: Direction;
}

/**
 * Returns true if some value is a ButtonReferenceJSON object.
 */
export function isButtonReferenceJSON(input: any): input is ButtonReferenceJSON {
	return (
		typeof input === "object" &&
		(
			(input.type === ButtonType.Normal && typeof input.index === "number") ||
			(input.type === ButtonType.Dpad && sortedDirections.indexOf(input.direction) >= 0)
		)
	);
}
