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
	buttonUnpressedPalette: PaletteJSON;
	buttonPressedPalette: PaletteJSON;
	buttonMashingUnpressedPalette: PaletteJSON;
	buttonMashingPressedPalette: PaletteJSON;
	widgets: WidgetJSON[];
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
		isPaletteJSON(input.buttonUnpressedPalette) &&
		isPaletteJSON(input.buttonPressedPalette) &&
		isPaletteJSON(input.buttonMashingUnpressedPalette) &&
		isPaletteJSON(input.buttonMashingPressedPalette) &&
		Array.isArray(input.widgets) && input.widgets.every((widget) => isWidgetJSON(widget))
	);
}
