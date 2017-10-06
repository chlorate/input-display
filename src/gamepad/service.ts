const aliases: {[id: string]: string} = {
	"Unknown Gamepad (Vendor: 057e Product: 0306)": "Wii Remote",
};

export function getGamepads(): Gamepad[] {
	return navigator.getGamepads();
}

export function getGamepadIds(): Array<string | undefined> {
	const ids: string[] = [];
	const gamepads = navigator.getGamepads();
	for (let i = 0; i < gamepads.length; i++) {
		if (gamepads[i]) {
			const id = gamepads[i].id;
			ids[i] = aliases[id] ? aliases[id] : id;
		}
	}
	return ids;
}
