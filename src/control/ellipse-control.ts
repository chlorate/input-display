import {Control} from "./control";
import {ControlType, EllipseControlJSON} from "./json/control-json";

/**
 * A control that represents a button shaped like a circle or ellipse.
 */
export class EllipseControl extends Control {
	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): EllipseControlJSON {
		const json = {type: ControlType.Ellipse};
		return Object.assign(json, super.toBaseJSON()) as EllipseControlJSON;
	}
}
