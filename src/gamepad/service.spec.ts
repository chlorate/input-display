import {getGamepadIds} from "./service";

describe("getGamepadIds", () => {
	it("should return IDs, possibly aliased", () => {
		spyOn(navigator, "getGamepads").and.returnValue([
			{id: "Unknown Gamepad (Vendor: 057e Product: 0306)"},
			undefined,
			undefined,
			{id: "Gamepad 3"},
		]);
		expect(getGamepadIds()).toEqual([
			"Wii Remote",
			undefined,
			undefined,
			"Gamepad 3",
		]);
	});
});
