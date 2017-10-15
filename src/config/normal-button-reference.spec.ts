import {Controller} from "../controller/controller";
import {Direction} from "../controller/direction";
import {ButtonType} from "../controller/json/button-json";
import {Config} from "./config";
import {NormalButtonReference} from "./normal-button-reference";

describe("NormalButtonReference", () => {
	let reference;
	let controller;

	beforeEach(() => {
		reference = new NormalButtonReference(1);

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
					direction: Direction.Up,
					presses: 0,
					bestMashSpeed: 0,
				},
				{
					type: ButtonType.Normal,
					index: 1,
					presses: 0,
					bestMashSpeed: 0,
				},
			],
		});
	});

	it("has a name", () => {
		expect(reference.name).toBe("Button 2");
	});

	it("should not accept a negative index", () => {
		reference.index = -1;
		expect(reference.index).toBe(0);
	});

	it("can return a JSON representation", () => {
		expect(reference.toJSON()).toEqual({
			type: ButtonType.Normal,
			index: 1,
		});
	});

	describe("resolve", () => {
		it("should return the button if found", () => {
			expect(reference.resolve(controller)).toBe(controller.buttons[2]);
		});

		it("should return undefined if no button was found", () => {
			reference.index = 2;
			expect(reference.resolve(controller)).toBeUndefined();
		});
	});
});
