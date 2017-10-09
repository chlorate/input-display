/**
 * A JSON representation of an Axis.
 */
export interface AxisJSON {
	neutralValue?: number;
	minValue?: number;
	maxValue?: number;
}

/**
 * Returns true if some value is an AxisJSON object.
 */
export function isAxisJSON(input: any): input is AxisJSON {
	return (
		typeof input === "object" &&
		(input.neutralValue === undefined || typeof input.neutralValue === "number") &&
		(input.minValue === undefined || typeof input.minValue === "number") &&
		(input.maxValue === undefined || typeof input.maxValue === "number")
	);
}
