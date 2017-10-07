import {NormalButton} from "./normal-button";

describe("NormalButton", () => {
	it("should not accept a negative index", () => {
		const button = new NormalButton(-1);
		expect(button.index).toBe(0);
	});

	it("should have a name", () => {
		const button = new NormalButton(123);
		expect(button.name).toBe("Button 124");
	});
});
