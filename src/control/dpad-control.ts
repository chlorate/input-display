import {computed, observable} from "mobx";
import {Direction4} from "../direction/direction4";
import {Control} from "./control";
import {ControlType, DpadControlJSON} from "./json/control-json";

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
export class DpadControl extends Control {
	@observable public direction: Direction4 = defaultDirection;

	@computed public get path(): string {
		// TODO: test
		// As mentioned above, paths start very slightly before the side of the
		// path without a border. This also conveniently avoids calculating the
		// length of the rest of the path as there could be rounded borders
		// which would change the length.
		//
		// The borderless edge is also not nudged so it appears sharp.
		switch (this.direction) {
			case Direction4.Up:
				return (
					`M ${this.nudge},${this.height - cornerFix} ` +
					`V ${this.height} ` +
					`H ${this.width - this.nudge} ` +
					`V ${this.nudge} ` +
					`H ${this.nudge} ` +
					`Z`
				);
			case Direction4.Right:
				return (
					`M ${cornerFix},${this.nudge} ` +
					`H 0 ` +
					`V ${this.height - this.nudge} ` +
					`H ${this.width - this.nudge} ` +
					`V ${this.nudge} ` +
					`Z`
				);
			case Direction4.Down:
				return (
					`M ${this.nudge},${cornerFix} ` +
					`V 0 ` +
					`H ${this.width - this.nudge} ` +
					`V ${this.height - this.nudge} ` +
					`H ${this.nudge} ` +
					`Z`
				);
			case Direction4.Left:
				return (
					`M ${this.width - cornerFix},${this.nudge} ` +
					`H ${this.width} ` +
					`V ${this.height - this.nudge} ` +
					`H ${this.nudge} ` +
					`V ${this.nudge} ` +
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
	public toJSON(): DpadControlJSON {
		const json = {
			type: ControlType.Dpad,
			direction: this.direction,
		};
		return Object.assign(json, super.toBaseJSON()) as DpadControlJSON;
	}
}
