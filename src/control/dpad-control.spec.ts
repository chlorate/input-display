import {defaultDirection, DpadControl} from "./dpad-control";
import {ControlType} from "./json/control-json";

describe("DpadControl", () => {
	let control;

	beforeEach(() => {
		control = new DpadControl();
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Dpad);
		expect(json.direction).toBe(defaultDirection);
	});
});
