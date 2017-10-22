import {ControlJSON} from "./json/control-json";

import {
	Control,
	maxBorderWidth, maxHeight, maxNameLength, maxWidth, maxX, maxY,
	minBorderWidth, minHeight, minWidth, minX, minY,
} from "./control";

class TestControl extends Control {
	public toJSON(): ControlJSON {
		throw new Error("not implemented");
	}
}

describe("Control", () => {
	let control;

	beforeEach(() => {
		control = new TestControl();
	});

	it("should truncate name", () => {
		control.name = "x".repeat(200);
		expect(control.name.length).toBe(maxNameLength);
	});

	it("should clamp x-position", () => {
		control.x = -1;
		expect(control.x).toBe(minX);
		control.x = 5000;
		expect(control.x).toBe(maxX);
	});

	it("should clamp y-position", () => {
		control.y = -1;
		expect(control.y).toBe(minY);
		control.y = 5000;
		expect(control.y).toBe(maxY);
	});

	it("should clamp width", () => {
		control.width = -1;
		expect(control.width).toBe(minWidth);
		control.width = 5000;
		expect(control.width).toBe(maxWidth);
	});

	it("should clamp height", () => {
		control.height = -1;
		expect(control.height).toBe(minHeight);
		control.height = 5000;
		expect(control.height).toBe(maxHeight);
	});

	it("should clamp border width", () => {
		control.borderWidth = -1;
		expect(control.borderWidth).toBe(minBorderWidth);
		control.borderWidth = 5000;
		expect(control.borderWidth).toBe(maxBorderWidth);
	});

	it("can return x-position of control left", () => {
		control.borderWidth = 11;
		expect(control.leftX).toBe(-5.5);
	});

	it("can return x-position of control center", () => {
		control.width = 100;
		expect(control.centerX).toBe(50);
	});

	it("can return x-position of control right", () => {
		control.width = 50;
		control.borderWidth = 11;
		expect(control.rightX).toBe(55.5);
	});

	it("can return y-position of control top", () => {
		control.borderWidth = 11;
		expect(control.topY).toBe(-5.5);
	});

	it("can return y-position of control center", () => {
		control.height = 50;
		expect(control.centerY).toBe(25);
	});

	it("can return y-position of control bottom", () => {
		control.height = 50;
		control.borderWidth = 11;
		expect(control.bottomY).toBe(55.5);
	});
});
