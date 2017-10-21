import {WidgetType} from "../widget/json/widget-json";
import {LabelPosition} from "../widget/label-position";
import {LabelReplacement} from "../widget/label-replacement";
import {RoundButtonWidget} from "../widget/round-button-widget";
import {AxisReference} from "./axis-reference";

import {
	Config, DefaultColors,
	maxCustomCssLength, maxFontNameLength, maxFontSize, maxHeight, maxMashSpeedThreshold, maxPollRate, maxWidth,
	minFontSize, minHeight, minMashSpeedThreshold, minPollRate, minWidth,
} from "./config";

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

	it("should truncate font name", () => {
		config.fontName = "x".repeat(600);
		expect(config.fontName.length).toBe(maxFontNameLength);
	});

	it("should clamp font size", () => {
		config.fontSize = 0;
		expect(config.fontSize).toBe(minFontSize);
		config.fontSize = 5000;
		expect(config.fontSize).toBe(maxFontSize);
	});

	it("should reset background color if not valid", () => {
		config.backgroundColor = "bad";
		expect(config.backgroundColor).toBe(DefaultColors.Background);
	});

	it("should clamp mash speed threshold", () => {
		config.mashSpeedThreshold = 0;
		expect(config.mashSpeedThreshold).toBe(minMashSpeedThreshold);
		config.mashSpeedThreshold = 60;
		expect(config.mashSpeedThreshold).toBe(maxMashSpeedThreshold);
	});

	it("should truncate custom CSS", () => {
		config.customCss = "x".repeat(1000001);
		expect(config.customCss.length).toBe(maxCustomCssLength);
	});

	it("can return a JSON representation", () => {
		config.gamepadIndex = 1;
		config.dpadAxisIndex = 2;
		config.pollRate = 45;
		config.displayWidth = 100;
		config.displayHeight = 200;
		config.displayOutline = true;
		config.fontName = "font";
		config.fontBold = true;
		config.fontItalic = true;
		config.fontShadow = true;
		config.fontSize = 20;
		config.backgroundColor = "#111111";
		config.mashSpeedThreshold = 15;
		config.widgets.push(new RoundButtonWidget());
		config.customCss = "css";
		expect(config.toJSON()).toEqual({
			gamepadIndex: 1,
			dpadAxisIndex: 2,
			pollRate: 45,
			displayWidth: 100,
			displayHeight: 200,
			displayOutline: true,
			backgroundColor: "#111111",
			fontName: "font",
			fontBold: true,
			fontItalic: true,
			fontShadow: true,
			fontSize: 20,
			buttonUnpressedPalette: {
				border: DefaultColors.ButtonUnpressedBorder,
				fill: DefaultColors.ButtonUnpressedFill,
				label: DefaultColors.ButtonUnpressedLabel,
			},
			buttonPressedPalette: {
				border: DefaultColors.ButtonPressedBorder,
				fill: DefaultColors.ButtonPressedFill,
				label: DefaultColors.ButtonPressedLabel,
			},
			buttonMashingUnpressedPalette: {
				border: DefaultColors.ButtonMashingUnpressedBorder,
				fill: DefaultColors.ButtonMashingUnpressedFill,
				label: DefaultColors.ButtonMashingUnpressedLabel,
			},
			buttonMashingPressedPalette: {
				border: DefaultColors.ButtonMashingPressedBorder,
				fill: DefaultColors.ButtonMashingPressedFill,
				label: DefaultColors.ButtonMashingPressedLabel,
			},
			mashSpeedThreshold: 15,
			widgets: [
				{
					type: WidgetType.RoundButton,
					name: "",
					button: undefined,
					x: 5,
					y: 5,
					width: 24,
					height: 24,
					borderWidth: 1.5,
					nameLabel: LabelPosition.Center,
					pressesLabel: undefined,
					mashSpeedLabel: LabelReplacement.Name,
				},
			],
			customCss: "css",
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
				backgroundColor: "#111111",
				fontName: "font",
				fontBold: true,
				fontItalic: true,
				fontShadow: true,
				fontSize: 20,
				buttonUnpressedPalette: {
					border: "#000001",
					fill: "#000002",
					label: "#000003",
				},
				buttonPressedPalette: {
					border: "#000004",
					fill: "#000005",
					label: "#000006",
				},
				buttonMashingUnpressedPalette: {
					border: "#000007",
					fill: "#000008",
					label: "#000009",
				},
				buttonMashingPressedPalette: {
					border: "#00000a",
					fill: "#00000b",
					label: "#00000c",
				},
				mashSpeedThreshold: 15,
				widgets: [
					{
						type: WidgetType.RoundButton,
						name: "name",
						x: 0,
						y: 1,
						width: 2,
						height: 3,
						borderWidth: 4,
					},
				],
				customCss: "css",
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
			expect(config.fontName).toBe("font");
			expect(config.fontBold).toBe(true);
			expect(config.fontItalic).toBe(true);
			expect(config.fontShadow).toBe(true);
			expect(config.fontSize).toBe(20);
			expect(config.backgroundColor).toBe("#111111");
			expect(config.buttonUnpressedPalette.border).toBe("#000001");
			expect(config.buttonPressedPalette.border).toBe("#000004");
			expect(config.buttonMashingUnpressedPalette.border).toBe("#000007");
			expect(config.buttonMashingPressedPalette.border).toBe("#00000a");
			expect(config.mashSpeedThreshold).toBe(15);
			expect(config.widgets.length).toBe(1);
			expect(config.widgets[0] instanceof RoundButtonWidget).toBe(true);
			expect(config.customCss).toBe("css");
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
