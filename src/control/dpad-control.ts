import {observable} from "mobx";
import {Direction4} from "../direction/direction4";
import {Control} from "./control";
import {ControlType, DpadControlJSON} from "./json/control-json";

export const defaultDirection = Direction4.Up;

/**
 * A control that represents a d-pad button.
 */
export class DpadControl extends Control {
	@observable public direction: Direction4 = defaultDirection;

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): DpadControlJSON {
		const json = {
			type: ControlType.Dpad,
			direction: this.direction,
		};
		return Object.assign(json, super.toBaseJSON()) as DpadControlJSON;
	}
}
