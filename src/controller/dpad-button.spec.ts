import {Direction} from "./direction";
import {DpadButton} from "./dpad-button";
import {ButtonType} from "./json/button-json";

describe("DpadButton", () => {
	let button;

	describe("fromJSON", () => {
		it("can create a button with only required properties", () => {
			button = DpadButton.fromJSON({
				type: ButtonType.Dpad,
				direction: Direction.Left,
			});
			expect(button.direction).toBe(Direction.Left);
			expect(button.presses).toBe(0);
			expect(button.bestMashSpeed).toBe(0);
		});

		it("can create a button with all optional properties", () => {
			button = DpadButton.fromJSON({
				type: ButtonType.Dpad,
				direction: Direction.Left,
				presses: 1,
				bestMashSpeed: 2,
			});
			expect(button.presses).toBe(1);
			expect(button.bestMashSpeed).toBe(2);
		});
	});

	it("should have a name", () => {
		button = new DpadButton(Direction.Right);
		expect(button.name).toBe("D-pad right");
	});

	it("can return a JSON representation", () => {
		button = new DpadButton(Direction.Left);
		expect(button.toJSON()).toEqual({
			type: ButtonType.Dpad,
			direction: Direction.Left,
			presses: 0,
			bestMashSpeed: 0,
		});
	});
});
