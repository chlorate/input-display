import {ButtonType} from "../controller/json/button-json";
import {Direction4} from "../direction/direction4";
import {parseButtonReferenceJSON} from "./button-reference.factory";

describe("parseButtonReferenceJSON", () => {
	let reference;

	it("can create a NormalButtonReference", () => {
		reference = parseButtonReferenceJSON({
			type: ButtonType.Normal,
			index: 2,
		});
		expect(reference.index).toBe(2);
	});

	it("can create a DpadButtonReference", () => {
		reference = parseButtonReferenceJSON({
			type: ButtonType.Dpad,
			direction: Direction4.Left,
		});
		expect(reference.direction).toBe(Direction4.Left);
	});
});
