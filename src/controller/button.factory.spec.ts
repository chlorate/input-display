import {parseButtonJSON} from "./button.factory";
import {Direction} from "./direction";
import {ButtonType} from "./json/button-json";

describe("parseButtonJSON", () => {
	let button;

	it("can create a NormalButton", () => {
		button = parseButtonJSON({
			type: ButtonType.Normal,
			index: 0,
			presses: 1,
			bestMashSpeed: 2,
		});
		expect(button.index).toBe(0);
		expect(button.presses).toBe(1);
		expect(button.bestMashSpeed).toBe(2);
	});

	it("can create a DpadButton", () => {
		button = parseButtonJSON({
			type: ButtonType.Dpad,
			direction: Direction.Up,
			presses: 1,
			bestMashSpeed: 2,
		});
		expect(button.direction).toBe(Direction.Up);
		expect(button.presses).toBe(1);
		expect(button.bestMashSpeed).toBe(2);
	});
});
