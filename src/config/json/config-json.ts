/**
 * A JSON representation of a Config object.
 */
export interface ConfigJSON {
	gamepadIndex?: number;
	dpadAxisIndex?: number;
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
		(input.pollRate === undefined || typeof input.pollRate === "number")
	);
}
