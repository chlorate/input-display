import {CircleStickControl} from "./circle-stick-control";
import {ControlType} from "./json/control-json";

describe("CircleStickControl", () => {
	let control;

	beforeEach(() => {
		control = new CircleStickControl();
	});

	it("can return its type", () => {
		expect(control.type).toBe("Analog stick (circle)");
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.CircleStick);
	});
});
