import {Config} from "../config/config";
import * as service from "../gamepad/service";
import {Controller} from "./controller";
import {orderedDirections} from "./direction";

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
			expect(controller.axes[0].value).toBe(0.1);
			expect(controller.axes[1].value).toBe(0.2);

			gamepad.axes[0] = 0.3;
			jasmine.clock().tick(20);
			expect(controller.axes[0].value).toBe(0.3);
		});

		it("should update buttons", () => {
			spyOnGetGamepads(gamepad);
			controller.poll();
			expect(controller.buttons.length).toBe(2);
			expect(controller.buttons[0].index).toBe(0);
			expect(controller.buttons[0].pressed).toBe(false);
			expect(controller.buttons[1].index).toBe(1);
			expect(controller.buttons[1].pressed).toBe(true);

			gamepad.buttons[0].pressed = true;
			jasmine.clock().tick(20);
			expect(controller.buttons[0].pressed).toBe(true);
		});

		it("should update d-pad buttons if single axis mapping is set", () => {
			config.dpadAxisIndex = 1;
			spyOnGetGamepads(gamepad);
			controller.poll();
			expect(controller.buttons.length).toBe(6);
			orderedDirections.forEach((direction, i) => {
				expect(controller.buttons[i + 2].direction).toBe(direction);
			});

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
				orderedDirections.forEach((direction, i) => {
					expect(controller.buttons[i + 2].pressed).toBe(test.pressed[i]);
				});
			}
		});
	});
});
