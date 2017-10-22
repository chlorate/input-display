import {Control} from "./control";
import {ControlType, RoundButtonControlJSON} from "./json/control-json";

/**
 * A control that represents a button shaped like a circle or ellipse.
 */
export class RoundButtonControl extends Control {
	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): RoundButtonControlJSON {
		return {
			type: ControlType.RoundButton,
			name: this.name,
			button: this.button ? this.button.toJSON() : undefined,
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			borderWidth: this.borderWidth,
			nameLabel: this.nameLabel,
			pressesLabel: this.pressesLabel,
			mashSpeedLabel: this.mashSpeedLabel,
		};
	}
}
