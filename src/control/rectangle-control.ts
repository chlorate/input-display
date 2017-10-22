import {Control} from "./control";
import {ControlType, RectangleControlJSON} from "./json/control-json";

/**
 * A control that represents a button shaped like a square or rectangle.
 */
export class RectangleControl extends Control {
	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): RectangleControlJSON {
		const json = {type: ControlType.Rectangle};
		return Object.assign(json, super.toBaseJSON()) as RectangleControlJSON;
	}
}
