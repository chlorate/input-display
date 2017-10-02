import {observable} from "mobx";
import {clampInt} from "./math";

export class Config {
	@observable private _gamepadIndex: number = 0;

	get gamepadIndex(): number {
		return this._gamepadIndex;
	}
	set gamepadIndex(gamepadIndex: number) {
		this._gamepadIndex = clampInt(gamepadIndex, 0);
	}
}
