import {action, observable} from "mobx";
import {ensureColor} from "../css/util";
import {ButtonPaletteJSON} from "./json/button-palette-json";
import {Palette} from "./palette";

/**
 * Defines a palette of control colors for a particular button state.
 */
export class ButtonPalette extends Palette {
	@observable private _label: string;
	private _defaultLabel: string;

	constructor(defaultBorder: string, defaultFill: string, defaultLabel: string) {
		super(defaultBorder, defaultFill);
		this._label = this._defaultLabel = defaultLabel;
	}

	get label(): string {
		return this._label;
	}
	set label(label: string) {
		this._label = ensureColor(label, this.defaultLabel);
	}

	get defaultLabel(): string {
		return this._defaultLabel;
	}

	/**
	 * Returns a JSON representation of this palette.
	 */
	public toJSON(): ButtonPaletteJSON {
		return Object.assign({label: this.label}, super.toJSON());
	}

	/**
	 * Assigns properties from a JSON representation of a palette.
	 */
	@action public loadJSON(json: ButtonPaletteJSON): void {
		super.loadJSON(json);
		this.label = json.label;
	}
}
