import {AxisReference} from "../config/axis-reference";
import {Config} from "../config/config";
import * as service from "../gamepad/service";
import {Controller} from "./controller";
import {sortedDirections} from "./direction";

describe("Controller", () => {
	let config;
	let controller;
	let gamepad;

	beforeEach(() => {
		config = new Config();
		controller = new Controller(config);
		gamepad = {
			id: "Test Gamepad",
			mapping: "standard",
			axes: [0.1, 0.2],
			buttons: [{pressed: false}, {pressed: true}],
		};

		jasmine.clock().install();
	});

	afterEach(() => {
		controller.stopPoll();
		jasmine.clock().uninstall();
	});

	it("can return the gamepad's alias", () => {
		expect(controller.alias).toBeUndefined();
		spyOn(service, "getGamepads").and.returnValue([gamepad]);
		controller.poll();
		expect(controller.alias).toBeUndefined();
		gamepad.id = "Unknown Gamepad (Vendor: 057e Product: 0306)";
		jasmine.clock().tick(20);
		expect(controller.alias).toBe("Wii Remote");
	});

	describe("marshal", () => {
		it("should return an object", () => {
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			expect(controller.marshal()).toEqual({
				axes: [
					{
						neutralValue: 0.1,
						minValue: 0.1,
						maxValue: 0.1,
					},
					{
						neutralValue: 0.2,
						minValue: 0.2,
						maxValue: 0.2,
					},
				],
			});
		});

		it("can return an empty object if there are no axes or buttons", () => {
			expect(controller.marshal()).toEqual({});
		});
	});

	describe("unmarshal", () => {
		beforeEach(() => {
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
		});

		it("should update as expected", () => {
			controller.unmarshal({
				axes: [
					{
						neutralValue: 0.5,
					},
				],
			});
			expect(controller.axes.length).toBe(1);
			expect(controller.axes[0].neutralValue).toBe(0.5);
		});

		it("should handle an empty object", () => {
			controller.unmarshal({});
			expect(controller.axes.length).toBe(0);
		});

		it("should do nothing if not passed a ControllerObject", () => {
			controller.unmarshal("bad");
			expect(controller.axes.length).toBe(2);
		});
	});

	it("can reset axes", () => {
		spyOn(service, "getGamepads").and.returnValue([gamepad]);
		controller.poll();
		gamepad.axes.pop();
		controller.resetAxes();
		expect(controller.axes.length).toBe(1);
	});

	it("can reset buttons", () => {
		spyOn(service, "getGamepads").and.returnValue([gamepad]);
		controller.poll();
		gamepad.buttons.pop();
		controller.resetButtons();
		expect(controller.buttons.length).toBe(1);
	});

	describe("poll", () => {
		it("should update according to the poll rate", () => {
			config.pollRate = 1;
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			expect(service.getGamepads).toHaveBeenCalledTimes(1);
			jasmine.clock().tick(900);
			expect(service.getGamepads).toHaveBeenCalledTimes(1);
			jasmine.clock().tick(200);
			expect(service.getGamepads).toHaveBeenCalledTimes(2);
		});

		it("should do nothing if no gamepad is found", () => {
			spyOn(service, "getGamepads").and.returnValue([]);
			controller.poll();
			expect(controller.axes.length).toBe(0);
			expect(controller.buttons.length).toBe(0);
		});

		it("should store gamepad data", () => {
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			expect(controller.id).toBe("Test Gamepad");
			expect(controller.alias).toBeUndefined();
			expect(controller.mapping).toBe("standard");
		});

		it("should clear gamepad data if controller is disconnected", () => {
			spyOn(service, "getGamepads").and.returnValues([gamepad], []);
			controller.poll();
			jasmine.clock().tick(20);
			expect(controller.id).toBeUndefined();
			expect(controller.alias).toBeUndefined();
			expect(controller.mapping).toBeUndefined();
		});

		it("should update axes", () => {
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			expect(controller.axes.length).toBe(2);
			[0.1, 0.2].forEach((value, i) => {
				expect(controller.axes[i].value).toBe(value);
			});

			gamepad.axes[0] = 0.3;
			jasmine.clock().tick(20);
			expect(controller.axes[0].value).toBe(0.3);
		});

		it("should update buttons", () => {
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			expect(controller.buttons.length).toBe(2);
			[false, true].forEach((pressed, i) => {
				expect(controller.buttons[i].index).toBe(i);
				expect(controller.buttons[i].pressed).toBe(pressed);
			});

			gamepad.buttons[0].pressed = true;
			jasmine.clock().tick(20);
			expect(controller.buttons[0].pressed).toBe(true);
		});

		describe("when the d-pad mapping is single axis", () => {
			beforeEach(() => {
				config.dpadAxisIndex = 1;
				spyOn(service, "getGamepads").and.returnValue([gamepad]);
				controller.poll();
			});

			it("should have created d-pad buttons", () => {
				checkDpadButtonsExist();
			});

			[
				{
					value: 0,
					pressed: [false, false, false, false],
				},
				{
					value: -1,
					pressed: [true, false, false, false],
				},
				{
					value: -5 / 7,
					pressed: [true, true, false, false],
				},
				{
					value: -3 / 7,
					pressed: [false, true, false, false],
				},
				{
					value: -1 / 7,
					pressed: [false, true, true, false],
				},
				{
					value: 1 / 7,
					pressed: [false, false, true, false],
				},
				{
					value: 3 / 7,
					pressed: [false, false, true, true],
				},
				{
					value: 5 / 7,
					pressed: [false, false, false, true],
				},
				{
					value: 1,
					pressed: [true, false, false, true],
				},
			].forEach((test) => {
				it(`should have expected directions pressed when axis value is ${test.value}`, () => {
					gamepad.axes[1] = test.value;
					jasmine.clock().tick(20);
					checkDpadButtonsPressed(test.pressed);
				});
			});
		});

		it("should not fail if single axis mapping points to missing axis", () => {
			controller.dpadAxisIndex = 123;
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			expect(controller.buttons.length).toBe(2);
		});

		describe("when the d-pad mapping is dual axes", () => {
			beforeEach(() => {
				config.setDpadDualAxes(new AxisReference(0, false), new AxisReference(1, false));
				spyOn(service, "getGamepads").and.returnValue([gamepad]);
				controller.poll();
			});

			it("should have created d-pad buttons", () => {
				checkDpadButtonsExist();
			});

			[
				{
					x: 0, y: 0,
					pressed: [false, false, false, false],
				},
				{
					x: 0, y: -1,
					pressed: [true, false, false, false],
				},
				{
					x: 1, y: 0,
					pressed: [false, true, false, false],
				},
				{
					x: 0, y: 1,
					pressed: [false, false, true, false],
				},
				{
					x: -1, y: 0,
					pressed: [false, false, false, true],
				},
			].forEach((test) => {
				it(`should have expected directions pressed when axis values are (${test.x}, ${test.y})`, () => {
					gamepad.axes[0] = test.x;
					gamepad.axes[1] = test.y;
					jasmine.clock().tick(20);
					checkDpadButtonsPressed(test.pressed);
				});
			});
		});

		it("should not fail if dual axes mapping points to missing axes", () => {
			config.setDpadDualAxes(new AxisReference(8, false), new AxisReference(9, false));
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			expect(controller.buttons.length).toBe(2);
		});

		function checkDpadButtonsExist() {
			expect(controller.buttons.length).toBe(6);
			sortedDirections.forEach((direction, i) => {
				expect(controller.buttons[i + 2].direction).toBe(direction);
			});
		}

		function checkDpadButtonsPressed(pressed: boolean[]) {
			sortedDirections.forEach((direction, i) => {
				expect(controller.buttons[i + 2].pressed).toBe(pressed[i]);
			});
		}

		it("should sort buttons if new buttons are detected", () => {
			config.dpadAxisIndex = 1;
			spyOn(service, "getGamepads").and.returnValue([gamepad]);
			controller.poll();
			gamepad.buttons.push({pressed: false});
			jasmine.clock().tick(20);
			expect(controller.buttons.map((button) => button.name)).toEqual([
				"Button 1",
				"Button 2",
				"Button 3",
				"D-pad up",
				"D-pad right",
				"D-pad down",
				"D-pad left",
			]);
		});
	});
});
