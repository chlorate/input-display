import {WidgetJSON} from "./json/widget-json";

import {
	maxBorderWidth, maxHeight, maxNameLength, maxWidth, maxX, maxY,
	minBorderWidth, minHeight, minWidth, minX, minY,
	Widget,
} from "./widget";

class TestWidget extends Widget {
	public toJSON(): WidgetJSON {
		throw new Error("not implemented");
	}
}

describe("Widget", () => {
	let widget;

	beforeEach(() => {
		widget = new TestWidget();
	});

	it("should truncate name", () => {
		widget.name = "x".repeat(200);
		expect(widget.name.length).toBe(maxNameLength);
	});

	it("should clamp x-position", () => {
		widget.x = -1;
		expect(widget.x).toBe(minX);
		widget.x = 5000;
		expect(widget.x).toBe(maxX);
	});

	it("should clamp y-position", () => {
		widget.y = -1;
		expect(widget.y).toBe(minY);
		widget.y = 5000;
		expect(widget.y).toBe(maxY);
	});

	it("should clamp width", () => {
		widget.width = -1;
		expect(widget.width).toBe(minWidth);
		widget.width = 5000;
		expect(widget.width).toBe(maxWidth);
	});

	it("should clamp height", () => {
		widget.height = -1;
		expect(widget.height).toBe(minHeight);
		widget.height = 5000;
		expect(widget.height).toBe(maxHeight);
	});

	it("should clamp border width", () => {
		widget.borderWidth = -1;
		expect(widget.borderWidth).toBe(minBorderWidth);
		widget.borderWidth = 5000;
		expect(widget.borderWidth).toBe(maxBorderWidth);
	});

	it("can return x-position of widget left", () => {
		widget.borderWidth = 11;
		expect(widget.leftX).toBe(-5.5);
	});

	it("can return x-position of widget center", () => {
		widget.width = 100;
		expect(widget.centerX).toBe(50);
	});

	it("can return x-position of widget right", () => {
		widget.width = 50;
		widget.borderWidth = 11;
		expect(widget.rightX).toBe(55.5);
	});

	it("can return y-position of widget top", () => {
		widget.borderWidth = 11;
		expect(widget.topY).toBe(-5.5);
	});

	it("can return y-position of widget center", () => {
		widget.height = 50;
		expect(widget.centerY).toBe(25);
	});

	it("can return y-position of widget bottom", () => {
		widget.height = 50;
		widget.borderWidth = 11;
		expect(widget.bottomY).toBe(55.5);
	});
});
