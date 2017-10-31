import {ControlType, OctagonStickControlJSON} from "./json/control-json";
import {StickControl} from "./stick-control";

/**
 * A control that represents an analog stick with an octagonal outer shape
 * commonly seen on Nintendo controllers.
 */
export class OctagonStickControl extends StickControl {
	get type(): string {
		return "Analog stick (octagon)";
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): OctagonStickControlJSON {
		const json = {type: ControlType.OctagonStick};
		return Object.assign(json, this.toBaseJSON()) as OctagonStickControlJSON;
	}
}
