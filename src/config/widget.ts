import {observable} from "mobx";
import {clampInt} from "../math/util";
import {WidgetJSON} from "./json/widget-json";

export const minX = 0;
export const maxX = 3839;
export const minY = 0;
export const maxY = 2159;

export const minWidth = 1;
export const maxWidth = 3840;
export const minHeight = 1;
export const maxHeight = 2160;

export const minBorderWidth = 0;
export const maxBorderWidth = 1000;

/**
 * An abstract component that is shown in the display.
 */
export abstract class Widget {
	@observable private _x: number = 0;
	@observable private _y: number = 0;

	get x(): number {
		return this._x;
	}
	set x(x: number) {
		this._x = clampInt(x, minX, maxX);
	}

	get y(): number {
		return this._y;
	}
	set y(y: number) {
		this._y = clampInt(y, minY, maxY);
	}

	public abstract toJSON(): WidgetJSON;
}
