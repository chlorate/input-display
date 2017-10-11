import {ButtonType} from "./json/button-json";
import {NormalButton} from "./normal-button";

describe("NormalButton", () => {
	let button;

	describe("fromJSON", () => {
		it("can create a button with only required properties", () => {
			button = NormalButton.fromJSON({
				type: ButtonType.Normal,
				index: 1,
			});
			expect(button.index).toBe(1);
			expect(button.presses).toBe(0);
			expect(button.bestMashSpeed).toBe(0);
		});

		it("can create a button with all optional properties", () => {
			button = NormalButton.fromJSON({
				type: ButtonType.Normal,
				index: 1,
				presses: 2,
				bestMashSpeed: 3,
			});
			expect(button.presses).toBe(2);
			expect(button.bestMashSpeed).toBe(3);
		});
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
