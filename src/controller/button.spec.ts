import {secondToMilliseconds} from "../time";
import {Button} from "./button";

describe("Button", () => {
	let button;

	beforeEach(() => {
		button = new Button(123);

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

	it("should not accept a negative index", () => {
		button = new Button(-1);
		expect(button.index).toBe(0);
	});

	it("should have a name", () => {
		expect(button.name).toBe("Button 123");
	});

	describe("presses", () => {
		it("should increment presses when pressed", () => {
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
	});

	it("should track mash speed over the last second", () => {
		mash();
		expect(button.mashSpeed).toBe(5);
	});

	it("should track best mash speed", () => {
		mash();
		for (let i = 0; i < 10; i++) {
			button.pressed = false;
		}
		expect(button.bestMashSpeed).toBe(5);
	});

	it("can be reset", () => {
		mash();
		button.reset();
		expect(button.presses).toBe(0);
		expect(button.mashSpeed).toBe(0);
		expect(button.bestMashSpeed).toBe(0);
	});
});
