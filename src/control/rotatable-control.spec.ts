import {Point} from "../math/point";
import {ControlJSON} from "./json/control-json";
import {maxRotation, minRotation, RotatableControl} from "./rotatable-control";

class TestControl extends RotatableControl {
	public toJSON(): ControlJSON {
		throw new Error("not implemented");
	}

	protected getEdgePoints(): Point[] {
		throw new Error("not implemented");
	}
}

describe("RotatableControl", () => {
	let control;

	beforeEach(() => {
		control = new TestControl();
	});

	it("should clamp rotation", () => {
		control.rotation = -1000;
		expect(control.rotation).toBe(minRotation);
		control.rotation = 1000;
		expect(control.rotation).toBe(maxRotation);
	});

	it("can return an SVG transform", () => {
		control.width = 10;
		control.height = 20;
		control.rotation = 45;
		expect(control.transform).toBe("rotate(45 5 10)");
	});
});
