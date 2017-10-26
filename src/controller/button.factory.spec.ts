import {Direction4} from "../direction/direction4";
import {parseButtonJSON} from "./button.factory";
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
			direction: Direction4.Up,
			presses: 1,
			bestMashSpeed: 2,
		});
		expect(button.direction).toBe(Direction4.Up);
		expect(button.presses).toBe(1);
		expect(button.bestMashSpeed).toBe(2);
	});
});
