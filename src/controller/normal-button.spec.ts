import {ButtonType} from "./json/button-json";
import {NormalButton} from "./normal-button";

describe("NormalButton", () => {
	let button;

	it("can be created from a JSON representation", () => {
		button = NormalButton.fromJSON({
			type: ButtonType.Normal,
			index: 1,
			presses: 123,
			bestMashSpeed: 30,
		});
		expect(button.index).toBe(1);
		expect(button.presses).toBe(123);
		expect(button.bestMashSpeed).toBe(30);
	});

	it("should not accept a negative index", () => {
		button = new NormalButton(-1);
		expect(button.index).toBe(0);
	});

	it("should have a name", () => {
		button = new NormalButton(123);
		expect(button.name).toBe("Button 124");
	});

	it("can return a JSON representation", () => {
		button = new NormalButton(123);
		expect(button.toJSON()).toEqual({
			type: ButtonType.Normal,
			index: 123,
			presses: 0,
			bestMashSpeed: 0,
		});
	});
});
