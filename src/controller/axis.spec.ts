import {Axis} from "./axis";
import {dpadNeutralValue} from "./direction";

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

	describe("dpad", () => {
		it("should be true if axis has d-pad neutral value", () => {
			axis.value = dpadNeutralValue;
			expect(axis.dpad).toBe(true);
		});

		it("should be false for all other neutral values", () => {
			axis.value = 0;
			expect(axis.dpad).toBe(false);
		});
	});

	it("can be calibrated", () => {
		axis.value = dpadNeutralValue;
		rotate();
		axis.calibrate();
		expect(axis.minValue).toBeUndefined();
		expect(axis.neutralValue).toBeUndefined();
		expect(axis.maxValue).toBeUndefined();
		expect(axis.dpad).toBe(false);
	});
});
