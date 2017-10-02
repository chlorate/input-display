import {observable} from "mobx";
import {clampInt} from "./math";

export class Config {
	@observable private _gamepadIndex: number = 0;
	@observable private _hatAxis: number | null = null;

	get gamepadIndex(): number {
		return this._gamepadIndex;
	}
	set gamepadIndex(gamepadIndex: number) {
		this._gamepadIndex = clampInt(gamepadIndex, 0);
	}

	get hatAxis(): number | null { return this._hatAxis; }
	set hatAxis(value: number | null) { this._hatAxis = value === null ? null : clampInt(value, 0); }
}
