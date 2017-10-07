import {clampInt} from "../math";
import {Button} from "./button";

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
		this._index = clampInt(index, 0);
	}

	get name(): string {
		return `Button ${this.index + 1}`;
	}

	get index(): number {
		return this._index;
	}
}
