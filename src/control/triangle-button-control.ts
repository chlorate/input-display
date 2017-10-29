import {computed, observable} from "mobx";
import {Direction8} from "../direction/direction8";
import {ButtonControl} from "./button-control";
import {ControlType, TriangleButtonControlJSON} from "./json/control-json";

export const defaultDirection = Direction8.Up;

/**
 * A control that represents a button shaped like a triangle.
 */
export class TriangleButtonControl extends ButtonControl {
	@observable public direction: Direction8 = defaultDirection;

	@computed get path(): string {
		switch (this.direction) {
			case Direction8.Up:
				return (
					`M ${this.centerX},${this.nudge} ` +
					`L ${this.width - this.nudge},${this.height - this.nudge} ` +
					`H ${this.nudge} ` +
					`Z`
				);
			case Direction8.UpRight:
				return (
					`M ${this.nudge},${this.nudge} ` +
					`H ${this.width - this.nudge} ` +
					`V ${this.height - this.nudge} ` +
					`Z`
				);
			case Direction8.Right:
				return (
					`M ${this.nudge},${this.height - this.nudge} ` +
					`V ${this.nudge} ` +
					`L ${this.width - this.nudge},${this.centerY} ` +
					`Z`
				);
			case Direction8.DownRight:
				return (
					`M ${this.width - this.nudge},${this.nudge} ` +
					`V ${this.height - this.nudge} ` +
					`H ${this.nudge} ` +
					`Z`
				);
			case Direction8.Down:
				return (
					`M ${this.centerX},${this.height - this.nudge} ` +
					`L ${this.nudge},${this.nudge} ` +
					`H ${this.width - this.nudge} ` +
					`Z`
				);
			case Direction8.DownLeft:
				return (
					`M ${this.nudge},${this.nudge} ` +
					`V ${this.height - this.nudge} ` +
					`H ${this.width - this.nudge} ` +
					`Z`
				);
			case Direction8.Left:
				return (
					`M ${this.nudge},${this.centerY} ` +
					`L ${this.width - this.nudge},${this.nudge} ` +
					`V ${this.height - this.nudge} ` +
					`Z`
				);
			case Direction8.UpLeft:
				return (
					`M ${this.nudge},${this.height - this.nudge} ` +
					`V ${this.nudge} ` +
					`H ${this.width - this.nudge} ` +
					`Z`
				);
			default:
				throw new Error("invalid direction");
		}
	}

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): TriangleButtonControlJSON {
		const json = {
			type: ControlType.Triangle,
			direction: this.direction,
		};
		return Object.assign(json, super.toBaseJSON()) as TriangleButtonControlJSON;
	}
}
