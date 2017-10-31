import {computed, observable} from "mobx";
import {AxisReference} from "../config/axis-reference";
import {clampInt} from "../math/util";
import {Control} from "./control";
import {BaseStickControlJSON} from "./json/control-json";

export const minSize = 1;
export const maxSize = 2160;
export const defaultOuterSize = 50;
export const defaultInnerSize = 30;

/**
 * An abstract control that represents an analog stick.
 */
export abstract class StickControl extends Control {
	@observable public xAxis?: AxisReference;
	@observable public yAxis?: AxisReference;
	@observable private _outerSize: number = defaultOuterSize;
	@observable private _innerSize: number = defaultInnerSize;

	get outerSize(): number {
		return this._outerSize;
	}
	set outerSize(size: number) {
		this._outerSize = clampInt(size, minSize, maxSize);
	}

	get innerSize(): number {
		return this._innerSize;
	}
	set innerSize(size: number) {
		this._innerSize = clampInt(size, minSize, maxSize);
	}

	@computed get centerX(): number {
		return this.outerSize / 2;
	}

	@computed get centerY(): number {
		return this.centerX; // Same value.
	}

	protected getRightX(): number {
		return this.outerSize + this.borderWidth / 2;
	}

	protected getBottomY(): number {
		return this.getRightX(); // Same value.
	}

	protected toBaseJSON(): BaseStickControlJSON {
		const json = {
			xAxis: this.xAxis ? this.xAxis.toJSON() : undefined,
			yAxis: this.yAxis ? this.yAxis.toJSON() : undefined,
			outerSize: this.outerSize,
			innerSize: this.innerSize,
		};
		return Object.assign(json, super.toBaseJSON());
	}
}
