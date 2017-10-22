import {observable} from "mobx";
import {ButtonReference} from "../config/button-reference";
import {clamp, clampInt} from "../math/util";
import {BaseControlJSON, ControlJSON} from "./json/control-json";
import {LabelPosition} from "./label-position";
import {LabelReplacement} from "./label-replacement";

export const maxNameLength = 100;

export const minX = 0;
export const maxX = 3839;
export const minY = 0;
export const maxY = 2159;
export const defaultPosition = 5;

export const minWidth = 1;
export const maxWidth = 3840;
export const minHeight = 1;
export const maxHeight = 2160;
export const defaultSize = 24;

export const minBorderWidth = 0;
export const maxBorderWidth = 1000;
export const defaultBorderWidth = 1.5;

/**
 * An abstract component that is shown in the display.
 */
export abstract class Control {
	@observable public button?: ButtonReference;
	@observable public nameLabel?: LabelPosition = LabelPosition.Center;
	@observable public pressesLabel?: LabelPosition;
	@observable public mashSpeedLabel?: LabelPosition | LabelReplacement = LabelReplacement.Name;
	@observable private _name: string = "";
	@observable private _x: number = defaultPosition;
	@observable private _y: number = defaultPosition;
	@observable private _width: number = defaultSize;
	@observable private _height: number = defaultSize;
	@observable private _borderWidth: number = defaultBorderWidth;

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

	get leftX(): number {
		return this.topY; // Same value.
	}

	get centerX(): number {
		return this.width / 2;
	}

	get rightX(): number {
		return this.width + this.borderWidth / 2;
	}

	get topY(): number {
		return -this.borderWidth / 2;
	}

	get centerY(): number {
		return this.height / 2;
	}

	get bottomY(): number {
		return this.height + this.borderWidth / 2;
	}

	public abstract toJSON(): ControlJSON;

	protected toBaseJSON(): BaseControlJSON {
		return {
			name: this.name,
			button: this.button ? this.button.toJSON() : undefined,
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			borderWidth: this.borderWidth,
			nameLabel: this.nameLabel,
			pressesLabel: this.pressesLabel,
			mashSpeedLabel: this.mashSpeedLabel,
		};
	}
}
