import {Direction} from "../direction";
import {BaseButtonJSON, ButtonType} from "./button-json";

/**
 * A JSON representation of a DpadButton.
 */
export interface DpadButtonJSON extends BaseButtonJSON {
	type: ButtonType.Dpad;
	direction: Direction;
}
