import {action, observable} from "mobx";
import {Control} from "../control/control";
import {parseControlJSON} from "../control/control.factory";
import {ensureColor} from "../css/util";
import {clampIndex, clampInt} from "../math/util";
import {AxisReference} from "./axis-reference";
import {ConfigJSON, isConfigJSON} from "./json/config-json";
import {Palette} from "./palette";

// 4 ms is the smallest delay:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_>4ms
export const minPollRate = 1;
export const maxPollRate = 250;
export const defaultPollRate = 60;

export const minWidth = 32;
export const maxWidth = 3840;
export const defaultWidth = 300;
export const minHeight = 32;
export const maxHeight = 2160;
export const defaultHeight = 100;

export const maxFontNameLength = 250;
export const minFontSize = 1;
export const maxFontSize = 2000;
export const defaultFontSize = 16;

export const minMashSpeedThreshold = 1;
export const maxMashSpeedThreshold = 30;
export const defaultMashSpeedThreshold = 5;

export const minLabelOffset = -500;
export const maxLabelOffset = 500;
export const defaultLabelOffset = 0;

export const maxCustomCssLength = 1000000;

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
	@observable public fontBold: boolean = false;
	@observable public fontItalic: boolean = false;
	@observable public fontShadow: boolean = true;
	@observable private _gamepadIndex: number = 0;
	@observable private _dpadAxisIndex?: number;
	@observable private _dpadXAxis?: AxisReference;
	@observable private _dpadYAxis?: AxisReference;
	@observable private _pollRate: number = defaultPollRate;
	@observable private _displayWidth: number = defaultWidth;
	@observable private _displayHeight: number = defaultHeight;
	@observable private _fontName: string = "";
	@observable private _fontSize: number = defaultFontSize;
	@observable private _backgroundColor: string = DefaultColors.Background;
	@observable private _buttonUnpressedPalette: Palette;
	@observable private _buttonPressedPalette: Palette;
	@observable private _buttonMashingUnpressedPalette: Palette;
	@observable private _buttonMashingPressedPalette: Palette;
	@observable private _mashSpeedThreshold: number = defaultMashSpeedThreshold;
	@observable private _labelOffsetX: number = defaultLabelOffset;
	@observable private _labelOffsetY: number = defaultLabelOffset;
	@observable private _controls: Control[] = [];
	@observable private _customCss: string = "";

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

	get fontName(): string {
		return this._fontName;
	}
	set fontName(name: string) {
		this._fontName = name.substr(0, maxFontNameLength);
	}

	get fontSize(): number {
		return this._fontSize;
	}
	set fontSize(size: number) {
		this._fontSize = clampInt(size, minFontSize, maxFontSize);
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

	get mashSpeedThreshold(): number {
		return this._mashSpeedThreshold;
	}
	set mashSpeedThreshold(threshold: number) {
		this._mashSpeedThreshold = clampInt(threshold, minMashSpeedThreshold, maxMashSpeedThreshold);
	}

	get labelOffsetX(): number {
		return this._labelOffsetX;
	}
	set labelOffsetX(offset: number) {
		this._labelOffsetX = clampInt(offset, minLabelOffset, maxLabelOffset);
	}

	get labelOffsetY(): number {
		return this._labelOffsetY;
	}
	set labelOffsetY(offset: number) {
		this._labelOffsetY = clampInt(offset, minLabelOffset, maxLabelOffset);
	}

	get controls(): Control[] {
		return this._controls;
	}

	get customCss(): string {
		return this._customCss;
	}
	set customCss(css: string) {
		this._customCss = css.substr(0, maxCustomCssLength);
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
			fontName: this.fontName,
			fontBold: this.fontBold,
			fontItalic: this.fontItalic,
			fontShadow: this.fontShadow,
			fontSize: this.fontSize,
			backgroundColor: this.backgroundColor,
			buttonUnpressedPalette: this.buttonUnpressedPalette.toJSON(),
			buttonPressedPalette: this.buttonPressedPalette.toJSON(),
			buttonMashingUnpressedPalette: this.buttonMashingUnpressedPalette.toJSON(),
			buttonMashingPressedPalette: this.buttonMashingPressedPalette.toJSON(),
			mashSpeedThreshold: this.mashSpeedThreshold,
			labelOffsetX: this.labelOffsetX,
			labelOffsetY: this.labelOffsetY,
			controls: this.controls.map((control) => control.toJSON()),
			customCss: this.customCss,
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
	@action public loadJSON(json: any): void {
		if (!isConfigJSON(json)) {
			throw new TypeError("invalid config JSON");
		}

		this.gamepadIndex = json.gamepadIndex;
		this.dpadAxisIndex = json.dpadAxisIndex;
		this.pollRate = json.pollRate;
		this.displayWidth = json.displayWidth;
		this.displayHeight = json.displayHeight;
		this.displayOutline = json.displayOutline;
		this.fontName = json.fontName;
		this.fontBold = json.fontBold;
		this.fontItalic = json.fontItalic;
		this.fontShadow = json.fontShadow;
		this.fontSize = json.fontSize;
		this.backgroundColor = json.backgroundColor;
		this.buttonUnpressedPalette.loadJSON(json.buttonUnpressedPalette);
		this.buttonPressedPalette.loadJSON(json.buttonPressedPalette);
		this.buttonMashingUnpressedPalette.loadJSON(json.buttonMashingUnpressedPalette);
		this.buttonMashingPressedPalette.loadJSON(json.buttonMashingPressedPalette);
		this.mashSpeedThreshold = json.mashSpeedThreshold;
		this.labelOffsetX = json.labelOffsetX;
		this.labelOffsetY = json.labelOffsetY;
		this._controls = json.controls.map((control) => parseControlJSON(control));
		this.customCss = json.customCss;

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
	@action public setDpadDualAxes(x: AxisReference, y: AxisReference) {
		this.clearDpadMapping();
		this._dpadXAxis = x;
		this._dpadYAxis = y;
	}

	/**
	 * Clears all settings related to d-pad mappings.
	 */
	@action public clearDpadMapping() {
		this._dpadAxisIndex = undefined;
		this._dpadXAxis = undefined;
		this._dpadYAxis = undefined;
	}
}
