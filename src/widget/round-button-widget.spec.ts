import {ButtonType} from "../controller/json/button-json";
import {WidgetType} from "./json/widget-json";
import {RoundButtonWidget} from "./round-button-widget";

describe("RoundButtonWidget", () => {
	let widget;

	beforeEach(() => {
		widget = new RoundButtonWidget();
	});

	it("should return x-position of widget center", () => {
		widget.width = 100;
		expect(widget.centerX).toBe(50);
	});

	it("should return y-position of widget center", () => {
		widget.height = 50;
		expect(widget.centerY).toBe(25);
	});

	it("can return a JSON representation", () => {
		expect(widget.toJSON()).toEqual({
			type: WidgetType.RoundButton,
			name: "",
			x: 0,
			y: 0,
			showName: true,
			showPresses: false,
			showMashSpeed: true,
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
