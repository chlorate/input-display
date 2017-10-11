import {Direction} from "./direction";
import {DpadButton} from "./dpad-button";
import {ButtonType} from "./json/button-json";

describe("DpadButton", () => {
	it("should have a name", () => {
		const button = new DpadButton(Direction.Right);
		expect(button.name).toBe("D-pad right");
	});

	it("can return a JSON representation", () => {
		const button = new DpadButton(Direction.Left);
		expect(button.toJSON()).toEqual({
			type: ButtonType.Dpad,
			direction: Direction.Left,
			presses: 0,
			bestMashSpeed: 0,
		});
	});
});
