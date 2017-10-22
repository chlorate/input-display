import {getGamepadIds} from "./service";

describe("getGamepadIds", () => {
	it("should return IDs", () => {
		spyOn(navigator, "getGamepads").and.returnValue([
			{id: "Gamepad 1"},
			undefined,
			undefined,
			{id: "Gamepad 3"},
		]);
		expect(getGamepadIds()).toEqual([
			"Gamepad 1",
			undefined,
			undefined,
			"Gamepad 3",
		]);
	});
});
