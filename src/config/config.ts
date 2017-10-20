import {observable} from "mobx";
import {ensureColor} from "../css/util";
import {clampIndex, clampInt} from "../math/util";
import {Widget} from "../widget/widget";
import {parseWidgetJSON} from "../widget/widget.factory";
import {AxisReference} from "./axis-reference";
import {ConfigJSON, isConfigJSON} from "./json/config-json";
import {Palette} from "./palette";

// 4 ms is the smallest delay:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_>4ms
export const minPollRate = 1;
export const maxPollRate = 250;

export const minWidth = 32;
export const maxWidth = 3840;
export const minHeight = 32;
export const maxHeight = 2160;

export enum DefaultColors {
	Background = "#000000",
	ButtonUnpressedBorder = "#565f67",
	ButtonUnpressedFill = "#1c1f21",
	ButtonUnpressedLabel = "#565f67",
	ButtonPressedBorder = "#469fef",
	ButtonPressedFill = "#0e5280",
	ButtonPressedLabel = "#b8ddff",
	ButtonMashingUnpressedBorder = "#7b6f67",
	ButtonMashingUnpressedFill = "#312d2a",
	ButtonMashingUnpressedLabel = "#7b6f67",
	ButtonMashingPressedBorder = "#ef8b48",
	ButtonMashingPressedFill = "#813c0e",
	ButtonMashingPressedLabel = "#ffd4b8",
}

/**
 * Stores all settings related to the controller and input display.
 */
export class Config {
	@observable public displayOutline: boolean = false;
	@observable private _gamepadIndex: number = 0;
	@observable private _dpadAxisIndex?: number;
	@observable private _dpadXAxis?: AxisReference;
	@observable private _dpadYAxis?: AxisReference;
	@observable private _pollRate: number = 60;
	@observable private _displayWidth: number = 300;
	@observable private _displayHeight: number = 100;
	@observable private _backgroundColor: string = DefaultColors.Background;
	@observable private _buttonUnpressedPalette: Palette;
	@observable private _buttonPressedPalette: Palette;
	@observable private _buttonMashingUnpressedPalette: Palette;
	@observable private _buttonMashingPressedPalette: Palette;
	@observable private _widgets: Widget[] = [];

	constructor() {
		this._buttonUnpressedPalette = new Palette(
			DefaultColors.ButtonUnpressedBorder,
			DefaultColors.ButtonUnpressedFill,
			DefaultColors.ButtonUnpressedLabel,
		);
		this._buttonPressedPalette = new Palette(
			DefaultColors.ButtonPressedBorder,
			DefaultColors.ButtonPressedFill,
			DefaultColors.ButtonPressedLabel,
		);
		this._buttonMashingUnpressedPalette = new Palette(
			DefaultColors.ButtonMashingUnpressedBorder,
			DefaultColors.ButtonMashingUnpressedFill,
			DefaultColors.ButtonMashingUnpressedLabel,
		);
		this._buttonMashingPressedPalette = new Palette(
			DefaultColors.ButtonMashingPressedBorder,
			DefaultColors.ButtonMashingPressedFill,
			DefaultColors.ButtonMashingPressedLabel,
		);
	}

	get gamepadIndex(): number {
		return this._gamepadIndex;
	}
	set gamepadIndex(gamepadIndex: number) {
		this._gamepadIndex = clampIndex(gamepadIndex);
	}

	get dpadAxisIndex(): number | undefined {
		return this._dpadAxisIndex;
	}
	set dpadAxisIndex(index: number | undefined) {
		if (index === undefined) {
			this._dpadAxisIndex = undefined;
		} else {
			this.clearDpadMapping();
			this._dpadAxisIndex = clampIndex(index);
		}
	}

	get dpadXAxis(): AxisReference | undefined {
		return this._dpadXAxis;
	}

	get dpadYAxis(): AxisReference | undefined {
		return this._dpadYAxis;
	}

	get pollRate(): number {
		return this._pollRate;
	}
	set pollRate(pollRate: number) {
		this._pollRate = clampInt(pollRate, minPollRate, maxPollRate);
	}

