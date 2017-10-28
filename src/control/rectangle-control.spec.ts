import {defaultRadius, maxRadius, minRadius} from "./control";
import {ControlType} from "./json/control-json";
import {RectangleControl} from "./rectangle-control";
import {defaultRotation} from "./rotatable-control";

describe("RectangleControl", () => {
	let control;

	beforeEach(() => {
		control = new RectangleControl();
	});

	it("should clamp top border radius", () => {
		control.topRadius = -5000;
		expect(control.topRadius).toBe(minRadius);
		control.topRadius = 5000;
		expect(control.topRadius).toBe(maxRadius);
	});

	it("should clamp bottom border radius", () => {
		control.bottomRadius = -5000;
		expect(control.bottomRadius).toBe(minRadius);
		control.bottomRadius = 5000;
		expect(control.bottomRadius).toBe(maxRadius);
	});

	describe("path", () => {
		beforeEach(() => {
			control.width = 20;
			control.height = 50;
			control.borderWidth = 1;
		});

		it("should return a path with no border radius", () => {
			control.topRadius = 0;
			control.bottomRadius = 0;
			expect(control.path).toBe(
				"M 0.5,0.5 Q 0.5,0.5 0.5,0.5 H 19.5 Q 19.5,0.5 19.5,0.5 " +
				"V 49.5 Q 19.5,49.5 19.5,49.5 H 0.5 Q 0.5,49.5 0.5,49.5 Z",
			);
		});

		it("should return a path with partial top border radius", () => {
			control.topRadius = 5;
			control.bottomRadius = 0;
			expect(control.path).toBe(
				"M 0.5,5.5 Q 0.5,0.5 5.5,0.5 H 14.5 Q 19.5,0.5 19.5,5.5 " +
				"V 49.5 Q 19.5,49.5 19.5,49.5 H 0.5 Q 0.5,49.5 0.5,49.5 Z",
			);
		});

		it("should return a path with large top border radius", () => {
			control.topRadius = 1000;
			control.bottomRadius = 0;
			expect(control.path).toBe(
				"M 0.5,49.5 Q 0.5,0.5 10,0.5 H 10 Q 19.5,0.5 19.5,49.5 " +
				"V 49.5 Q 19.5,49.5 19.5,49.5 H 0.5 Q 0.5,49.5 0.5,49.5 Z",
			);
		});

		it("should return a path with partial bottom border radius", () => {
			control.topRadius = 0;
			control.bottomRadius = 5;
			expect(control.path).toBe(
				"M 0.5,0.5 Q 0.5,0.5 0.5,0.5 H 19.5 Q 19.5,0.5 19.5,0.5 " +
				"V 44.5 Q 19.5,49.5 14.5,49.5 H 5.5 Q 0.5,49.5 0.5,44.5 Z",
			);
		});

		it("should return a path with large bottom border radius", () => {
			control.topRadius = 0;
			control.bottomRadius = 1000;
			expect(control.path).toBe(
				"M 0.5,0.5 Q 0.5,0.5 0.5,0.5 H 19.5 Q 19.5,0.5 19.5,0.5 " +
				"V 0.5 Q 19.5,49.5 10,49.5 H 10 Q 0.5,49.5 0.5,0.5 Z",
			);
		});

		it("should return a path with both partial border radii", () => {
			control.topRadius = 5;
			control.bottomRadius = 5;
			expect(control.path).toBe(
				"M 0.5,5.5 Q 0.5,0.5 5.5,0.5 H 14.5 Q 19.5,0.5 19.5,5.5 " +
				"V 44.5 Q 19.5,49.5 14.5,49.5 H 5.5 Q 0.5,49.5 0.5,44.5 Z",
			);
		});

		it("should return a path with both large border radii", () => {
			control.topRadius = 300;
			control.bottomRadius = 200;
			expect(control.path).toBe(
				"M 0.5,29.9 Q 0.5,0.5 10,0.5 H 10 Q 19.5,0.5 19.5,29.9 " +
				"V 29.9 Q 19.5,49.5 10,49.5 H 10 Q 0.5,49.5 0.5,29.9 Z",
			);
		});
	});

	it("should account for rotation when getting edge positions", () => {
		control.rotation = 45;
		control.width = 20;
		control.height = 10;
		expect(control.leftX).toBeCloseTo(-1.49);
		expect(control.rightX).toBeCloseTo(21.49);
		expect(control.topY).toBeCloseTo(-6.49);
		expect(control.bottomY).toBeCloseTo(16.49);
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Rectangle);
		expect(json.topRadius).toBe(defaultRadius);
		expect(json.bottomRadius).toBe(defaultRadius);
		expect(json.rotation).toBe(defaultRotation);
	});
});
