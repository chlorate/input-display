import {observable} from "mobx";
import {clampIndex, clampInt} from "../math/util";
import {CircleButtonWidget} from "../widget/circle-button-widget";
import {WidgetType} from "../widget/json/widget-json";
import {Widget} from "../widget/widget";
import {AxisReference} from "./axis-reference";
import {ConfigJSON, isConfigJSON} from "./json/config-json";

// 4 ms is the smallest delay:
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_>4ms
export const minPollRate = 1;
export const maxPollRate = 250;

export const minWidth = 32;
export const maxWidth = 3840;
export const minHeight = 32;
export const maxHeight = 2160;

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
	@observable private _widgets: Widget[] = [];

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
		this._widgets = json.widgets.map((widget) => {
			switch (widget.type) {
				case WidgetType.CircleButton:
					return CircleButtonWidget.fromJSON(widget);
			}
		});

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
