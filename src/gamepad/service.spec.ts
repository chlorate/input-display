import {getGamepadIds} from "./service";

describe("gamepad/service", () => {
	beforeEach(() => {
		spyOn(navigator, "getGamepads").and.returnValue([
			{id: "Unknown Gamepad (Vendor: 057e Product: 0306)"},
			undefined,
			undefined,
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