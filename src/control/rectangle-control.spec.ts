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

	it("should account for rotation when getting edge positions", () => {
		control.rotation = 45;
		control.width = 20;
		control.height = 10;
		expect(control.leftX).toBeCloseTo(-1.49);
		expect(control.rightX).toBeCloseTo(21.49);
		expect(control.topY).toBeCloseTo(-6.49);
		expect(control.bottomY).toBeCloseTo(16.49);
	});

	it("includes type in its JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Rectangle);
		expect(json.rotation).toBe(defaultRotation);
	});
});
