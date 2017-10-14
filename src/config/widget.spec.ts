import {WidgetJSON, WidgetType} from "./json/widget-json";
import {maxX, maxY, minX, minY, Widget} from "./widget";

class TestWidget extends Widget {
	public toJSON(): WidgetJSON {
		return {
			type: WidgetType.CircleButton,
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			borderWidth: 0,
		};
	}
}

describe("Widget", () => {
	let widget;

	beforeEach(() => {
		widget = new TestWidget();
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
