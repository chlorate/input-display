import {Marshaler, Unmarshaler} from "./interface";

const prefix = "inputDisplay.";

/**
 * Loads a JSON string from localStorage, parses it, and passes the result to an
 * object to unmarshal. If no string was found or if it's not valid JSON, then
 * nothing happens.
 */
export function loadLocalStorage(key: string, obj: Unmarshaler): void {
	const json = localStorage.getItem(prefix + key);
	if (!json) {
		return;
	}

	let input;
	try {
		input = JSON.parse(json);
	} catch {
		// TODO: should show error
		return;
	}
	obj.unmarshal(input);
}

/**
 * Marshals an object and saves the result to localStorage as a JSON string.
 */
export function saveLocalStorage(key: string, obj: Marshaler): void {
	localStorage.setItem(prefix + key, JSON.stringify(obj.marshal()));
}
