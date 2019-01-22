import {Axis} from "./axis";

describe("Axis", () => {
	let axis;

	beforeEach(() => {
		axis = new Axis();
	});

	function rotate() {
		// Simulate the values of one axis of an analog stick being rotated.
		for (let value = 0; value < 1; value += 0.1) {
			axis.value = value;
		}
		for (let value = 1; value > -1; value -= 0.1) {
			axis.value = value;
		}
		for (let value = -1; value < 0; value += 0.1) {
			axis.value = value;
		}
	}

	function twitch() {
		// Simulate values that are not indicative of normal operation.
		axis.value = 0;
		axis.value = -1;
		axis.value = 1;
		axis.value = 0;
	}

	it("can be created from a JSON representation", () => {
		axis = Axis.fromJSON({
			neutralValue: 0.1,
			minValue: -0.2,
			maxValue: 0.2,
		});
		expect(axis.neutralValue).toBe(0.1);
		expect(axis.minValue).toBe(-0.2);
		expect(axis.maxValue).toBe(0.2);
	});

	it("can return its inverted value", () => {
		axis.value = 0.123;
		expect(axis.invertedValue).toBe(-0.123);
	});

	describe("neutralValue", () => {
		it("should store first value as neutral value", () => {
			axis.value = 0.123;
			rotate();
			expect(axis.neutralValue).toBe(0.123);
		});

		it("cannot be less than minimum value", () => {
			axis.minValue = -0.1;
			axis.neutralValue = -0.2;
			expect(axis.neutralValue).toBe(-0.1);
		});

		it("cannot be greater than maximum value", () => {
			axis.maxValue = 0.1;
			axis.neutralValue = 0.2;
			expect(axis.neutralValue).toBe(0.1);
		});
	});

	describe("minValue", () => {
		it("should update if value remains out of bounds", () => {
			rotate();
			expect(axis.minValue).toBe(-1);
		});

		it("should not update due to one-off, abnormal values", () => {
			twitch();
			expect(axis.minValue).toBe(0);
		});

		it("cannot be less greater than neutral value", () => {
			axis.neutralValue = 0.1;
			axis.minValue = 0.2;
			expect(axis.minValue).toBe(0.1);
		});

		it("cannot be greater than maximum value", () => {
			axis.maxValue = 0.2;
			axis.minValue = 0.3;
			expect(axis.minValue).toBe(0.2);
		});
	});

	describe("maxValue", () => {
		it("should update if value remains out of bounds", () => {
			rotate();
			expect(axis.maxValue).toBe(1);
		});

		it("should not update due to one-off, abnormal values", () => {
			twitch();
			expect(axis.maxValue).toBe(0);
		});

		it("cannot be less than neutral value", () => {
			axis.neutralValue = -0.1;
			axis.maxValue = -0.2;
			expect(axis.maxValue).toBe(-0.1);
		});

		it("cannot be less than minimum value", () => {
			axis.minValue = -0.2;
			axis.maxValue = -0.3;
			expect(axis.maxValue).toBe(-0.2);
		});
	});

	describe("moved", () => {
		beforeEach(() => {
			axis.neutralValue = 0.1;
			axis.minValue = -0.5;
			axis.maxValue = 0.6;
		});

		it("should not be moved if neutral value is undefined", () => {
			axis.value = -0.5;
			axis.neutralValue = undefined;
			expect(axis.moved).toBe(false);
		});

		it("should not be moved if minimum value is undefined", () => {
			axis.value = -0.5;
			axis.minValue = undefined;
			expect(axis.moved).toBe(false);
		});

		it("should not be moved if maximum value is undefined", () => {
			axis.value = 0.6;
			axis.maxValue = undefined;
			expect(axis.moved).toBe(false);
		});

		it("should not be moved if less than threshold", () => {
			expect(axis.moved).toBe(false);
			axis.value = 0.1;
			expect(axis.moved).toBe(false);
			axis.value = 0.18;
			expect(axis.moved).toBe(false);
		});

		it("should be moved if at least the threshold", () => {
			axis.value = -0.5;
			expect(axis.moved).toBe(true);
			axis.value = -0.1;
			expect(axis.moved).toBe(true);
			axis.value = 0.2;
			expect(axis.moved).toBe(true);
			axis.value = 0.6;
			expect(axis.moved).toBe(true);
		});
	});

	it("can return a JSON representation", () => {
		rotate();
		expect(axis.toJSON()).toEqual({
			neutralValue: 0,
			minValue: -1,
			maxValue: 1,
		});
	});
});
