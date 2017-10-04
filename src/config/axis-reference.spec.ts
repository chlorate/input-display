import {AxisReference} from "./axis-reference";

describe("AxisReference", () => {
	let reference;

	beforeEach(() => {
		reference = new AxisReference(123, false);
	});

	it("should not accept a negative index", () => {
		reference.index = -1;
		expect(reference.index).toBe(0);
	});
});
