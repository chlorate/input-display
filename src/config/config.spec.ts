import {Config, maxPollRate, minPollRate} from "./config";

describe("Config", () => {
	let config;

	beforeEach(() => {
		config = new Config();
	});

	it("should not accept a negative gamepad index", () => {
		config.gamepadIndex = -1;
		expect(config.gamepadIndex).toBe(0);
	});

	it("should clamp poll rates", () => {
		config.pollRate = 0;
		expect(config.pollRate).toBe(minPollRate);
		config.pollRate = 1000;
		expect(config.pollRate).toBe(maxPollRate);
	});
});
