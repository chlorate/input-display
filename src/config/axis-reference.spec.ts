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

	afterEach(() => {
		controller.stopPoll();
	});

	it("can be created from a JSON representation", () => {
		reference = AxisReference.fromJSON({
			index: 1,
			inverted: true,
		});
		expect(reference.index).toBe(1);
		expect(reference.inverted).toBe(true);
	});

	it("should not accept a negative index", () => {
		reference.index = -1;
		expect(reference.index).toBe(0);
	});

	it("can return a JSON representation", () => {
		reference.index = 1;
		reference.inverted = true;
		expect(reference.toJSON()).toEqual({
			index: 1,
			inverted: true,
		});
	});

	describe("resolve", () => {
		it("should return the axis if found", () => {
			expect(reference.resolve(controller)).toBe(controller.axes[1]);
		});

		it("should return undefined if no axis was found", () => {
			reference.index = 2;
			expect(reference.resolve(controller)).toBeUndefined();
		});
	});
});
