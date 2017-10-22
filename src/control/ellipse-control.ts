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
		return {
			type: ControlType.Ellipse,
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
