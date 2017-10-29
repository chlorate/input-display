import {EllipseButtonControl} from "./ellipse-button-control";
import {ControlType} from "./json/control-json";
import {defaultRotation} from "./rotatable-button-control";

describe("EllipseButtonControl", () => {
	let control;

	beforeEach(() => {
		control = new EllipseButtonControl();
	});

	describe("type", () => {
		it("returns circle if width and height are equal", () => {
			expect(control.type).toBe("Button (circle)");
		});

		it("returns ellipse otherwise", () => {
			control.width = control.height + 1;
			expect(control.type).toBe("Button (ellipse)");
		});
	});

	describe("edge positions", () => {
		it("should ignore rotation if circle", () => {
			control.rotation = 10;
			expect(control.leftX).toBe(-0.625);
			expect(control.rightX).toBe(24.625);
			expect(control.topY).toBe(-0.625);
			expect(control.bottomY).toBe(24.625);
		});

		it("should account for rotation if ellipse", () => {
			control.rotation = 45;
			control.width = 20;
			control.height = 10;
			expect(control.leftX).toBe(1.875);
			expect(control.rightX).toBe(18.125);
			expect(control.topY).toBe(-3.125);
			expect(control.bottomY).toBe(13.125);
		});
	});

	it("can return a JSON representation", () => {
		const json = control.toJSON();
		expect(json.type).toBe(ControlType.EllipseButton);
		expect(json.rotation).toBe(defaultRotation);
	});
});
