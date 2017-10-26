import {observable} from "mobx";
import {Direction8} from "../direction/direction8";
import {Control} from "./control";
import {ControlType, TriangleControlJSON} from "./json/control-json";

export const defaultDirection = Direction8.Up;

/**
 * A control that represents a button shaped like a triangle.
 */
export class TriangleControl extends Control {
	@observable public direction: Direction8 = defaultDirection;

	/**
	 * Returns a JSON representation of this control.
	 */
	public toJSON(): TriangleControlJSON {
		const json = {
			type: ControlType.Triangle,
			direction: this.direction,
		};
		return Object.assign(json, super.toBaseJSON()) as TriangleControlJSON;
	}
}
