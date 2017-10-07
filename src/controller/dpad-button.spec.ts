import {Direction} from "./direction";
import {DpadButton} from "./dpad-button";

describe("DpadButton", () => {
	it("should have a name", () => {
		const button = new DpadButton(Direction.Right);
		expect(button.name).toBe("D-pad right");
	});
});
