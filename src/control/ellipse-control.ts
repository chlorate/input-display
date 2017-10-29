import {Point} from "../math/point";
import {ControlType, EllipseControlJSON} from "./json/control-json";
import {RotatableButtonControl} from "./rotatable-button-control";

/**
 * A control that represents a button shaped like a circle or ellipse.
 */
export class EllipseControl extends RotatableButtonControl {
	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): EllipseControlJSON {
		const json = {
			type: ControlType.Ellipse,
			rotation: this.rotation,
		};
		return Object.assign(json, super.toBaseJSON()) as EllipseControlJSON;
	}

	/**
	 * Returns an array of points roughly around the edge of the ellipse.
	 */
	protected getEdgePoints(): Point[] {
		// Every 45 degrees is good enough.
		const radiusX = this.width / 2 + this.borderWidth / 2;
		const radiusY = this.height / 2 + this.borderWidth / 2;
		const points: Point[] = [];
		for (let i = 1; i <= 8; i++) {
			points.push({
				x: Math.cos(i * Math.PI / 4) * radiusX + this.centerX,
				y: Math.sin(i * Math.PI / 4) * radiusY + this.centerY,
			});
		}
		if (this.width === this.height) {
			// Edges don't move when rotated if this is a circle.
			return points;
		}
		return this.rotatePoints(points);
	}
}
