import {Direction} from "./direction";
import {DpadButton} from "./dpad-button";

describe("DpadButton", () => {
	it("should have a name", () => {
		const button = new DpadButton(123, Direction.Right);
		expect(button.name).toBe("D-pad right");
	});
});
