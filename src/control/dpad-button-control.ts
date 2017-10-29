import {computed, observable} from "mobx";
import {Direction4} from "../direction/direction4";
import {clamp} from "../math/util";
import {ButtonControl} from "./button-control";
import {defaultRadius, maxRadius, minRadius} from "./control";
import {ControlType, DpadButtonControlJSON} from "./json/control-json";

export const defaultDirection = Direction4.Up;

// In order to draw a border around three sides of the control, stroke-dasharray
// is used. It draws a dash with no width, then a gap equal to the length of the
// side without a border, then a dash with length equal to the remaining three
// sides (or larger; it doesn't matter).
// Source: https://stackoverflow.com/q/8976791
//
// This works except Firefox (and Edge) do a terrible job of drawing the
// corners. Depending on the border width, sometimes a very pixelated corner is
// rendered. As a workaround, the stroke-dasharray gap is drawn so it very
// slightly wraps around corners by this cornerFix amount like this:
//
// .=====.               .=====.
// |     |  instead of:  |     |  Where the X's are where the gap
// X     X               |     |  begins and ends.
// |_____|               X_____X
//
// Alternatively, a line could be draw around the sides instead of a stroke.
// However, that would make this control an annoying special case for styling
// purposes as everything else uses a stroke.
const cornerFix = 0.01;

/**
 * A control that represents a d-pad button.
 */
export class DpadButtonControl extends ButtonControl {
	@observable public direction: Direction4 = defaultDirection;
	@observable private _radius: number = defaultRadius;

	get type(): string {
		return "Button (d-pad)";
	}

	get radius(): number {
		return this._radius;
	}
	set radius(radius: number) {
		this._radius = clamp(radius, minRadius, maxRadius);
	}

	@computed public get path(): string {
		// As mentioned above, paths start very slightly before the side of the
		// path without a border. This also conveniently avoids calculating the
		// length of the rest of the path as there could be rounded borders
		// which would change the length.
		//
		// The borderless edge is also not nudged so it appears sharp.
		let leftX = this.nudge;
		let rightX = this.width - this.nudge;
		let topY = this.nudge;
		let bottomY = this.height - this.nudge;
		let curveX;
		let leftCurveX;
		let rightCurveX;
		let curveY;
		let topCurveY;
		let bottomCurveY;
		switch (this.direction) {
			case Direction4.Up:
				bottomY = this.height;
				curveY = Math.min(topY + this.radius, bottomY);
				leftCurveX = Math.min(leftX + this.radius, this.centerX);
				rightCurveX = Math.max(rightX - this.radius, this.centerX);
				return (
					`M ${leftX},${bottomY - cornerFix} ` +
					`V ${bottomY} ` +
					`H ${rightX} ` +
					`V ${curveY} ` +
					`Q ${rightX},${topY} ${rightCurveX},${topY} ` +
					`H ${leftCurveX} ` +
					`Q ${leftX},${topY} ${leftX},${curveY} ` +
					`Z`
				);
			case Direction4.Right:
				leftX = 0;
				curveX = Math.max(rightX - this.radius, leftX);
				topCurveY = Math.min(topY + this.radius, this.centerY);
				bottomCurveY = Math.max(bottomY - this.radius, this.centerY);
				return (
					`M ${leftX + cornerFix},${topY} ` +
					`H ${leftX} ` +
					`V ${bottomY} ` +
					`H ${curveX} ` +
					`Q ${rightX},${bottomY} ${rightX},${bottomCurveY} ` +
					`V ${topCurveY} ` +
					`Q ${rightX},${topY} ${curveX},${topY} ` +
					`Z`
				);
			case Direction4.Down:
				topY = 0;
				curveY = Math.max(bottomY - this.radius, topY);
				leftCurveX = Math.min(leftX + this.radius, this.centerX);
				rightCurveX = Math.max(rightX - this.radius, this.centerX);
				return (
					`M ${leftX},${topY + cornerFix} ` +
					`V ${topY} ` +
					`H ${rightX} ` +
					`V ${curveY} ` +
					`Q ${rightX},${bottomY} ${rightCurveX},${bottomY} ` +
					`H ${leftCurveX} ` +
					`Q ${leftX},${bottomY} ${leftX},${curveY} ` +
					`Z`
				);
			case Direction4.Left:
				rightX = this.width;
				curveX = Math.min(leftX + this.radius, rightX);
				topCurveY = Math.min(topY + this.radius, this.centerY);
				bottomCurveY = Math.max(bottomY - this.radius, this.centerY);
				return (
					`M ${rightX - cornerFix},${topY} ` +
					`H ${rightX} ` +
					`V ${bottomY} ` +
					`H ${curveX} ` +
					`Q ${leftX},${bottomY} ${leftX},${bottomCurveY} ` +
					`V ${topCurveY} ` +
					`Q ${leftX},${topY} ${curveX},${topY} ` +
					`Z`
				);
			default:
				throw new Error("invalid direction");
		}
	}

	@computed public get strokeDashArray(): string {
		switch (this.direction) {
			case Direction4.Up:
			case Direction4.Down:
				return (
					`0 ` +
					`${cornerFix * 2 + this.width - this.nudge * 2} ` +
					`${this.height * 2 + this.width}`
				);
			case Direction4.Left:
			case Direction4.Right:
				return (
					`0 ` +
					`${cornerFix * 2 + this.height - this.nudge * 2} ` +
					`${this.width * 2 + this.height}`
				);
			default:
				throw new Error("invalid direction");
		}
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): DpadButtonControlJSON {
		const json = {
			type: ControlType.DpadButton,
			radius: this.radius,
			direction: this.direction,
		};
		return Object.assign(json, super.toBaseJSON()) as DpadButtonControlJSON;
	}
}
