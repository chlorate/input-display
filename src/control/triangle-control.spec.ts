import {ControlType} from "./json/control-json";
import {defaultDirection, TriangleControl} from "./triangle-control";

describe("TriangleControl", () => {
	it("can return a JSON representation", () => {
		const control = new TriangleControl();
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Triangle);
		expect(json.direction).toBe(defaultDirection);
	});
});
