import {observable} from "mobx";
import {clampInt} from "./math";

export class Config {
	@observable private _hatAxis: number | null = null;

	get hatAxis(): number | null { return this._hatAxis; }
	set hatAxis(value: number | null) { this._hatAxis = value === null ? null : clampInt(value, 0); }
}
