import {ControlType} from "./json/control-json";
import {RectangleControl} from "./rectangle-control";

describe("RectangleControl", () => {
	it("includes type in its JSON representation", () => {
		const control = new RectangleControl();
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Rectangle);
	});
});
