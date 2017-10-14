import {AxisReferenceJSON, isAxisReferenceJSON} from "./axis-reference-json";

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
		typeof input.displayOutline === "boolean"
	);
}
