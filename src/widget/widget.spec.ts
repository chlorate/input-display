import {WidgetJSON} from "./json/widget-json";
import {maxNameLength, maxX, maxY, minX, minY, Widget} from "./widget";

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
});
