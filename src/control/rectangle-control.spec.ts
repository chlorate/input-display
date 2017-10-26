import {ControlType} from "./json/control-json";
import {RectangleControl} from "./rectangle-control";
import {defaultRotation} from "./rotatable-control";

describe("RectangleControl", () => {
	let control;

	beforeEach(() => {
		control = new RectangleControl();
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

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Rectangle);
		expect(json.rotation).toBe(defaultRotation);
	});
});
