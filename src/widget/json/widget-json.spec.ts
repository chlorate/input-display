import {ButtonType} from "../../controller/json/button-json";
import {LabelPosition} from "../label-position";
import {LabelReplacement} from "../label-replacement";
import {isWidgetJSON, WidgetType} from "./widget-json";

describe("isWidgetJSON", () => {
	let json;

	describe("RoundButtonWidgetJSON", () => {
		beforeEach(() => {
			json = {
				type: WidgetType.RoundButton,
				name: "name",
				x: 1,
				y: 2,
				width: 3,
				height: 4,
				borderWidth: 5,
				showName: true,
				showPresses: true,
				showMashSpeed: true,
			};
		});

		it("should return true if only required properties are set", () => {
			expect(isWidgetJSON(json)).toBe(true);
		});

		it("should return true if all valid, optional properties are set", () => {
			json.button = {
				type: ButtonType.Normal,
				index: 6,
			};
			json.nameLabel = LabelPosition.Above;
			json.pressesLabel = LabelPosition.Below;
			json.mashSpeedLabel = LabelPosition.Center;
			expect(isWidgetJSON(json)).toBe(true);

			json.mashSpeedLabel = LabelReplacement.Name;
			expect(isWidgetJSON(json)).toBe(true);
		});

		it("should return false if name is not a string", () => {
			json.name = 123;
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if x is not numeric", () => {
			json.x = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if y is not numeric", () => {
			json.y = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if width is not numeric", () => {
			json.width = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if height is not numeric", () => {
			json.height = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if border width is not numeric", () => {
			json.borderWidth = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if button is not a ButtonReference", () => {
			json.button = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if showName is not boolean", () => {
			json.showName = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if showPresses is not boolean", () => {
			json.showPresses = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if showMashSpeed is not boolean", () => {
			json.showMashSpeed = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if nameLabel is invalid", () => {
			json.nameLabel = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if pressesLabel is invalid", () => {
			json.pressesLabel = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});

		it("should return false if mashSpeedLabel is invalid", () => {
			json.mashSpeedLabel = "bad";
			expect(isWidgetJSON(json)).toBe(false);
		});
	});

	it("should return false if not an object", () => {
		expect(isWidgetJSON("bad")).toBe(false);
	});
});
