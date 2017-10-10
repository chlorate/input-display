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

	it("can return a JSON representation", () => {
		rotate();
		expect(axis.toJSON()).toEqual({
			neutralValue: 0,
			minValue: -1,
			maxValue: 1,
		});
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
		it("should track minimum value", () => {
			rotate();
			expect(axis.minValue).toBe(-1);
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
		it("should track maximum value", () => {
			rotate();
			expect(axis.maxValue).toBe(1);
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
});
