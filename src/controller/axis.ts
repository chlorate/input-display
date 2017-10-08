import {observable} from "mobx";

/**
 * A controller axis. Stores its current value, neutral value, and range of
 * possible values. The first value recorded is set as the neutral value. The
 * minimum and maximum values are updated as the value changes.
 */
export class Axis {
	@observable private _value: number = 0;
	@observable private _neutralValue?: number;
	@observable private _minValue?: number;
	@observable private _maxValue?: number;

	get value(): number {
		return this._value;
	}
	set value(value: number) {
		if (this._neutralValue === undefined) {
			this._neutralValue = value;
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

	get invertedValue(): number {
		return -this.value;
	}

	get neutralValue(): number | undefined {
		return this._neutralValue;
	}

	get minValue(): number | undefined {
		return this._minValue;
	}

	get maxValue(): number | undefined {
		return this._maxValue;
	}
}
