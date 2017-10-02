import {Config} from "./config";

describe("Config", () => {
	let config;

	beforeEach(() => {
		config = new Config();
	});

	it("should not accept a negative gamepad index", () => {
		config.gamepadIndex = -1;
		expect(config.gamepadIndex).toBe(0);
	});
});
