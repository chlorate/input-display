import {observable} from "mobx";
import {Axis} from "../controller/axis";
import {Controller} from "../controller/controller";
import {clampIndex} from "../math/util";
import {AxisReferenceJSON} from "./json/axis-reference-json";

/**
 * A reference to a controller's axis by its index and if its value should be
 * inverted.
 */
export class AxisReference {
	/**
	 * Creates a reference from its JSON representation.
	 */
	public static fromJSON(json: AxisReferenceJSON): AxisReference {
		return new AxisReference(json.index, json.inverted);
	}

	@observable public inverted: boolean;
	@observable private _index: number;

	constructor(index: number, inverted: boolean) {
		this.index = index;
		this.inverted = inverted;
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
	public toJSON(): AxisReferenceJSON {
		return {
			index: this.index,
			inverted: this.inverted,
		};
	}

	/**
	 * Finds and returns the axis of a controller that this reference points to.
	 * If no axis was found, this returns undefined.
	 */
	public resolve(controller: Controller): Axis | undefined {
		if (this.index >= controller.axes.length) {
			return undefined;
		}
		return controller.axes[this.index];
	}
}
