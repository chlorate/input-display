import {ButtonType} from "../controller/json/button-json";
import {CircleButtonWidget} from "./circle-button-widget";
import {WidgetType} from "./json/widget-json";
import {maxBorderWidth, maxHeight, maxWidth, minBorderWidth, minHeight, minWidth} from "./widget";

describe("CircleButtonWidget", () => {
	let widget;

	beforeEach(() => {
		widget = new CircleButtonWidget();
	});

	it("can be created from a JSON representation", () => {
		widget = CircleButtonWidget.fromJSON({
			type: WidgetType.CircleButton,
			x: 0,
			y: 1,
			width: 2,
			height: 3,
			borderWidth: 4,
			button: {
				type: ButtonType.Normal,
				index: 5,
			},
		});
		expect(widget.x).toBe(0);
		expect(widget.y).toBe(1);
		expect(widget.width).toBe(2);
		expect(widget.height).toBe(3);
		expect(widget.borderWidth).toBe(4);
		expect(widget.button.index).toBe(5);
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
