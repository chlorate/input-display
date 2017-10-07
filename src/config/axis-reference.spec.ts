import {Controller} from "../controller/controller";
import * as service from "../gamepad/service";
import {AxisReference} from "./axis-reference";
import {Config} from "./config";

describe("AxisReference", () => {
	let controller;
	let reference;

	beforeEach(() => {
		reference = new AxisReference(1, false);

		controller = new Controller(new Config());
		spyOn(service, "getGamepads").and.returnValue([{
			axes: [0.1, 0.2],
			buttons: [],
		}]);
		controller.poll();
	});

	it("should not accept a negative index", () => {
		reference.index = -1;
		expect(reference.index).toBe(0);
	});

	describe("resolveAxis", () => {
		it("should return the axis if found", () => {
			expect(reference.resolveAxis(controller)).toBe(controller.axes[1]);
		});

		it("should return undefined if no axis was found", () => {
			reference.index = 2;
			expect(reference.resolveAxis(controller)).toBeUndefined();
		});
	});

	describe("resolveValue", () => {
		it("should return the value when the axis is found and the reference is not inverted", () => {
			expect(reference.resolveValue(controller)).toBe(0.2);
		});

		it("should return the inverted value when the axis is found and the reference is inverted", () => {
			reference.inverted = true;
			expect(reference.resolveValue(controller)).toBe(-0.2);
		});

		it("should return undefined if no axis was found", () => {
			reference.index = 2;
			expect(reference.resolveValue(controller)).toBeUndefined();
		});
	});
});
