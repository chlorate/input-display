import {ButtonType} from "../controller/json/button-json";
import {WidgetType} from "./json/widget-json";
import {RoundButtonWidget} from "./round-button-widget";

describe("RoundButtonWidget", () => {
	it("can return a JSON representation", () => {
		const widget = new RoundButtonWidget();
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
