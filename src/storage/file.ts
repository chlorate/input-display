import {Saver} from "./interface";

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
