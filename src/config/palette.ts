import {observable} from "mobx";
import {ensureColor} from "../css/util";
import {PaletteJSON} from "./json/palette-json";

/**
 * Defines a palette of control colors for a particular button state.
 */
export class Palette {
	@observable private _border: string;
	@observable private _fill: string;
	@observable private _label: string;
	private _defaultBorder: string;
	private _defaultFill: string;
	private _defaultLabel: string;

	constructor(defaultBorder: string, defaultFill: string, defaultLabel: string) {
		this._border = this._defaultBorder = defaultBorder;
		this._fill = this._defaultFill = defaultFill;
		this._label = this._defaultLabel = defaultLabel;
	}

	get border(): string {
		return this._border;
	}
	set border(border: string) {
		this._border = ensureColor(border, this.defaultBorder);
	}

	get fill(): string {
		return this._fill;
	}
	set fill(fill: string) {
		this._fill = ensureColor(fill, this.defaultFill);
	}

	get label(): string {
		return this._label;
	}
	set label(label: string) {
		this._label = ensureColor(label, this.defaultLabel);
	}

	get defaultBorder(): string {
		return this._defaultBorder;
	}

	get defaultFill(): string {
		return this._defaultFill;
	}

	get defaultLabel(): string {
		return this._defaultLabel;
	}

	/**
	 * Returns a JSON representation of this palette.
	 */
	public toJSON(): PaletteJSON {
		return {
			border: this.border,
			fill: this.fill,
			label: this.label,
		};
	}

	/**
	 * Assigns properties from a JSON representation of a palette.
	 */
	public loadJSON(json: PaletteJSON): void {
		this.border = json.border;
		this.fill = json.fill;
		this.label = json.label;
	}
}
