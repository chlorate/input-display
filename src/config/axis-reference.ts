import {observable} from "mobx";
import {clampInt} from "../math";

export class AxisReference {
	@observable public invert: boolean;
	@observable private _index: number;

	constructor(index: number, invert: boolean) {
		this.index = index;
		this.invert = invert;
	}

	get index(): number {
		return this._index;
	}
	set index(index: number) {
		this._index = clampInt(index, 0);
	}
}
