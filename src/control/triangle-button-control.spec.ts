import {Direction8} from "../direction/direction8";
import {ControlType} from "./json/control-json";
import {defaultDirection, TriangleButtonControl} from "./triangle-button-control";

describe("TriangleButtonControl", () => {
	let control;

	beforeEach(() => {
		control = new TriangleButtonControl();
		control.borderWidth = 1;
	});

	describe("path", () => {
		it("returns a path when direction is up", () => {
			control.direction = Direction8.Up;
			expect(control.path).toBe("M 12,0.5 L 23.5,23.5 H 0.5 Z");
		});

		it("returns a path when direction is up-right", () => {
			control.direction = Direction8.UpRight;
			expect(control.path).toBe("M 0.5,0.5 H 23.5 V 23.5 Z");
		});

		it("returns a path when direction is right", () => {
			control.direction = Direction8.Right;
			expect(control.path).toBe("M 0.5,23.5 V 0.5 L 23.5,12 Z");
		});

		it("returns a path when direction is down-right", () => {
			control.direction = Direction8.DownRight;
			expect(control.path).toBe("M 23.5,0.5 V 23.5 H 0.5 Z");
		});

		it("returns a path when direction is down", () => {
			control.direction = Direction8.Down;
			expect(control.path).toBe("M 12,23.5 L 0.5,0.5 H 23.5 Z");
		});

		it("returns a path when direction is down-left", () => {
			control.direction = Direction8.DownLeft;
			expect(control.path).toBe("M 0.5,0.5 V 23.5 H 23.5 Z");
		});

		it("returns a path when direction is left", () => {
			control.direction = Direction8.Left;
			expect(control.path).toBe("M 0.5,12 L 23.5,0.5 V 23.5 Z");
		});

		it("returns a path when direction is up-left", () => {
			control.direction = Direction8.UpLeft;
			expect(control.path).toBe("M 0.5,23.5 V 0.5 H 23.5 Z");
		});

		it("throws an error if direction is invalid", () => {
			control.direction = "bad";
			expect(() => control.path).toThrowError();
		});
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Triangle);
		expect(json.direction).toBe(defaultDirection);
	});
});
