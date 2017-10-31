import {AxisReference} from "../config/axis-reference";
import {Config} from "../config/config";
import {Axis} from "../controller/axis";
import {Controller} from "../controller/controller";
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

	describe("getInnerX", () => {
		let controller;
		let axis;

		beforeEach(() => {
			controller = new Controller(new Config());
			axis = new Axis();
			axis.neutralValue = 0.1;
			axis.minValue = -0.4;
			axis.maxValue = 0.5;
			controller.axes.push(axis);
			control.xAxis = new AxisReference(0, false);
		});

		it("should return center if reference is undefined", () => {
			control.xAxis = undefined;
			expect(control.getInnerX(controller)).toBe(25);
		});

		it("should return center if axis is not found", () => {
			control.xAxis.index = 10;
			expect(control.getInnerX(controller)).toBe(25);
		});

		it("should return center if axis has no neutral value", () => {
			axis.neutralValue = undefined;
			expect(control.getInnerX(controller)).toBe(25);
		});

		it("should return center if axis has no minimum value", () => {
			axis.value = -0.5;
			axis.minValue = undefined;
			control.xAxis = new AxisReference(0, false);
			expect(control.getInnerX(controller)).toBe(25);
		});

		it("should return center if axis has no maximum value", () => {
			axis.value = 0.5;
			axis.maxValue = undefined;
			expect(control.getInnerX(controller)).toBe(25);
		});

		it("should return left of center if axis value is less than neutral", () => {
			axis.value = -0.2;
			expect(control.getInnerX(controller)).toBeCloseTo(14.5);
		});

		it("should return far left if axis value is equal to minimum", () => {
			axis.value = -0.4;
			expect(control.getInnerX(controller)).toBeCloseTo(7.5);
		});

		it("should return far right if inverted and axis value is equal to minimum", () => {
			axis.value = -0.4;
			control.xAxis.inverted = true;
			expect(control.getInnerX(controller)).toBeCloseTo(42.5);
		});

		it("should return right of center if axis value is greater than neutral", () => {
			axis.value = 0.3;
			expect(control.getInnerX(controller)).toBeCloseTo(33.75);
		});

		it("should return far right if axis value is equal to maximum", () => {
			axis.value = 0.5;
			expect(control.getInnerX(controller)).toBeCloseTo(42.5);
		});

		it("should return far left if inverted and axis value is equal to maximum", () => {
			axis.value = 0.5;
			control.xAxis.inverted = true;
			expect(control.getInnerX(controller)).toBeCloseTo(7.5);
		});

		it("should use minimum shift if inner size is greater than outer size", () => {
			control.innerSize = 1000;
			axis.value = 0.5;
			expect(control.getInnerX(controller)).toBeCloseTo(37.5);
		});
	});

	it("can return inner y-position", () => {
		const controller = new Controller(new Config());
		const axis = new Axis();
		axis.neutralValue = 0.1;
		axis.value = -0.5;
		controller.axes.push(axis);
		control.yAxis = new AxisReference(0, false);
		expect(control.getInnerY(controller)).toBeCloseTo(7.5);
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
