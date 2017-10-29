import {computed, observable} from "mobx";
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

export const minBorderWidth = 0;
export const maxBorderWidth = 1000;
export const defaultBorderWidth = 1.25;

export const minRadius = 0;
export const maxRadius = 1000;
export const defaultRadius = 0;

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
	@observable private _borderWidth: number = defaultBorderWidth;

	abstract get type(): string;

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

	get borderWidth(): number {
		return this._borderWidth;
	}
	set borderWidth(width: number) {
		this._borderWidth = clamp(width, minBorderWidth, maxBorderWidth);
	}

	@computed get nudge(): number {
		// Improves sharpness of odd border widths (particularly 1px) by
		// aligning the border with the pixel grid. Gradually increases from
		// 0 to 0.5 for odd integer widths then back down to 0 for even integer
		// widths.
		const nudge = this.borderWidth % 2 / 2;
		return nudge > 0.5 ? 1 - nudge : nudge;
	}

	@computed get leftX(): number {
		return this.getLeftX();
	}

	public abstract get centerX(): number;
	public abstract get rightX(): number;

	@computed get topY(): number {
		return this.getTopY();
	}

	public abstract get centerY(): number;
	public abstract get bottomY(): number;

	public abstract toJSON(): ControlJSON;

	// These protected getters are for RotatedControl so it has access to the
	// unrotated edge positions.

	protected getLeftX(): number {
		return this.getTopY(); // Same value.
	}

	protected abstract getRightX(): number;

	protected getTopY(): number {
		return -this.borderWidth / 2;
	}

	protected abstract getBottomY(): number;

	protected toBaseJSON(): BaseControlJSON {
		return {
			name: this.name,
			button: this.button ? this.button.toJSON() : undefined,
			x: this.x,
			y: this.y,
			borderWidth: this.borderWidth,
			nameLabel: this.nameLabel,
			pressesLabel: this.pressesLabel,
			mashSpeedLabel: this.mashSpeedLabel,
		};
	}
}
