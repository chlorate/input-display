import {observable} from "mobx";
import {clampIntOrNull} from "./math";

export class Config {
	@observable private _hatAxis: number | null = null;

	get hatAxis(): number | null { return this._hatAxis; }
	set hatAxis(value: number | null) { this._hatAxis = clampIntOrNull(value, 0); }
}
