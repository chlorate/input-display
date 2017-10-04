import {AxisReference} from "./axis-reference";
import {Config, maxPollRate, minPollRate} from "./config";

describe("Config", () => {
	let config;

	beforeEach(() => {
		config = new Config();
	});

	function setDualAxes() {
		config.setDpadDualAxes(
			new AxisReference(0, false),
			new AxisReference(1, false),
		);
	}

	it("should not accept a negative gamepad index", () => {
		config.gamepadIndex = -1;
		expect(config.gamepadIndex).toBe(0);
	});

	describe("dpadAxisIndex", () => {
		it("should not accept a negative index", () => {
			config.dpadAxisIndex = -1;
			expect(config.dpadAxisIndex).toBe(0);
		});

		it("should clear dual axes mapping if set to a number", () => {
			setDualAxes();
			config.dpadAxisIndex = 0;
			expect(config.dpadXAxis).toBeUndefined();
			expect(config.dpadYAxis).toBeUndefined();
		});

		it("should not clear dual axes mapping if set to undefined", () => {
			setDualAxes();
			config.dpadAxisIndex = undefined;
			expect(config.dpadXAxis).not.toBeUndefined();
			expect(config.dpadYAxis).not.toBeUndefined();
		});
	});

	it("should clamp poll rates", () => {
		config.pollRate = 0;
		expect(config.pollRate).toBe(minPollRate);
		config.pollRate = 1000;
		expect(config.pollRate).toBe(maxPollRate);
	});

	describe("setDpadDualAxes", () => {
		it("should set both X and Y axes", () => {
			setDualAxes();
			expect(config.dpadXAxis).not.toBeUndefined();
			expect(config.dpadYAxis).not.toBeUndefined();
		});

		it("should clear single axis mapping", () => {
			config.dpadAxisIndex = 0;
			setDualAxes();
			expect(config.dpadAxisIndex).toBeUndefined();
		});
	});

	describe("clearDpadMapping", () => {
		it("should clear single axis mapping", () => {
			config.dpadAxisIndex = 0;
			config.clearDpadMapping();
			expect(config.dpadAxisIndex).toBeUndefined();
		});

		it("should clear dual axes mapping", () => {
			setDualAxes();
			config.clearDpadMapping();
			expect(config.dpadXAxis).toBeUndefined();
			expect(config.dpadYAxis).toBeUndefined();
		});
	});
});
