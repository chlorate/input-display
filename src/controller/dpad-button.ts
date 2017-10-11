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
	/**
	 * Creates a button from its JSON representation.
	 */
	public static fromJSON(json: DpadButtonJSON): DpadButton {
		const button = new DpadButton(json.direction);
		button.loadJSON(json);
		return button;
	}

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
