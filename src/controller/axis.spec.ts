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
});
