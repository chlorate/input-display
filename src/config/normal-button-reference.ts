import {observable} from "mobx";
import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {ButtonType} from "../controller/json/button-json";
import {NormalButton} from "../controller/normal-button";
import {clampIndex} from "../math/util";
import {ButtonReference} from "./button-reference";
import {NormalButtonReferenceJSON} from "./json/normal-button-reference-json";

/**
 * A reference to a controller's normal button by its index.
 */
export class NormalButtonReference extends ButtonReference {
	/**
	 * Creates a reference from its JSON representation.
	 */
	public static fromJSON(json: NormalButtonReferenceJSON): NormalButtonReference {
		return new NormalButtonReference(json.index);
	}

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
	 * Returns a JSON representation of this reference.
	 */
	public toJSON(): NormalButtonReferenceJSON {
		return {
			type: ButtonType.Normal,
			index: this.index,
		};
	}

	/**
	 * Finds and returns the normal button of a controller that this reference
	 * points to. If no button was found, this returns undefined.
	 */
	public resolve(controller: Controller): Button | undefined {
		return controller.buttons.find((button) => button instanceof NormalButton && button.index === this.index);
	}
}
