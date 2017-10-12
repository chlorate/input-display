/**
 * A JSON representation of an AxisReference object.
 */
export interface AxisReferenceJSON {
	index: number;
	inverted: boolean;
}

/**
 * Returns true if some value is an AxisReferenceJSON object.
 */
export function isAxisReferenceJSON(input: any): input is AxisReferenceJSON {
	return (
		typeof input === "object" &&
		typeof input.index === "number" &&
		typeof input.inverted === "boolean"
	);
}
