import {Controller} from "../controller/controller";
import {ButtonType} from "../controller/json/button-json";
import {Direction4} from "../direction/direction4";
import {Config} from "./config";
import {DpadButtonReference} from "./dpad-button-reference";

describe("DpadButtonReference", () => {
	let reference;
	let controller;

	beforeEach(() => {
		reference = new DpadButtonReference(Direction4.Down);

		controller = new Controller(new Config());
		controller.loadJSON({
			axes: [],
			buttons: [
				{
					type: ButtonType.Normal,
					index: 0,
					presses: 0,
					bestMashSpeed: 0,
				},
				{
					type: ButtonType.Dpad,
					direction: Direction4.Up,
					presses: 0,
					bestMashSpeed: 0,
				},
				{
					type: ButtonType.Dpad,
					direction: Direction4.Down,
					presses: 0,
					bestMashSpeed: 0,
				},
			],
		});
	});

	it("has a name", () => {
		expect(reference.name).toBe("D-pad down");
	});

	it("can return a JSON representation", () => {
		expect(reference.toJSON()).toEqual({
			type: ButtonType.Dpad,
			direction: Direction4.Down,
		});
	});

	describe("resolve", () => {
		it("should return the button if found", () => {
			expect(reference.resolve(controller)).toBe(controller.buttons[2]);
		});

		it("should return undefined if no button was found", () => {
			reference.direction = Direction4.Left;
			expect(reference.resolve(controller)).toBeUndefined();
		});
	});
});
