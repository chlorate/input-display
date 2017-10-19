import {observable} from "mobx";
import {ensureColor} from "../css/util";

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
}
