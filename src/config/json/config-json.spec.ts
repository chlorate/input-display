import {isConfigJSON} from "./config-json";

describe("ConfigJSON", () => {
	it("should return true for an empty object", () => {
		expect(isConfigJSON({})).toBe(true);
	});

	it("should return true for all valid, optional properties", () => {
		const json = {
			gamepadIndex: 0,
			dpadAxisIndex: 0,
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

	it("should return false if pollRate is not numeric", () => {
		expect(isConfigJSON({pollRate: "bad"})).toBe(false);
	});
});
