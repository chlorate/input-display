import {Loader, Saver} from "./interface";

/**
 * Loads a JSON string from a file, parses it, and passes the result to an
 * object to read. Returns a promise that is resolved if successful or rejected
 * with an error string.
 */
export function loadFile(file: File, obj: Loader): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			try {
				obj.loadJSON(JSON.parse(reader.result));
			} catch (exception) {
				reject(exception.toString());
			}
			resolve();
		};
		reader.onerror = () => {
			reject(reader.error.toString());
		};
		reader.readAsText(file);
	});
}

/**
 * Saves a JSON representation of an object to a file. Returns a URL that must
 * be used to create a link in which the user must click in order to save the
 * file to disk. Use URL.revokeObjectURL to deallocate the URL and data when no
 * longer needed.
 *
 * It's 2017 and there still isn't a great solution for saving files.
 */
export function saveFile(obj: Saver): string {
	const blob = new Blob([JSON.stringify(obj)], {type: "application/json"});
	return URL.createObjectURL(blob);
}
