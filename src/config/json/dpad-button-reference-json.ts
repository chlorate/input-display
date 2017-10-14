import {Direction} from "../../controller/direction";
import {ButtonType} from "../../controller/json/button-json";

/**
 * A JSON representation of a DpadButtonReference.
 */
export interface DpadButtonReferenceJSON {
	type: ButtonType.Dpad;
	direction: Direction;
}
