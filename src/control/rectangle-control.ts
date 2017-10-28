import {computed, observable} from "mobx";
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

	@computed public get path(): string {
		const leftX = this.nudge;
		const rightX = this.width - this.nudge;
		const topY = this.nudge;
		const bottomY = this.height - this.nudge;
		const topLeftCurveX = Math.min(leftX + this.topBorderRadius, this.centerX);
		const topRightCurveX = Math.max(rightX - this.topBorderRadius, this.centerX);
		const bottomLeftCurveX = Math.min(leftX + this.bottomBorderRadius, this.centerX);
		const bottomRightCurveX = Math.max(rightX - this.bottomBorderRadius, this.centerX);

		let topCurveY = Math.min(topY + this.topBorderRadius, bottomY);
		let bottomCurveY = Math.max(bottomY - this.bottomBorderRadius, topY);
		if (topCurveY > bottomCurveY) {
			// If the sum of both radii is larger than the height of the
			// rectangle's sides, then scale the radii down proportionally so
			// they meet at the same point.
			//
			// For example, if the height is 5, top radius is 20, and bottom
			// radius is 30, then the curves should meet at about y = 2 (or ~20%
			// down).
			const height = bottomY - topY;
			const totalRadius = this.topBorderRadius + this.bottomBorderRadius;
			const scaledTopRadius = height * this.topBorderRadius / totalRadius;
			const scaledBottomRadius = height * this.bottomBorderRadius / totalRadius;
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
