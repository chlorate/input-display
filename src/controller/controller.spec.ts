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
			axes: [0.1, 0.2],
			buttons: [{pressed: false}, {pressed: true}],
		};

		jasmine.clock().install();
	});

	afterEach(() => {
		jasmine.clock().uninstall();
	});

	function spyOnGetGamepads(value: Gamepad | null) {
		spyOn(service, "getGamepads").and.returnValue([value]);
	}

	describe("poll", () => {
		it("should update according to the poll rate", () => {
			config.pollRate = 1;
			spyOnGetGamepads(gamepad);
			controller.poll();
			expect(service.getGamepads).toHaveBeenCalledTimes(1);
			jasmine.clock().tick(900);
			expect(service.getGamepads).toHaveBeenCalledTimes(1);
			jasmine.clock().tick(200);
			expect(service.getGamepads).toHaveBeenCalledTimes(2);
		});

		it("should do nothing if no gamepad is found", () => {
			spyOnGetGamepads(null);
			controller.poll();
			expect(controller.axes.length).toBe(0);
			expect(controller.buttons.length).toBe(0);
		});

		it("should update axes", () => {
			spyOnGetGamepads(gamepad);
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
			spyOnGetGamepads(gamepad);
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

		it("should update d-pad buttons if single axis mapping is set", () => {
			config.dpadAxisIndex = 1;
			spyOnGetGamepads(gamepad);
			controller.poll();
			checkDpadButtonsExist();

			const tests = [
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
			];
			for (const test of tests) {
				gamepad.axes[1] = test.value;
				jasmine.clock().tick(20);
				checkDpadButtonsPressed(test.pressed);
			}
		});

		it("should not fail if single axis mapping points to missing axis", () => {
			controller.dpadAxisIndex = 123;
			spyOnGetGamepads(gamepad);
			controller.poll();
			expect(controller.buttons.length).toBe(2);
		});

		it("should update d-pad buttons if dual axes mapping is set", () => {
			config.setDpadDualAxes(new AxisReference(0, false), new AxisReference(1, false));
			spyOnGetGamepads(gamepad);
			controller.poll();
			checkDpadButtonsExist();

			const tests = [
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
			];
			for (const test of tests) {
				gamepad.axes[0] = test.x;
				gamepad.axes[1] = test.y;
				jasmine.clock().tick(20);
				checkDpadButtonsPressed(test.pressed);
			}
		});

		it("should not fail if dual axes mapping points to missing axes", () => {
			config.setDpadDualAxes(new AxisReference(8, false), new AxisReference(9, false));
			spyOnGetGamepads(gamepad);
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
	});
});
