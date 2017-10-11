import {secondToMilliseconds} from "../time/const";
import {Button} from "./button";
import {ButtonJSON, ButtonType} from "./json/button-json";

class TestButton extends Button {
	get name(): string {
		return "";
	}

	public toJSON(): ButtonJSON {
		return {
			type: ButtonType.Normal,
			index: 0,
		};
	}
}

describe("Button", () => {
	let button;

	beforeEach(() => {
		button = new TestButton();

		let now = 0;
		spyOn(window.performance, "now").and.callFake(() => {
			now += secondToMilliseconds / 10;
			return now;
		});
	});

	function mash() {
		for (let i = 0; i < 10; i++) {
			button.pressed = true;
			button.pressed = false;
		}
	}

	describe("pressed", () => {
		it("should increment presses when true", () => {
			button.pressed = true;
			expect(button.presses).toBe(1);
		});

		it("should not increment presses if held", () => {
			for (let i = 0; i < 5; i++) {
				button.pressed = true;
			}
			expect(button.presses).toBe(1);
		});

		it("should increment presses after being released", () => {
			mash();
			expect(button.presses).toBe(10);
		});

		it("should update best mash speed", () => {
			mash();
			for (let i = 0; i < 10; i++) {
				button.pressed = false;
			}
			expect(button.bestMashSpeed).toBe(5);
		});
	});

	it("should not allow presses to be negative", () => {
		button.presses = -1;
		expect(button.presses).toBe(0);
	});

	it("should track mash speed over the last second", () => {
		mash();
		expect(button.mashSpeed).toBe(5);
	});

	it("should not allow best mash speed to be negative", () => {
		button.bestMashSpeed = -1;
		expect(button.bestMashSpeed).toBe(0);
	});
});
