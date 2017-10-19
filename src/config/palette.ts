import {observable} from "mobx";

/**
 * Defines a palette of widget colors for a particular button state.
 */
export class Palette {
	@observable private _border: string;
	@observable private _fill: string;
	@observable private _label: string;
	private defaultBorder: string;
	private defaultFill: string;
	private defaultLabel: string;

	constructor(defaultBorder: string, defaultFill: string, defaultLabel: string) {
		this._border = this.defaultBorder = defaultBorder;
		this._fill = this.defaultFill = defaultFill;
		this._label = this.defaultLabel = defaultLabel;
	}

	get border(): string {
		return this._border;
	}
	set border(border: string) {
		// TODO: validate color or reset to default
		this._border = border;
	}

	get fill(): string {
		return this._fill;
	}
	set fill(fill: string) {
		this._fill = fill;
	}

	get label(): string {
		return this._label;
	}
	set label(label: string) {
		this._label = label;
	}
}
