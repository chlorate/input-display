import {Point, rotatePoints} from "../math/point";
import {ControlType, RectangleControlJSON} from "./json/control-json";
import {RotatableControl} from "./rotatable-control";

/**
 * A control that represents a button shaped like a square or rectangle.
 */
export class RectangleControl extends RotatableControl {
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

	/**
	 * Returns an array of points representing the corners of the controls after
	 * rotation.
	 */
	protected getEdgePoints(): Point[] {
		const points = [
			{x: this.getLeftX(), y: this.getTopY()},
			{x: this.getRightX(), y: this.getTopY()},
			{x: this.getLeftX(), y: this.getBottomY()},
			{x: this.getRightX(), y: this.getBottomY()},
		];
		return rotatePoints(points, {x: this.centerX, y: this.centerY}, this.rotation);
	}
}
