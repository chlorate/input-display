import {action, observable} from "mobx";
import {ensureColor} from "../css/util";
import {PaletteJSON} from "./json/palette-json";

/**
 * Defines a palette of control colors for some state.
 */
export class Palette {
	@observable private _border: string;
	@observable private _fill: string;
	private _defaultBorder: string;
	private _defaultFill: string;

	constructor(defaultBorder: string, defaultFill: string) {
		this._border = this._defaultBorder = defaultBorder;
		this._fill = this._defaultFill = defaultFill;
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

	get defaultBorder(): string {
		return this._defaultBorder;
	}

	get defaultFill(): string {
		return this._defaultFill;
	}

	/**
	 * Returns a JSON representation of this palette.
	 */
	public toJSON(): PaletteJSON {
		return {
			border: this.border,
			fill: this.fill,
		};
	}

	/**
	 * Assigns properties from a JSON representation of a palette.
	 */
	@action public loadJSON(json: PaletteJSON): void {
		this.border = json.border;
		this.fill = json.fill;
	}
}
