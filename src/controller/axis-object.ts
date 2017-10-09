/**
 * Axis data as a plain object for storage.
 */
export interface AxisObject {
	neutralValue?: number;
	minValue?: number;
	maxValue?: number;
}

/**
 * Returns true if some arbitrary value is a valid AxisObject.
 */
export function isAxisObject(input: any): input is AxisObject {
	return (
		typeof input === "object" &&
		(input.neutralValue === undefined || typeof input.neutralValue === "number") &&
		(input.minValue === undefined || typeof input.minValue === "number") &&
		(input.maxValue === undefined || typeof input.maxValue === "number")
	);
}
