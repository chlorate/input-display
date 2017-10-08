import {observable} from "mobx";
import {clampIndex, clampInt} from "../math/util";
import {AxisReference} from "./axis-reference";

// 4 ms is the smallest delay:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_>4ms
export const minPollRate = 1;
export const maxPollRate = 250;

/**
 * Stores all settings related to the controller and input display.
 */
export class Config {
	@observable private _gamepadIndex: number = 0;
	@observable private _dpadAxisIndex?: number;
	@observable private _dpadXAxis?: AxisReference;
	@observable private _dpadYAxis?: AxisReference;
	@observable private _pollRate: number = 60;

	get gamepadIndex(): number {
		return this._gamepadIndex;
	}
	set gamepadIndex(gamepadIndex: number) {
		this._gamepadIndex = clampIndex(gamepadIndex);
	}

	get dpadAxisIndex(): number | undefined {
		return this._dpadAxisIndex;
	}
	set dpadAxisIndex(index: number | undefined) {
		if (index === undefined) {
			this._dpadAxisIndex = undefined;
		} else {
			this.clearDpadMapping();
			this._dpadAxisIndex = clampIndex(index);
		}
	}

	get dpadXAxis(): AxisReference | undefined {
		return this._dpadXAxis;
	}

	get dpadYAxis(): AxisReference | undefined {
		return this._dpadYAxis;
	}

	get pollRate(): number {
		return this._pollRate;
	}
	set pollRate(pollRate: number) {
		this._pollRate = clampInt(pollRate, minPollRate, maxPollRate);
	}

	/**
	 * Sets settings related to the d-pad dual axes mapping and clears all other
	 * d-pad mapping settings to ensure only the one mapping is used.
	 */
	public setDpadDualAxes(x: AxisReference, y: AxisReference) {
		this.clearDpadMapping();
		this._dpadXAxis = x;
		this._dpadYAxis = y;
	}

	/**
	 * Clears all settings related to d-pad mappings.
	 */
	public clearDpadMapping() {
		this._dpadAxisIndex = undefined;
		this._dpadXAxis = undefined;
		this._dpadYAxis = undefined;
	}
}
