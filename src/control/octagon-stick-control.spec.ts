import {ControlType} from "./json/control-json";
import {OctagonStickControl} from "./octagon-stick-control";

describe("OctagonStickControl", () => {
	let control;

	beforeEach(() => {
		control = new OctagonStickControl();
	});

	it("can return its type", () => {
		expect(control.type).toBe("Analog stick (octagon)");
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.OctagonStick);
	});
});
