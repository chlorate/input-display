import {Widget} from "./widget";

/**
 * An abstract widget that represents a button.
 */
export abstract class ButtonWidget extends Widget {
	get topY(): number {
		return -this.borderWidth / 2;
	}

	get bottomY(): number {
		return this.height + this.borderWidth / 2;
	}
}
