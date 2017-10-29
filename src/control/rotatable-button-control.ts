import {computed, observable} from "mobx";
import {Point, rotatePoints} from "../math/point";
import {clamp} from "../math/util";
import {ButtonControl} from "./button-control";

export const minRotation = -360;
export const maxRotation = 360;
export const defaultRotation = 0;

/**
 * An abstract control that supports being rotated. The edge positions of
 * a rotated control vary and this affects where labels will be placed.
 * Subclasses must implement getEdgePoints to return an array of points that
 * exist along the edge of the rotated control.
 */
export abstract class RotatableButtonControl extends ButtonControl {
	@observable private _rotation: number = defaultRotation;

	get rotation(): number {
		return this._rotation;
	}
	set rotation(rotation: number) {
		this._rotation = clamp(rotation, minRotation, maxRotation);
	}

	@computed get transform(): string {
		return `rotate(${this.rotation} ${this.centerX} ${this.centerY})`;
	}

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

	protected abstract getEdgePoints(): Point[];

	/**
	 * Rotates an array of points around this control's center point with its
	 * current rotation.
	 */
	protected rotatePoints(points: Point[]) {
		return rotatePoints(points, {x: this.centerX, y: this.centerY}, this.rotation);
	}
}
