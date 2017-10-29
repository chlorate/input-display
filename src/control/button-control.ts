import {computed, observable} from "mobx";
import {clampInt} from "../math/util";
import {Control} from "./control";
import {BaseButtonControlJSON} from "./json/control-json";

export const minWidth = 1;
export const maxWidth = 3840;
export const minHeight = 1;
export const maxHeight = 2160;
export const defaultSize = 24;

/**
 * An abstract control that represents a button.
 */
export abstract class ButtonControl extends Control {
	@observable private _width: number = defaultSize;
	@observable private _height: number = defaultSize;

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

	@computed get centerX(): number {
		return this.width / 2;
	}

	@computed get centerY(): number {
		return this.height / 2;
	}

	protected getRightX(): number {
		return this.width + this.borderWidth / 2;
	}

	protected getBottomY(): number {
		return this.height + this.borderWidth / 2;
	}

	protected toBaseJSON(): BaseButtonControlJSON {
		const json = {
			width: this.width,
			height: this.height,
		};
		return Object.assign(json, super.toBaseJSON());
	}
}
