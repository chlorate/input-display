import {ButtonType} from "../../controller/json/button-json";
import {Direction8} from "../../direction/direction8";
import {LabelPosition} from "../label-position";
import {LabelReplacement} from "../label-replacement";
import {ControlType, isControlJSON} from "./control-json";

describe("isControlJSON", () => {
	let json;

	beforeEach(() => {
		json = {
			name: "name",
			x: 1,
			y: 2,
			width: 3,
			height: 4,
			borderWidth: 5,
		};
	});

	describe("EllipseControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.Ellipse;
			json.rotation = 6;
		});

		it("should return true if only required properties are set", () => {
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return true if all valid, optional properties are set", () => {
			json.button = {
				type: ButtonType.Normal,
				index: 7,
			};
			json.nameLabel = LabelPosition.Above;
			json.pressesLabel = LabelPosition.Below;
			json.mashSpeedLabel = LabelPosition.Center;
			expect(isControlJSON(json)).toBe(true);

			json.mashSpeedLabel = LabelReplacement.Name;
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return false if name is not a string", () => {
			json.name = 123;
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if x is not numeric", () => {
			json.x = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if y is not numeric", () => {
			json.y = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if width is not numeric", () => {
			json.width = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if height is not numeric", () => {
			json.height = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if border width is not numeric", () => {
			json.borderWidth = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if rotation is not numeric", () => {
			json.rotation = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if button is not a ButtonReference", () => {
			json.button = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if nameLabel is invalid", () => {
			json.nameLabel = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if pressesLabel is invalid", () => {
			json.pressesLabel = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if mashSpeedLabel is invalid", () => {
			json.mashSpeedLabel = "bad";
			expect(isControlJSON(json)).toBe(false);
		});
	});

	describe("RectangleControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.Rectangle;
			json.rotation = 5;
		});

		it("should return true if valid", () => {
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return false if rotation is not numeric", () => {
			json.rotation = "bad";
			expect(isControlJSON(json)).toBe(false);
		});
	});

	describe("TriangleControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.Triangle;
			json.direction = Direction8.Down;
		});

		it("should return true if valid", () => {
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return false if direction is not valid", () => {
			json.direction = "bad";
			expect(isControlJSON(json)).toBe(false);
		});
	});

	it("should return false if not an object", () => {
		expect(isControlJSON("bad")).toBe(false);
	});
});
