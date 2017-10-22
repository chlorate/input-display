import {EllipseControl} from "./ellipse-control";
import {ControlType} from "./json/control-json";

describe("EllipseControl", () => {
	it("includes type in its JSON representation", () => {
		const control = new EllipseControl();
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.Ellipse);
	});
});