	get displayWidth(): number {
		return this._displayWidth;
	}
	set displayWidth(width: number) {
		this._displayWidth = clampInt(width, minWidth, maxWidth);
	}

	get displayHeight(): number {
		return this._displayHeight;
	}
	set displayHeight(height: number) {
		this._displayHeight = clampInt(height, minHeight, maxHeight);
	}

	get backgroundColor(): string {
		return this._backgroundColor;
	}
	set backgroundColor(color: string) {
		this._backgroundColor = ensureColor(color, DefaultColors.Background);
	}

	get buttonUnpressedPalette(): Palette {
		return this._buttonUnpressedPalette;
	}

	get buttonPressedPalette(): Palette {
		return this._buttonPressedPalette;
	}

	get buttonMashingUnpressedPalette(): Palette {
		return this._buttonMashingUnpressedPalette;
	}

	get buttonMashingPressedPalette(): Palette {
		return this._buttonMashingPressedPalette;
	}

	get widgets(): Widget[] {
		return this._widgets;
	}

	/**
	 * Returns a JSON representation of this config.
	 */
	public toJSON(): ConfigJSON {
		const json: ConfigJSON = {
			gamepadIndex: this.gamepadIndex,
			dpadAxisIndex: this.dpadAxisIndex,
			pollRate: this.pollRate,
			displayWidth: this.displayWidth,
			displayHeight: this.displayHeight,
			displayOutline: this.displayOutline,
			backgroundColor: this.backgroundColor,
			buttonUnpressedPalette: this.buttonUnpressedPalette.toJSON(),
			buttonPressedPalette: this.buttonPressedPalette.toJSON(),
			buttonMashingUnpressedPalette: this.buttonMashingUnpressedPalette.toJSON(),
			buttonMashingPressedPalette: this.buttonMashingPressedPalette.toJSON(),
			widgets: this.widgets.map((widget) => widget.toJSON()),
		};
		if (this.dpadXAxis && this.dpadYAxis) {
			json.dpadXAxis = this.dpadXAxis.toJSON();
			json.dpadYAxis = this.dpadYAxis.toJSON();
		}
		return json;
	}

	/**
	 * Assigns properties from a JSON representation of a config object.
	 */
	public loadJSON(json: any): void {
		if (!isConfigJSON(json)) {
			throw new TypeError("invalid config JSON");
		}

		this.gamepadIndex = json.gamepadIndex;
		this.dpadAxisIndex = json.dpadAxisIndex;
		this.pollRate = json.pollRate;
		this.displayWidth = json.displayWidth;
		this.displayHeight = json.displayHeight;
		this.displayOutline = json.displayOutline;
		this.backgroundColor = json.backgroundColor;
		this.buttonUnpressedPalette.loadJSON(json.buttonUnpressedPalette);
		this.buttonPressedPalette.loadJSON(json.buttonPressedPalette);
		this.buttonMashingUnpressedPalette.loadJSON(json.buttonMashingUnpressedPalette);
		this.buttonMashingPressedPalette.loadJSON(json.buttonMashingPressedPalette);
		this._widgets = json.widgets.map((widget) => parseWidgetJSON(widget));

		if (json.dpadXAxis && json.dpadYAxis) {
			this.setDpadDualAxes(
				AxisReference.fromJSON(json.dpadXAxis),
				AxisReference.fromJSON(json.dpadYAxis),
			);
		}
	}

	/**
	 * Sets settings related to the d-pad dual axes mapping and clears all other
	 * d-pad mapping settings to ensure only the one mapping is used.
	 */
	public setDpadDualAxes(x: AxisReference, y: AxisReference) {
		this.clearDpadMapping();
		this._dpadXAxis = x;
		this._dpadYAxis = y;
	}

	/**
	 * Clears all settings related to d-pad mappings.
	 */
	public clearDpadMapping() {
		this._dpadAxisIndex = undefined;
		this._dpadXAxis = undefined;
		this._dpadYAxis = undefined;
	}
}
