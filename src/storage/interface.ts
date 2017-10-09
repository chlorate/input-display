/**
 * An object that implements this can load data from a parsed JSON result,
 * handling any arbitrary user input.
 */
export interface Loader {
	loadJSON(json: any): void;
}

/**
 * An object that implements this can return a JSON representation of its
 * values to be saved.
 */
export interface Saver {
	toJSON(): object;
}
