import {Direction4} from "../direction/direction4";
import {DpadButton} from "./dpad-button";
import {ButtonType} from "./json/button-json";

describe("DpadButton", () => {
	let button;

	it("should have a name", () => {
		button = new DpadButton(Direction4.Right);
		expect(button.name).toBe("D-pad right");
	});

	it("can return a JSON representation", () => {
		button = new DpadButton(Direction4.Left);
		expect(button.toJSON()).toEqual({
			type: ButtonType.Dpad,
			direction: Direction4.Left,
			presses: 0,
			bestMashSpeed: 0,
		});
	});
});
