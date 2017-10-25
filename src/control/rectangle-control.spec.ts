import {ControlType} from "./json/control-json";
import {defaultRotation, maxRotation, minRotation, RectangleControl} from "./rectangle-control";

describe("RectangleControl", () => {
	let control;

	beforeEach(() => {
		control = new RectangleControl();
	});

	it("should clamp rotation", () => {
		control.rotation = -1000;
		expect(control.rotation).toBe(minRotation);
		control.rotation = 1000;
		expect(control.rotation).toBe(maxRotation);
	});

	it("includes type in its JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Rectangle);
		expect(json.rotation).toBe(defaultRotation);
	});
});
