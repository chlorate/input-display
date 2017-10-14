import {sortedDirections} from "../../controller/direction";
import {ButtonType} from "../../controller/json/button-json";
import {DpadButtonReferenceJSON} from "./dpad-button-reference-json";
import {NormalButtonReferenceJSON} from "./normal-button-reference-json";

/**
 * JSON representations of all ButtonReference subclasses.
 */
export type ButtonReferenceJSON = NormalButtonReferenceJSON | DpadButtonReferenceJSON;

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
