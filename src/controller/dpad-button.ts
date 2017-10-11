import {Button} from "./button";
import {Direction} from "./direction";
import {ButtonType} from "./json/button-json";
import {DpadButtonJSON} from "./json/dpad-button-json";

/**
 * A button that represents a d-pad direction. This is somewhat of a virtual
 * button since it is interpreted from axis values reported by the Gamepad API.
 * It is uniquely identified by a direction.
 */
export class DpadButton extends Button {
	private _direction: Direction;

	constructor(direction: Direction) {
		super();
		this._direction = direction;
	}

	get name(): string {
		return `D-pad ${this.direction}`;
	}

	get direction(): Direction {
		return this._direction;
	}

	public toJSON(): DpadButtonJSON {
		return {
			type: ButtonType.Dpad,
			direction: this.direction,
			presses: this.presses,
			bestMashSpeed: this.bestMashSpeed,
		};
	}
}
