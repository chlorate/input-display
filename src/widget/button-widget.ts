import {observable} from "mobx";
import {ButtonReference} from "../config/button-reference";
import {NormalButtonReference} from "../config/normal-button-reference";
import {clamp, clampInt} from "../math/util";
import {maxBorderWidth, maxHeight, maxWidth, minBorderWidth, minHeight, minWidth, Widget} from "./widget";

/**
 * An abstract widget that represents a button.
 */
export abstract class ButtonWidget extends Widget {
	public button: ButtonReference;
	@observable private _width: number = 20;
	@observable private _height: number = 20;
	@observable private _borderWidth: number = 1.5;

	constructor() {
		super();
		this.button = new NormalButtonReference(0);
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
}
