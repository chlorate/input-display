import {computed, observable} from "mobx";
import {AxisReference} from "../config/axis-reference";
import {Controller} from "../controller/controller";
import {clamp, clampInt} from "../math/util";
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

	/**
	 * Returns the x-position of the center of the inner circle.
	 */
	public getInnerX(controller: Controller): number {
		return this.getInnerPosition(controller, this.xAxis, this.centerX);
	}

	/**
	 * Returns the y-position of the center of the inner circle.
	 */
	public getInnerY(controller: Controller): number {
		return this.getInnerPosition(controller, this.yAxis, this.centerY);
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

	/**
	 * Returns an X or Y position of the inner circle based on the current value
	 * of an axis. Defaults to the center if no valid axis is referenced.
	 */
	private getInnerPosition(
		controller: Controller,
		reference: AxisReference | undefined,
		center: number,
	): number {
		if (!reference) {
			return center;
		}

		const axis = reference.resolve(controller);
		if (!axis || axis.neutralValue === undefined) {
			return center;
		}

		let shiftPercent = 0;
		if (axis.minValue !== undefined && axis.value < axis.neutralValue) {
			shiftPercent =
				-(axis.value - axis.neutralValue) /
				(axis.minValue - axis.neutralValue);
		}
		if (axis.maxValue !== undefined && axis.value > axis.neutralValue) {
			shiftPercent =
				(axis.value - axis.neutralValue) /
				(axis.maxValue - axis.neutralValue);
		}
		if (reference.inverted) {
			shiftPercent *= -1;
		}

		const maxShift = Math.max(
			this.outerSize / 2 - this.innerSize / 4,
			this.outerSize / 4,
		);
		return center + maxShift * clamp(shiftPercent, -1, 1);
	}
}
