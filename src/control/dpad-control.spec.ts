import {Direction4} from "../direction/direction4";
import {defaultDirection, DpadControl} from "./dpad-control";
import {ControlType} from "./json/control-json";

describe("DpadControl", () => {
	let control;

	beforeEach(() => {
		control = new DpadControl();
	});

	describe("strokeDashArray", () => {
		const verticalArray = "0 19.02 40";
		const horizontalArray = "0 9.02 50";

		beforeEach(() => {
			control.width = 20;
			control.height = 10;
			control.borderWidth = 1;
		})

		it("returns a dash array when direction is up", () => {
			control.direction = Direction4.Up;
			expect(control.strokeDashArray).toBe(verticalArray);
		});

		it("returns a dash array when direction is right", () => {
			control.direction = Direction4.Right;
			expect(control.strokeDashArray).toBe(horizontalArray);
		});

		it("returns a dash array when direction is down", () => {
			control.direction = Direction4.Down;
			expect(control.strokeDashArray).toBe(verticalArray);
		});

		it("returns a dash array when direction is left", () => {
			control.direction = Direction4.Left;
			expect(control.strokeDashArray).toBe(horizontalArray);
		});

		it("throws an error if direction is invalid", () => {
			control.direction = "bad";
			expect(() => control.strokeDashArray).toThrowError();
		});
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Dpad);
		expect(json.direction).toBe(defaultDirection);
	});
});
