import {observable} from "mobx";
import {clampInt} from "../math/util";
import {WidgetJSON} from "./json/widget-json";

export const maxNameLength = 100;

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
	public showName: boolean = true;
	public showPresses: boolean = false;
	public showMashSpeed: boolean = true;
	@observable private _name: string = "";
	@observable private _x: number = 0;
	@observable private _y: number = 0;

	get name(): string {
		return this._name;
	}
	set name(name: string) {
		this._name = name.substr(0, maxNameLength);
	}

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
