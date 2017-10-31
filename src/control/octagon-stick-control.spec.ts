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

	it("can return a path", () => {
		control.borderWidth = 1;
		expect(control.path).toBe(
			"M 49.500 25.000 L 42.324 42.324 L 25.000 49.500 L 7.676 42.324 " +
			"L 0.500 25.000 L 7.676 7.676 L 25.000 0.500 L 42.324 7.676 Z",
		);
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.OctagonStick);
	});
});
