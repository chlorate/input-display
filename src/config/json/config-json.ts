import {ControlJSON, isControlJSON} from "../../control/json/control-json";
import {AxisReferenceJSON, isAxisReferenceJSON} from "./axis-reference-json";
import {ButtonPaletteJSON, isButtonPaletteJSON} from "./button-palette-json";
import {isPaletteJSON, PaletteJSON} from "./palette-json";

/**
 * A JSON representation of a Config object.
 */
export interface ConfigJSON {
	gamepadIndex: number;
	dpadAxisIndex?: number;
	dpadXAxis?: AxisReferenceJSON;
	dpadYAxis?: AxisReferenceJSON;
	pollRate: number;
	displayWidth: number;
	displayHeight: number;
	displayOutline: boolean;
	fontName: string;
	fontBold: boolean;
	fontItalic: boolean;
	fontShadow: boolean;
	fontSize: number;
	backgroundColor: string;
	buttonUnpressedPalette: ButtonPaletteJSON;
	buttonPressedPalette: ButtonPaletteJSON;
	buttonMashingUnpressedPalette: ButtonPaletteJSON;
	buttonMashingPressedPalette: ButtonPaletteJSON;
	axisNeutralPalette: PaletteJSON;
	axisMovedPalette: PaletteJSON;
	mashSpeedThreshold: number;
	labelOffsetX: number;
	labelOffsetY: number;
	controls: ControlJSON[];
	customCss: string;
}

/**
 * Returns true if some value is a valid ConfigJSON object.
 */
export function isConfigJSON(input: any): input is ConfigJSON {
	return (
		typeof input === "object" &&
		typeof input.gamepadIndex === "number" &&
		(input.dpadAxisIndex === undefined || typeof input.dpadAxisIndex === "number") &&
		(input.dpadXAxis === undefined || isAxisReferenceJSON(input.dpadXAxis)) &&
		(input.dpadYAxis === undefined || isAxisReferenceJSON(input.dpadYAxis)) &&
		typeof input.pollRate === "number" &&
		typeof input.displayWidth === "number" &&
		typeof input.displayHeight === "number" &&
		typeof input.displayOutline === "boolean" &&
		typeof input.fontName === "string" &&
		typeof input.fontBold === "boolean" &&
		typeof input.fontItalic === "boolean" &&
		typeof input.fontShadow === "boolean" &&
		typeof input.fontSize === "number" &&
		typeof input.backgroundColor === "string" &&
		isButtonPaletteJSON(input.buttonUnpressedPalette) &&
		isButtonPaletteJSON(input.buttonPressedPalette) &&
		isButtonPaletteJSON(input.buttonMashingUnpressedPalette) &&
		isButtonPaletteJSON(input.buttonMashingPressedPalette) &&
		isPaletteJSON(input.axisNeutralPalette) &&
		isPaletteJSON(input.axisMovedPalette) &&
		typeof input.mashSpeedThreshold === "number" &&
		typeof input.labelOffsetX === "number" &&
		typeof input.labelOffsetY === "number" &&
		typeof input.customCss === "string" &&
		Array.isArray(input.controls) && input.controls.every((control) => isControlJSON(control))
	);
}
