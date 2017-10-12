import {isConfigJSON} from "./config-json";

describe("ConfigJSON", () => {
	it("should return true if only required properties are set", () => {
		const json = {
			gamepadIndex: 0,
			pollRate: 60,
		};
		expect(isConfigJSON(json)).toBe(true);
	});

	it("should return true if all optional properties are set", () => {
		const json = {
			gamepadIndex: 0,
			dpadAxisIndex: 0,
			dpadXAxis: {
				index: 1,
				inverted: false,
			},
			dpadYAxis: {
				index: 2,
				inverted: true,
			},
			pollRate: 60,
		};
		expect(isConfigJSON(json)).toBe(true);
	});

	it("should return false if not an object", () => {
		expect(isConfigJSON("bad")).toBe(false);
	});

	it("should return false if gamepadIndex is not numeric", () => {
		expect(isConfigJSON({gamepadIndex: "bad"})).toBe(false);
	});

	it("should return false if dpadAxisIndex is not numeric", () => {
		expect(isConfigJSON({dpadAxisIndex: "bad"})).toBe(false);
	});

	it("should return false if dpadXAxis is not an AxisReferenceJSON object", () => {
		expect(isConfigJSON({dpadXAxis: "bad"})).toBe(false);
	});

	it("should return false if dpadYAxis is not an AxisReferenceJSON object", () => {
		expect(isConfigJSON({dpadYAxis: "bad"})).toBe(false);
	});

	it("should return false if pollRate is not numeric", () => {
		expect(isConfigJSON({pollRate: "bad"})).toBe(false);
	});
});
