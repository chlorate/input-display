/**
 * An object that implements this can marshal its data to an object.
 */
export interface Marshaler {
	marshal(): object;
}

/**
 * An object that implements this can unmarshal data from an object.
 */
export interface Unmarshaler {
	unmarshal(input: any): void;
}
