import {getGamepadIds} from "./service";

describe("gamepad/service", () => {
	beforeEach(() => {
		// PhantomJS shim:
		if (!navigator.getGamepads) {
			navigator.getGamepads = () => {};
		}

		spyOn(navigator, "getGamepads").and.returnValue([
			{id: "Unknown Gamepad (Vendor: 057e Product: 0306)"},
			null,
			null,
			{id: "Gamepad 3"},
		]);
	});

	describe("getGamepadIds", () => {
		it("should return IDs, possibly aliased", () => {
			expect(getGamepadIds()).toEqual([
				"Wii Remote",
				undefined,
				undefined,
				"Gamepad 3",
			]);
		});
	});
});
