import {clampIndex} from "../math/util";
import {Button} from "./button";
import {ButtonType} from "./json/button-json";
import {NormalButtonJSON} from "./json/normal-button-json";

/**
 * A "normal" controller button. This corresponds to a button reported by the
 * Gamepad API which is usually a face button, shoulder button, trigger, control
 * stick button, or button on the backside of the controller. It is uniquely
 * identified by a numeric index.
 */
export class NormalButton extends Button {
	private _index: number;

	constructor(index: number) {
		super();
		this._index = clampIndex(index);
	}

	get name(): string {
		return `Button ${this.index + 1}`;
	}

	get index(): number {
		return this._index;
	}

	/**
	 * Returns a JSON representation of this button.
	 */
	public toJSON(): NormalButtonJSON {
		return {
			type: ButtonType.Normal,
			index: this.index,
			presses: this.presses,
			bestMashSpeed: this.bestMashSpeed,
		};
	}
}
