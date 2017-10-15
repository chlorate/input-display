import {observable} from "mobx";
import {clamp, clampInt} from "../math/util";
import {ButtonReference} from "./button-reference";
import {CircleButtonWidgetJSON} from "./json/circle-button-widget-json";
import {WidgetType} from "./json/widget-json";
import {NormalButtonReference} from "./normal-button-reference";
import {maxBorderWidth, maxHeight, maxWidth, minBorderWidth, minHeight, minWidth, Widget} from "./widget";
import {parseButtonReferenceJSON} from "./button-reference.factory";

/**
 * A widget that represents a button shaped like a circle or ellipse.
 */
export class CircleButtonWidget extends Widget {
	/**
	 * Creates a widget from its JSON representation.
	 */
	public static fromJSON(json: CircleButtonWidgetJSON): CircleButtonWidget {
		const widget = new CircleButtonWidget();
		widget.x = json.x;
		widget.y = json.y;
		widget.width = json.width;
		widget.height = json.height;
		widget.borderWidth = json.borderWidth;
		widget.button = parseButtonReferenceJSON(json.button);
		return widget;
	}

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

	get centerX(): number {
		return this._width / 2;
	}

	get centerY(): number {
		return this._height / 2;
	}

	/**
	 * Returns a JSON representation of this widget.
	 */
	public toJSON(): CircleButtonWidgetJSON {
		return {
			type: WidgetType.CircleButton,
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			borderWidth: this.borderWidth,
			button: this.button.toJSON(),
		};
	}
}
