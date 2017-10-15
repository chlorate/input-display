import {ButtonType} from "../controller/json/button-json";
import {WidgetType} from "./json/widget-json";
import {parseWidgetJSON} from "./widget.factory";

describe("parseWidgetJSON", () => {
	let widget;

	it("can create a RoundButtonWidget", () => {
		widget = parseWidgetJSON({
			type: WidgetType.RoundButton,
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
});
