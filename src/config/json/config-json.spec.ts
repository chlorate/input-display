import {ControlType} from "../../control/json/control-json";
import {ButtonType} from "../../controller/json/button-json";
import {isConfigJSON} from "./config-json";

describe("ConfigJSON", () => {
	let json;

	beforeEach(() => {
		json = {
			gamepadIndex: 0,
			pollRate: 60,
			displayWidth: 100,
			displayHeight: 200,
			displayOutline: true,
			backgroundColor: "#000000",
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
			axisNeutralPalette: {
				border: "#00000d",
				fill: "#00000e",
			},
			axisMovedPalette: {
				border: "#00000f",
				fill: "#000010",
			},
			mashSpeedThreshold: 15,
			labelOffsetX: 1,
			labelOffsetY: -1,
			controls: [
				{
					type: ControlType.EllipseButton,
					name: "",
					button: {
						type: ButtonType.Normal,
						index: 0,
					},
					x: 0,
					y: 0,
					width: 0,
					height: 0,
					borderWidth: 0,
					rotation: 0,
				},
			],
			customCss: "css",
		};
	});

	it("should return true if only required properties are set", () => {
		expect(isConfigJSON(json)).toBe(true);
	});

	it("should return true if all optional properties are set", () => {
		json.dpadAxisIndex = 0;
		json.dpadXAxis = {
			index: 1,
			inverted: false,
		};
		json.dpadYAxis = {
			index: 2,
			inverted: true,
		};
		expect(isConfigJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isConfigJSON("bad")).toBe(false);
	});

	it("should return false if gamepadIndex is not numeric", () => {
		json.gamepadIndex = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if dpadAxisIndex is not numeric", () => {
		json.dpadAxisIndex = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if dpadXAxis is not an AxisReferenceJSON object", () => {
		json.dpadXAxis = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if dpadYAxis is not an AxisReferenceJSON object", () => {
		json.dpadYAxis = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if pollRate is not numeric", () => {
		json.pollRate = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if displayWidth is not numeric", () => {
		json.displayWidth = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if displayHeight is not numeric", () => {
		json.displayHeight = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if displayOutline is not boolean", () => {
		json.displayOutline = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if fontName is not a string", () => {
		json.fontName = 123;
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if fontBold is not boolean", () => {
		json.fontBold = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if fontItalic is not boolean", () => {
		json.fontItalic = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if fontShadow is not boolean", () => {
		json.fontShadow = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if fontSize is not numeric", () => {
		json.fontSize = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if backgroundColor is not a string", () => {
		json.backgroundColor = 123;
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonUnpressedPalette is not a ButtonPaletteJSON object", () => {
		json.buttonUnpressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonPressedPalette is not a ButtonPaletteJSON object", () => {
		json.buttonPressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonMashingUnpressedPalette is not a ButtonPaletteJSON object", () => {
		json.buttonMashingUnpressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonMashingPressedPalette is not a ButtonPaletteJSON", () => {
		json.buttonMashingPressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if axisNeutralPalette is not a PaletteJSON object", () => {
		json.axisNeutralPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if axisMovedPalette is not a PaletteJSON object", () => {
		json.axisMovedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if mashSpeedThreshold is not numeric", () => {
		json.mashSpeedThreshold = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if labelOffsetX is not numeric", () => {
		json.labelOffsetX = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if labelOffsetY is not numeric", () => {
		json.labelOffsetY = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if controls is not an array", () => {
		json.controls = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if controls array does not contain a valid control", () => {
		json.controls[0] = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if customCss is not a string", () => {
		json.customCss = 123;
		expect(isConfigJSON(json)).toBe(false);
	});
});
