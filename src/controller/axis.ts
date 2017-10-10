import {observable} from "mobx";
import {clamp} from "../math/util";
import {AxisJSON} from "./axis-json";

/**
 * A controller axis. Stores its current value, neutral value, and range of
 * possible values. The first value recorded is set as the neutral value. The
 * minimum and maximum values are updated as the value changes.
 */
export class Axis {
	/**
	 * Creates an axis from its JSON representation.
	 */
	public static fromJSON(json: AxisJSON): Axis {
		const axis = new Axis();
		axis.neutralValue = json.neutralValue;
		axis.minValue = json.minValue;
		axis.maxValue = json.maxValue;
		return axis;
	}

	@observable private _value: number = 0;
	@observable private _neutralValue?: number;
	@observable private _minValue?: number;
	@observable private _maxValue?: number;

	get value(): number {
		return this._value;
	}
	set value(value: number) {
		if (this.neutralValue === undefined) {
			this.neutralValue = value;
		}
		if (this.minValue === undefined) {
			this.minValue = value;
		}
		if (this.maxValue === undefined) {
			this.maxValue = value;
		}

		this._value = value;
		this.minValue = Math.min(this.minValue, value);
		this.maxValue = Math.max(this.maxValue, value);
	}

	get invertedValue(): number {
		return -this.value;
	}

	get neutralValue(): number | undefined {
		return this._neutralValue;
	}
	set neutralValue(value: number | undefined) {
		this._neutralValue = value === undefined ? value : clamp(value);
	}

	get minValue(): number | undefined {
		return this._minValue;
	}
	set minValue(value: number | undefined) {
		this._minValue = value === undefined ? value : clamp(value);
	}

	get maxValue(): number | undefined {
		return this._maxValue;
	}
	set maxValue(value: number | undefined) {
		this._maxValue = value === undefined ? value : clamp(value);
	}

	/**
	 * Returns a JSON representation of this axis.
	 */
	public toJSON(): AxisJSON {
		return {
			neutralValue: this.neutralValue,
			minValue: this.minValue,
			maxValue: this.maxValue,
		};
	}
}
