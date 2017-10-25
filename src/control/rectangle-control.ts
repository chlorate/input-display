import {computed, observable} from "mobx";
import {Point, rotatePoints} from "../math/point";
import {clampInt} from "../math/util";
import {Control} from "./control";
import {ControlType, RectangleControlJSON} from "./json/control-json";

export const minRotation = -360;
export const maxRotation = 360;
export const defaultRotation = 0;

/**
 * A control that represents a button shaped like a square or rectangle.
 */
export class RectangleControl extends Control {
	@observable private _rotation: number = defaultRotation;

	get rotation(): number {
		return this._rotation;
	}
	set rotation(rotation: number) {
		this._rotation = clampInt(rotation, minRotation, maxRotation);
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): RectangleControlJSON {
		const json = {
			type: ControlType.Rectangle,
			rotation: this.rotation,
		};
		return Object.assign(json, super.toBaseJSON()) as RectangleControlJSON;
	}

	// The edges of the control change position based on the control's rotation.
	// Look at the corner points after rotation to determine where the edges
	// are at.

	@computed get leftX(): number {
		return this.getEdgePoints().reduce((min, point) => Math.min(point.x, min), Infinity);
	}

	@computed get rightX(): number {
		return this.getEdgePoints().reduce((max, point) => Math.max(point.x, max), -Infinity);
	}

	@computed get topY(): number {
		return this.getEdgePoints().reduce((min, point) => Math.min(point.y, min), Infinity);
	}

	@computed get bottomY(): number {
		return this.getEdgePoints().reduce((max, point) => Math.max(point.y, max), -Infinity);
	}

	/**
	 * Returns an array of points representing the corners of the controls after
	 * rotation.
	 */
	private getEdgePoints(): Point[] {
		const points = [
			{x: this.getLeftX(), y: this.getTopY()},
			{x: this.getRightX(), y: this.getTopY()},
			{x: this.getLeftX(), y: this.getBottomY()},
			{x: this.getRightX(), y: this.getBottomY()},
		];
		return rotatePoints(points, {x: this.centerX, y: this.centerY}, this.rotation);
	}
}
