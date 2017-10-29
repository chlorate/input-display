import {ButtonType} from "../../controller/json/button-json";
import {Direction4} from "../../direction/direction4";
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
			borderWidth: 3,
		};
	});

	describe("DpadButtonControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.DpadButton;
			json.width = 4;
			json.height = 5;
			json.radius = 6;
			json.direction = Direction4.Down;
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

		it("should return false if radius is not numeric", () => {
			json.radius = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if direction is not valid", () => {
			json.direction = "bad";
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

	describe("EllipseButtonControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.EllipseButton;
			json.width = 4;
			json.height = 5;
			json.rotation = 6;
		});

		it("should return true if valid", () => {
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return false if rotation is not numeric", () => {
			json.rotation = "bad";
			expect(isControlJSON(json)).toBe(false);
		});
	});

	describe("RectangleButtonControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.RectangleButton;
			json.width = 4;
			json.height = 5;
			json.topRadius = 6;
			json.bottomRadius = 7;
			json.rotation = 8;
		});

		it("should return true if valid", () => {
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return false if topRadius is not numeric", () => {
			json.topRadius = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if bottomRadius is not numeric", () => {
			json.bottomRadius = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if rotation is not numeric", () => {
			json.rotation = "bad";
			expect(isControlJSON(json)).toBe(false);
		});
	});

	describe("TriangleButtonControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.TriangleButton;
			json.width = 4;
			json.height = 5;
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

	describe("CircleStickControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.CircleStick;
			json.outerSize = 4;
			json.innerSize = 5;
		});

		it("should return true if valid without axis references", () => {
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return true if valid with axis referecens", () => {
			json.xAxis = {
				index: 0,
				inverted: false,
			};
			json.yAxis = {
				index: 1,
				inverted: true,
			};
			expect(isControlJSON(json)).toBe(true);
		});

		it("should return false if xAxis is not an AxisReference", () => {
			json.xAxis = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if yAxis is not an AxisReference", () => {
			json.yAxis = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if outerSize is not numeric", () => {
			json.outerSize = "bad";
			expect(isControlJSON(json)).toBe(false);
		});

		it("should return false if innerSize is not numeric", () => {
			json.innerSize = "bad";
			expect(isControlJSON(json)).toBe(false);
		});
	});

	describe("OctagonStickControlJSON", () => {
		beforeEach(() => {
			json.type = ControlType.OctagonStick;
			json.outerSize = 4;
			json.innerSize = 5;
		});

		it("should return true if valid", () => {
			expect(isControlJSON(json)).toBe(true);
		});
	});

	it("should return false if not an object", () => {
		expect(isControlJSON("bad")).toBe(false);
	});
});
