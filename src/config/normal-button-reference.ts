import {observable} from "mobx";
import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {NormalButton} from "../controller/normal-button";
import {clampIndex} from "../math/util";
import {ButtonReference} from "./button-reference";

/**
 * A reference to a controller's normal button by its index.
 */
export class NormalButtonReference extends ButtonReference {
	@observable private _index: number;

	constructor(index: number) {
		super();
		this.index = index;
	}

	get name(): string {
		return `Button ${this.index + 1}`;
	}

	get index(): number {
		return this._index;
	}
	set index(index: number) {
		this._index = clampIndex(index);
	}

	/**
	 * Finds and returns the normal button of a controller that this reference
	 * points to. If no button was found, this returns undefined.
	 */
	public resolve(controller: Controller): Button | undefined {
		return controller.buttons.find((button) => button instanceof NormalButton && button.index === this.index);
	}
}
