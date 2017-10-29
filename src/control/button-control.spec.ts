import {ButtonControl, defaultSize, maxHeight, maxWidth, minHeight, minWidth} from "./button-control";
import {ControlJSON, ControlType} from "./json/control-json";

class TestControl extends ButtonControl {
	public toJSON(): ControlJSON {
		const json = {type: ControlType.Ellipse};
		return Object.assign(json, super.toBaseJSON()) as ControlJSON;
	}
}

describe("ButtonControl", () => {
	let control;

	beforeEach(() => {
		control = new TestControl();
	});

	it("should clamp width", () => {
		control.width = -1;
		expect(control.width).toBe(minWidth);
		control.width = 5000;
		expect(control.width).toBe(maxWidth);
	});

	it("should clamp height", () => {
		control.height = -1;
		expect(control.height).toBe(minHeight);
		control.height = 5000;
		expect(control.height).toBe(maxHeight);
	});

	it("can return x-position of control center", () => {
		control.width = 100;
		expect(control.centerX).toBe(50);
	});

	it("can return x-position of control right", () => {
		control.width = 50;
		control.borderWidth = 11;
		expect(control.rightX).toBe(55.5);
	});

	it("can return y-position of control center", () => {
		control.height = 50;
		expect(control.centerY).toBe(25);
	});

	it("can return y-position of control bottom", () => {
		control.height = 50;
		control.borderWidth = 11;
		expect(control.bottomY).toBe(55.5);
	});

	it("can return a partial JSON representation", () => {
		const json = control.toJSON();
		expect(json.width).toBe(defaultSize);
		expect(json.height).toBe(defaultSize);
	});
});
