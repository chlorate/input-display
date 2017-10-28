import {computed, observable} from "mobx";
import {Point} from "../math/point";
import {clamp} from "../math/util";
import {defaultRadius, maxRadius, minRadius} from "./control";
import {ControlType, RectangleControlJSON} from "./json/control-json";
import {RotatableControl} from "./rotatable-control";

/**
 * A control that represents a button shaped like a square or rectangle.
 */
export class RectangleControl extends RotatableControl {
	@observable private _topRadius: number = defaultRadius;
	@observable private _bottomRadius: number = defaultRadius;

	get topRadius(): number {
		return this._topRadius;
	}
	set topRadius(radius: number) {
		this._topRadius = clamp(radius, minRadius, maxRadius);
	}

	get bottomRadius(): number {
		return this._bottomRadius;
	}
	set bottomRadius(radius: number) {
		this._bottomRadius = clamp(radius, minRadius, maxRadius);
	}

	@computed public get path(): string {
		const leftX = this.nudge;
		const rightX = this.width - this.nudge;
		const topY = this.nudge;
		const bottomY = this.height - this.nudge;
		const topLeftCurveX = Math.min(leftX + this.topRadius, this.centerX);
		const topRightCurveX = Math.max(rightX - this.topRadius, this.centerX);
		const bottomLeftCurveX = Math.min(leftX + this.bottomRadius, this.centerX);
		const bottomRightCurveX = Math.max(rightX - this.bottomRadius, this.centerX);

		let topCurveY = Math.min(topY + this.topRadius, bottomY);
		let bottomCurveY = Math.max(bottomY - this.bottomRadius, topY);
		if (topCurveY > bottomCurveY) {
			// If the sum of both radii is larger than the height of the
			// rectangle's sides, then scale the radii down proportionally so
			// they meet at the same point.
			//
			// For example, if the height is 5, top radius is 20, and bottom
			// radius is 30, then the curves should meet at about y = 2 (or ~20%
			// down).
			const height = bottomY - topY;
			const totalRadius = this.topRadius + this.bottomRadius;
			const scaledTopRadius = height * this.topRadius / totalRadius;
			const scaledBottomRadius = height * this.bottomRadius / totalRadius;
			topCurveY = Math.min(topY + scaledTopRadius, bottomY);
			bottomCurveY = Math.max(bottomY - scaledBottomRadius, topY);
		}

		return (
			`M ${leftX},${topCurveY} ` +
			`Q ${leftX},${topY} ${topLeftCurveX},${topY} ` +
			`H ${topRightCurveX} ` +
			`Q ${rightX},${topY} ${rightX},${topCurveY} ` +
			`V ${bottomCurveY} ` +
			`Q ${rightX},${bottomY} ${bottomRightCurveX},${bottomY} ` +
			`H ${bottomLeftCurveX} ` +
			`Q ${leftX},${bottomY} ${leftX},${bottomCurveY} ` +
			`Z`
		);
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): RectangleControlJSON {
		const json = {
			type: ControlType.Rectangle,
			topRadius: this.topRadius,
			bottomRadius: this.bottomRadius,
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
