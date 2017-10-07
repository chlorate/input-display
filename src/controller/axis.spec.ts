import {Axis} from "./axis";

describe("Axis", () => {
	let axis;

	beforeEach(() => {
		axis = new Axis();
	});

	function rotate() {
		axis.value = 0;
		axis.value = 1;
		axis.value = -1;
		axis.value = 0;
	}

	it("can return its inverted value", () => {
		axis.value = 0.123;
		expect(axis.invertedValue).toBe(-0.123);
	});

	it("should store first value as neutral value", () => {
		axis.value = 0.123;
		rotate();
		expect(axis.neutralValue).toBe(0.123);
	});

	it("should track minimum value", () => {
		rotate();
		expect(axis.minValue).toBe(-1);
	});

	it("should track maximum value", () => {
		rotate();
		expect(axis.maxValue).toBe(1);
	});

	it("can be calibrated", () => {
		axis.value = 0.123;
		rotate();
		axis.calibrate();
		expect(axis.minValue).toBeUndefined();
		expect(axis.neutralValue).toBeUndefined();
		expect(axis.maxValue).toBeUndefined();
	});
});
