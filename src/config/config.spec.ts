import {AxisReference} from "./axis-reference";
import {Config, defaultPollRate, maxPollRate, minPollRate} from "./config";

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
			expect(config.dpadXAxis).toBeDefined();
			expect(config.dpadYAxis).toBeDefined();
		});
	});

	it("should clamp poll rates", () => {
		config.pollRate = 0;
		expect(config.pollRate).toBe(minPollRate);
		config.pollRate = 1000;
		expect(config.pollRate).toBe(maxPollRate);
	});

	it("can return a JSON representation", () => {
		config.gamepadIndex = 1;
		config.dpadAxisIndex = 2;
		expect(config.toJSON()).toEqual({
			gamepadIndex: 1,
			dpadAxisIndex: 2,
			pollRate: defaultPollRate,
		});
	});

	describe("loadJSON", () => {
		it("should set defaults when passed an empty object", () => {
			config.loadJSON({});
			expect(config.gamepadIndex).toBe(0);
			expect(config.dpadAxisIndex).toBeUndefined();
			expect(config.pollRate).toBe(defaultPollRate);
		});

		it("should update properties as expected", () => {
			config.loadJSON({
				gamepadIndex: 1,
				dpadAxisIndex: 2,
				pollRate: 30,
			});
			expect(config.gamepadIndex).toBe(1);
			expect(config.dpadAxisIndex).toBe(2);
			expect(config.pollRate).toBe(30);
		});

		it("should throw error when not passed a ConfigJSON object", () => {
			expect(() => config.loadJSON("bad")).toThrowError();
		});
	});

	describe("setDpadDualAxes", () => {
		it("should set both X and Y axes", () => {
			setDualAxes();
			expect(config.dpadXAxis).toBeDefined();
			expect(config.dpadYAxis).toBeDefined();
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
