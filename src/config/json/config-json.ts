import {isWidgetJSON, WidgetJSON} from "../../widget/json/widget-json";
import {AxisReferenceJSON, isAxisReferenceJSON} from "./axis-reference-json";
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
	buttonUnpressedPalette: PaletteJSON;
	buttonPressedPalette: PaletteJSON;
	buttonMashingUnpressedPalette: PaletteJSON;
	buttonMashingPressedPalette: PaletteJSON;
	mashSpeedThreshold: number;
	widgets: WidgetJSON[];
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
		isPaletteJSON(input.buttonUnpressedPalette) &&
		isPaletteJSON(input.buttonPressedPalette) &&
		isPaletteJSON(input.buttonMashingUnpressedPalette) &&
		isPaletteJSON(input.buttonMashingPressedPalette) &&
		typeof input.mashSpeedThreshold === "number" &&
		typeof input.customCss === "string" &&
		Array.isArray(input.widgets) && input.widgets.every((widget) => isWidgetJSON(widget))
	);
}
