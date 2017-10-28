import {Direction4} from "../direction/direction4";
import {defaultRadius, maxRadius, minRadius} from "./control";
import {defaultDirection, DpadControl} from "./dpad-control";
import {ControlType} from "./json/control-json";

describe("DpadControl", () => {
	let control;

	beforeEach(() => {
		control = new DpadControl();
		control.width = 20;
		control.height = 10;
		control.borderWidth = 1;
	});

	it("should clamp radius", () => {
		control.radius = -5000;
		expect(control.radius).toBe(minRadius);
		control.radius = 5000;
		expect(control.radius).toBe(maxRadius);
	});

	describe("path", () => {
		it("returns a path when direction is up with no radius", () => {
			control.direction = Direction4.Up;
			expect(control.path).toBe("M 0.5,9.99 V 10 H 19.5 V 0.5 Q 19.5,0.5 19.5,0.5 H 0.5 Q 0.5,0.5 0.5,0.5 Z");
		});

		it("returns a path when direction is up with partial radius", () => {
			control.direction = Direction4.Up;
			control.radius = 5;
			expect(control.path).toBe("M 0.5,9.99 V 10 H 19.5 V 5.5 Q 19.5,0.5 14.5,0.5 H 5.5 Q 0.5,0.5 0.5,5.5 Z");
		});

		it("returns a path when direction is up with large radius", () => {
			control.direction = Direction4.Up;
			control.radius = 1000;
			expect(control.path).toBe("M 0.5,9.99 V 10 H 19.5 V 10 Q 19.5,0.5 10,0.5 H 10 Q 0.5,0.5 0.5,10 Z");
		});

		it("returns a path when direction is right with no radius", () => {
			control.direction = Direction4.Right;
			control.radius = 0;
			expect(control.path).toBe("M 0.01,0.5 H 0 V 9.5 H 19.5 Q 19.5,9.5 19.5,9.5 V 0.5 Q 19.5,0.5 19.5,0.5 Z");
		});

		it("returns a path when direction is right with partial radius", () => {
			control.direction = Direction4.Right;
			control.radius = 2;
			expect(control.path).toBe("M 0.01,0.5 H 0 V 9.5 H 17.5 Q 19.5,9.5 19.5,7.5 V 2.5 Q 19.5,0.5 17.5,0.5 Z");
		});

		it("returns a path when direction is right with large radius", () => {
			control.direction = Direction4.Right;
			control.radius = 1000;
			expect(control.path).toBe("M 0.01,0.5 H 0 V 9.5 H 0 Q 19.5,9.5 19.5,5 V 5 Q 19.5,0.5 0,0.5 Z");
		});

		it("returns a path when direction is down with no radius", () => {
			control.direction = Direction4.Down;
			control.radius = 0;
			expect(control.path).toBe("M 0.5,0.01 V 0 H 19.5 V 9.5 Q 19.5,9.5 19.5,9.5 H 0.5 Q 0.5,9.5 0.5,9.5 Z");
		});

		it("returns a path when direction is down with partial radius", () => {
			control.direction = Direction4.Down;
			control.radius = 5;
			expect(control.path).toBe("M 0.5,0.01 V 0 H 19.5 V 4.5 Q 19.5,9.5 14.5,9.5 H 5.5 Q 0.5,9.5 0.5,4.5 Z");
		});

		it("returns a path when direction is down with large radius", () => {
			control.direction = Direction4.Down;
			control.radius = 1000;
			expect(control.path).toBe("M 0.5,0.01 V 0 H 19.5 V 0 Q 19.5,9.5 10,9.5 H 10 Q 0.5,9.5 0.5,0 Z");
		});

		it("returns a path when direction is left with no radius", () => {
			control.direction = Direction4.Left;
			control.radius = 0;
			expect(control.path).toBe("M 19.99,0.5 H 20 V 9.5 H 0.5 Q 0.5,9.5 0.5,9.5 V 0.5 Q 0.5,0.5 0.5,0.5 Z");
		});

		it("returns a path when direction is left with partial radius", () => {
			control.direction = Direction4.Left;
			control.radius = 2;
			expect(control.path).toBe("M 19.99,0.5 H 20 V 9.5 H 2.5 Q 0.5,9.5 0.5,7.5 V 2.5 Q 0.5,0.5 2.5,0.5 Z");
		});

		it("returns a path when direction is left with large radius", () => {
			control.direction = Direction4.Left;
			control.radius = 1000;
			expect(control.path).toBe("M 19.99,0.5 H 20 V 9.5 H 20 Q 0.5,9.5 0.5,5 V 5 Q 0.5,0.5 20,0.5 Z");
		});

		it("throws an error if direction is invalid", () => {
			control.direction = "bad";
			expect(() => control.path).toThrowError();
		});
	});

	describe("strokeDashArray", () => {
		const verticalArray = "0 19.02 40";
		const horizontalArray = "0 9.02 50";

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
		expect(json.radius).toBe(defaultRadius);
		expect(json.direction).toBe(defaultDirection);
	});
});
