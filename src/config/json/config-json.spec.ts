import {ButtonType} from "../../controller/json/button-json";
import {WidgetType} from "../../widget/json/widget-json";
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
				},
			],
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

	it("should return false if backgroundColor is not a string", () => {
		json.backgroundColor = 123;
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonUnpressedPalette is not a PaletteJSON object", () => {
		json.buttonUnpressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonPressedPalette is not a PaletteJSON object", () => {
		json.buttonPressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonMashingUnpressedPalette is not a PaletteJSON object", () => {
		json.buttonMashingUnpressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if buttonMashingPressedPalette is not a PaletteJSON", () => {
		json.buttonMashingPressedPalette = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if mashSpeedThreshold is not a number", () => {
		json.mashSpeedThreshold = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if widgets is not an array", () => {
		json.widgets = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});

	it("should return false if widgets array does not contain a valid widget", () => {
		json.widgets[0] = "bad";
		expect(isConfigJSON(json)).toBe(false);
	});
});
