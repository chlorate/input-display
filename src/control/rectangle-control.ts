import {observable} from "mobx";
import {Point} from "../math/point";
import {clamp} from "../math/util";
import {defaultBorderRadius, maxBorderRadius, minBorderRadius} from "./control";
import {ControlType, RectangleControlJSON} from "./json/control-json";
import {RotatableControl} from "./rotatable-control";

/**
 * A control that represents a button shaped like a square or rectangle.
 */
export class RectangleControl extends RotatableControl {
	@observable private _topBorderRadius: number = defaultBorderRadius;
	@observable private _bottomBorderRadius: number = defaultBorderRadius;

	get topBorderRadius(): number {
		return this._topBorderRadius;
	}
	set topBorderRadius(radius: number) {
		this._topBorderRadius = clamp(radius, minBorderRadius, maxBorderRadius);
	}

	get bottomBorderRadius(): number {
		return this._bottomBorderRadius;
	}
	set bottomBorderRadius(radius: number) {
		this._bottomBorderRadius = clamp(radius, minBorderRadius, maxBorderRadius);
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): RectangleControlJSON {
		const json = {
			type: ControlType.Rectangle,
			topBorderRadius: this.topBorderRadius,
			bottomBorderRadius: this.bottomBorderRadius,
			rotation: this.rotation,
		};
		return Object.assign(json, super.toBaseJSON()) as RectangleControlJSON;
	}

	/**
	 * Returns an array of points for the corners of the rectangle.
	 */
	protected getEdgePoints(): Point[] {
		return this.rotatePoints([
			{x: this.getLeftX(), y: this.getTopY()},
			{x: this.getRightX(), y: this.getTopY()},
			{x: this.getLeftX(), y: this.getBottomY()},
			{x: this.getRightX(), y: this.getBottomY()},
		]);
	}
}
