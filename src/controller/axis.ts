import {observable} from "mobx";
import {dpadNeutralValue} from "./direction";

export class Axis {
	@observable private _value: number = 0;
	@observable private _neutralValue?: number;
	@observable private _minValue?: number;
	@observable private _maxValue?: number;
	@observable private _dpad: boolean = false;

	get value(): number {
		return this._value;
	}
	set value(value: number) {
		if (this._neutralValue === undefined) {
			this._neutralValue = value;
			this._dpad = value.toFixed(3) === dpadNeutralValue.toFixed(3);
		}
		if (this._minValue === undefined) {
			this._minValue = value;
		}
		if (this._maxValue === undefined) {
			this._maxValue = value;
		}

		this._value = value;
		this._minValue = Math.min(this._minValue, value);
		this._maxValue = Math.max(this._maxValue, value);
	}

	get minValue(): number | undefined {
		return this._minValue;
	}

	get neutralValue(): number | undefined {
		return this._neutralValue;
	}

	get maxValue(): number | undefined {
		return this._maxValue;
	}

	get dpad(): boolean {
		return this._dpad;
	}

	public calibrate() {
		this._minValue = undefined;
		this._neutralValue = undefined;
		this._maxValue = undefined;
		this._dpad = false;
	}
}
