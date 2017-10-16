import {ButtonWidget} from "./button-widget";
import {WidgetJSON} from "./json/widget-json";
import {maxBorderWidth, maxHeight, maxWidth, minBorderWidth, minHeight, minWidth} from "./widget";

class TestButtonWidget extends ButtonWidget {
	public toJSON(): WidgetJSON {
		throw new Error("not implemented");
	}
}

describe("ButtonWidget", () => {
	let widget;

	beforeEach(() => {
		widget = new TestButtonWidget();
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

	it("can return x-position of widget center", () => {
		widget.width = 100;
		expect(widget.centerX).toBe(50);
	});

	it("can return y-position of widget center", () => {
		widget.height = 50;
		expect(widget.centerY).toBe(25);
	});
});
