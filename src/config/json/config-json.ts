import {AxisReferenceJSON, isAxisReferenceJSON} from "./axis-reference-json";

/**
 * A JSON representation of a Config object.
 */
export interface ConfigJSON {
	gamepadIndex?: number;
	dpadAxisIndex?: number;
	dpadXAxis?: AxisReferenceJSON;
	dpadYAxis?: AxisReferenceJSON;
	pollRate?: number;
}

/**
 * Returns true if some value is a valid ConfigJSON object.
 */
export function isConfigJSON(input: any): input is ConfigJSON {
	return (
		typeof input === "object" &&
		(input.gamepadIndex === undefined || typeof input.gamepadIndex === "number") &&
		(input.dpadAxisIndex === undefined || typeof input.dpadAxisIndex === "number") &&
		(input.dpadXAxis === undefined || isAxisReferenceJSON(input.dpadXAxis)) &&
		(input.dpadYAxis === undefined || isAxisReferenceJSON(input.dpadYAxis)) &&
		(input.pollRate === undefined || typeof input.pollRate === "number")
	);
}
