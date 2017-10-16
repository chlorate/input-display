import {ButtonWidget} from "./button-widget";
import {WidgetJSON} from "./json/widget-json";

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

	it("can return y-position of widget top", () => {
		widget.borderWidth = 11;
		expect(widget.topY).toBe(-5.5);
	});

	it("can return y-position of widget bottom", () => {
		widget.height = 50;
		widget.borderWidth = 11;
		expect(widget.bottomY).toBe(55.5);
	});
});
