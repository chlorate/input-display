import {CircleStickControlJSON, ControlType} from "./json/control-json";
import {StickControl} from "./stick-control";

/**
 * A control that represents an analog stick with a circular outer shape.
 */
export class CircleStickControl extends StickControl {
	get type(): string {
		return "Analog stick (circle)";
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): CircleStickControlJSON {
		const json = {type: ControlType.CircleStick};
		return Object.assign(json, this.toBaseJSON()) as CircleStickControlJSON;
	}
}
