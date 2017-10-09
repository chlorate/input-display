import {Loader, Saver} from "./interface";

const prefix = "inputDisplay.";

/**
 * Loads a JSON string from localStorage, parses it, and passes the result to an
 * object to read. Does nothing if no string was found.
 */
export function loadLocalStorage(key: string, obj: Loader): void {
	const json = localStorage.getItem(prefix + key);
	if (json) {
		obj.loadJSON(JSON.parse(json));
	}
}

/**
 * Saves a JSON representation of an object to localStorage as a string.
 */
export function saveLocalStorage(key: string, obj: Saver): void {
	localStorage.setItem(prefix + key, JSON.stringify(obj));
}
