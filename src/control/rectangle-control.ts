import {observable} from "mobx";
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
}
