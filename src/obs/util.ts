declare global {
	interface Window {
		obsstudio: object | undefined;
	}
}

/**
 * Returns true if the app is running in an OBS browser source.
 */
export function isObs(): boolean {
	return window.obsstudio !== undefined;
}
