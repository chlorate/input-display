import {observable} from "mobx";
import {Axis} from "../controller/axis";
import {Controller} from "../controller/controller";
import {clampInt} from "../math/util";

/**
 * A reference to a controller's axis by its index and if its value should be
 * inverted.
 */
export class AxisReference {
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
		this._index = clampInt(index, 0);
	}

	/**
	 * Finds and returns the axis of a controller that this reference points to.
	 * If no axis was found, this returns undefined.
	 */
	public resolveAxis(controller: Controller): Axis | undefined {
		if (this.index >= controller.axes.length) {
			return undefined;
		}
		return controller.axes[this.index];
	}

	/**
	 * Finds the axis of a controller that this reference points to and returns
	 * its value (or its inverted value if this reference is inverted). If no
	 * axis was found, this returns undefined.
	 */
	public resolveValue(controller: Controller): number | undefined {
		const axis = this.resolveAxis(controller);
		if (!axis) {
			return undefined;
		}
		return this.inverted ? axis.invertedValue : axis.value;
	}
}
