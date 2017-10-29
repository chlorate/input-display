import {AxisReference} from "../config/axis-reference";
import {ControlJSON, ControlType} from "./json/control-json";
import {defaultInnerSize, defaultOuterSize, maxSize, minSize, StickControl} from "./stick-control";

class TestControl extends StickControl {
	get type(): string {
		throw new Error("not implemented");
	}

	public toJSON(): ControlJSON {
		const json = {type: ControlType.CircleStick};
		return Object.assign(json, super.toBaseJSON()) as ControlJSON;
	}
}

describe("StickControl", () => {
	let control;

	beforeEach(() => {
		control = new TestControl();
	});

	it("should clamp outer size", () => {
		control.outerSize = -1;
		expect(control.outerSize).toBe(minSize);
		control.outerSize = 5000;
		expect(control.outerSize).toBe(maxSize);
	});

	it("should clamp inner size", () => {
		control.innerSize = -1;
		expect(control.innerSize).toBe(minSize);
		control.innerSize = 5000;
		expect(control.innerSize).toBe(maxSize);
	});

	it("can return position of control center", () => {
		control.outerSize = 100;
		expect(control.centerX).toBe(50);
		expect(control.centerY).toBe(50);
	});

	it("can return positions of control bottom and right sides", () => {
		control.outerSize = 50;
		control.borderWidth = 11;
		expect(control.rightX).toBe(55.5);
		expect(control.bottomY).toBe(55.5);
	});

	describe("toBaseJSON", () => {
		it("can return a partial JSON representation", () => {
			const json = control.toJSON();
			expect(json.outerSize).toBe(defaultOuterSize);
			expect(json.innerSize).toBe(defaultInnerSize);
		});

		it("can include axis references", () => {
			control.xAxis = new AxisReference(0, false);
			control.yAxis = new AxisReference(1, true);
			const json = control.toJSON();
			expect(json.xAxis).toEqual({
				index: 0,
				inverted: false,
			});
			expect(json.yAxis).toEqual({
				index: 1,
				inverted: true,
			});
		});
	});
});
