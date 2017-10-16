import {NormalButtonReference} from "../config/normal-button-reference";
import {ButtonType} from "../controller/json/button-json";
import {WidgetType} from "./json/widget-json";
import {RoundButtonWidget} from "./round-button-widget";

describe("RoundButtonWidget", () => {
	let widget;

	beforeEach(() => {
		widget = new RoundButtonWidget();
	});

	describe("toJSON", () => {
		it("can return a minimal JSON representation", () => {
			expect(widget.toJSON()).toEqual({
				type: WidgetType.RoundButton,
				name: "",
				x: 5,
				y: 5,
				width: 24,
				height: 24,
				borderWidth: 1.5,
				showName: true,
				showPresses: false,
				showMashSpeed: true,
			});
		});

		it("can include button reference", () => {
			widget.button = new NormalButtonReference(1);
			expect(widget.toJSON().button).toEqual({
				type: ButtonType.Normal,
				index: 1,
			});
		});
	});
});
