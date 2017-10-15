import {ButtonType} from "../controller/json/button-json";
import {CircleButtonWidget} from "./circle-button-widget";
import {WidgetType} from "./json/widget-json";
import {maxBorderWidth, maxHeight, maxWidth, minBorderWidth, minHeight, minWidth} from "./widget";

describe("CircleButtonWidget", () => {
	let widget;

	beforeEach(() => {
		widget = new CircleButtonWidget();
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

	it("should return x-position of center point", () => {
		widget.width = 100;
		expect(widget.centerX).toBe(50);
	});

	it("should return y-position of center point", () => {
		widget.height = 50;
		expect(widget.centerY).toBe(25);
	});

	it("can return a JSON representation", () => {
		expect(widget.toJSON()).toEqual({
			type: WidgetType.CircleButton,
			x: 0,
			y: 0,
			width: 20,
			height: 20,
			borderWidth: 1.5,
			button: {
				type: ButtonType.Normal,
				index: 0,
			},
		});
	});
});
