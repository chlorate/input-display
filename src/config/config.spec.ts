import {ButtonType} from "../controller/json/button-json";
import {WidgetType} from "../widget/json/widget-json";
import {RoundButtonWidget} from "../widget/round-button-widget";
import {AxisReference} from "./axis-reference";
import {Config, maxHeight, maxPollRate, maxWidth, minHeight, minPollRate, minWidth} from "./config";

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

	it("should clamp display width", () => {
		config.displayWidth = 0;
		expect(config.displayWidth).toBe(minWidth);
		config.displayWidth = 5000;
		expect(config.displayWidth).toBe(maxWidth);
	});

	it("should clamp display height", () => {
		config.displayHeight = 0;
		expect(config.displayHeight).toBe(minHeight);
		config.displayHeight = 5000;
		expect(config.displayHeight).toBe(maxHeight);
	});

	it("can return a JSON representation", () => {
		config.gamepadIndex = 1;
		config.dpadAxisIndex = 2;
		config.pollRate = 45;
		config.displayWidth = 100;
		config.displayHeight = 200;
		config.displayOutline = true;
		config.widgets.push(new RoundButtonWidget());
		expect(config.toJSON()).toEqual({
			gamepadIndex: 1,
			dpadAxisIndex: 2,
			pollRate: 45,
			displayWidth: 100,
			displayHeight: 200,
			displayOutline: true,
			widgets: [
				{
					type: WidgetType.RoundButton,
					name: "",
					x: 0,
					y: 0,
					showName: true,
					showPresses: false,
					showMashSpeed: true,
					width: 20,
					height: 20,
					borderWidth: 1.5,
					button: {
						type: ButtonType.Normal,
						index: 0,
					},
				},
			],
		});

		setDualAxes();
		const json = config.toJSON();
		expect(json.dpadXAxis.index).toBe(0);
		expect(json.dpadXAxis.inverted).toBe(false);
		expect(json.dpadYAxis.index).toBe(1);
		expect(json.dpadYAxis.inverted).toBe(false);
	});

	describe("loadJSON", () => {
		let json;

		beforeEach(() => {
			json = {
				gamepadIndex: 1,
				pollRate: 30,
				displayWidth: 100,
				displayHeight: 200,
				displayOutline: true,
				widgets: [
					{
						type: WidgetType.RoundButton,
						name: "name",
						x: 0,
						y: 1,
						showName: true,
						showPresses: true,
						showMashSpeed: true,
						width: 2,
						height: 3,
						borderWidth: 4,
						button: {
							type: ButtonType.Normal,
							index: 2,
						},
					},
				],
			};
		});

		it("should update all required properties", () => {
			config.loadJSON(json);
			expect(config.gamepadIndex).toBe(1);
			expect(config.dpadAxisIndex).toBeUndefined();
			expect(config.dpadXIndex).toBeUndefined();
			expect(config.dpadYIndex).toBeUndefined();
			expect(config.pollRate).toBe(30);
			expect(config.displayWidth).toBe(100);
			expect(config.displayHeight).toBe(200);
			expect(config.displayOutline).toBe(true);
			expect(config.widgets.length).toBe(1);
			expect(config.widgets[0] instanceof RoundButtonWidget).toBe(true);
		});

		it("can update dpadAxisIndex", () => {
			json.dpadAxisIndex = 2;
			config.loadJSON(json);
			expect(config.dpadAxisIndex).toBe(2);
		});

		it("can update d-pad dual axes settings", () => {
			json.dpadXAxis = {
				index: 1,
				inverted: false,
			};
			json.dpadYAxis = {
				index: 2,
				inverted: true,
			};
			config.loadJSON(json);
			expect(config.dpadXAxis.index).toEqual(1);
			expect(config.dpadXAxis.inverted).toBe(false);
			expect(config.dpadYAxis.index).toEqual(2);
			expect(config.dpadYAxis.inverted).toBe(true);
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
