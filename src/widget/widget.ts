import {observable} from "mobx";
import {ButtonReference} from "../config/button-reference";
import {clamp, clampInt} from "../math/util";
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
	@observable public button?: ButtonReference;
	@observable public showName: boolean = true;
	@observable public showPresses: boolean = false;
	@observable public showMashSpeed: boolean = true;
	@observable private _name: string = "";
	@observable private _x: number = 5;
	@observable private _y: number = 5;
	@observable private _width: number = 24;
	@observable private _height: number = 24;
	@observable private _borderWidth: number = 1.5;

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

	get width(): number {
		return this._width;
	}
	set width(width: number) {
		this._width = clampInt(width, minWidth, maxWidth);
	}

	get height(): number {
		return this._height;
	}
	set height(height: number) {
		this._height = clampInt(height, minHeight, maxHeight);
	}

	get borderWidth(): number {
		return this._borderWidth;
	}
	set borderWidth(width: number) {
		this._borderWidth = clamp(width, minBorderWidth, maxBorderWidth);
	}

	get centerX(): number {
		return this.width / 2;
	}

	get centerY(): number {
		return this.height / 2;
	}

	public abstract toJSON(): WidgetJSON;
}
