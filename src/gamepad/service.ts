const aliases: {[id: string]: string} = {
	"Unknown Gamepad (Vendor: 057e Product: 0306)": "Wii Remote",
};

/**
 * Returns an array of gamepads from the Gamepad API.
 */
export function getGamepads(): Array<Gamepad | undefined> {
	// navigator.getGamepads doesn't return a real array.
	const out: Array<Gamepad | undefined> = [];
	const gamepads = navigator.getGamepads();
	for (let i = 0; i < gamepads.length; i++) {
		if (gamepads[i]) {
			out[i] = gamepads[i];
		}
	}
	return out;
}

/**
 * Returns an array of gamepad IDs (possibly aliased to friendlier names) for
 * all connected gamepads.
 */
export function getGamepadIds(): Array<string | undefined> {
	const ids: string[] = [];
	getGamepads().forEach((gamepad, i) => {
		if (gamepad) {
			const id = gamepad.id;
			ids[i] = aliases[id] ? aliases[id] : id;
		}
	});
	return ids;
}
