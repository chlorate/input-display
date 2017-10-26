import {computed} from "mobx";
import {Direction4} from "../direction/direction4";
import {Button} from "./button";
import {ButtonType, DpadButtonJSON} from "./json/button-json";

/**
 * A button that represents a d-pad direction. This is somewhat of a virtual
 * button since it is interpreted from axis values reported by the Gamepad API.
 * It is uniquely identified by a direction.
 */
export class DpadButton extends Button {
	private _direction: Direction4;

	constructor(direction: Direction4) {
		super();
		this._direction = direction;
	}

	@computed get name(): string {
		return `D-pad ${this.direction}`;
	}

	get direction(): Direction4 {
		return this._direction;
	}

	/**
	 * Returns a JSON representation of this button.
	 */
	public toJSON(): DpadButtonJSON {
		return {
			type: ButtonType.Dpad,
			direction: this.direction,
			presses: this.presses,
			bestMashSpeed: this.bestMashSpeed,
		};
	}
}
