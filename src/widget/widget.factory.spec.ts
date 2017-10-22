import {NormalButtonReference} from "../config/normal-button-reference";
import {ButtonType} from "../controller/json/button-json";
import {WidgetType} from "./json/widget-json";
import {LabelPosition} from "./label-position";
import {cloneWidget, parseWidgetJSON} from "./widget.factory";

function makeJSON() {
	return {
		type: WidgetType.RoundButton,
		name: "name",
		x: 0,
		y: 1,
		width: 2,
		height: 3,
		borderWidth: 4,
		nameLabel: LabelPosition.Above,
		pressesLabel: LabelPosition.Below,
		mashSpeedLabel: LabelPosition.Center,
	};
}

describe("parseWidgetJSON", () => {
	let json;

	beforeEach(() => {
		json = makeJSON();
	});

	it("can create a RoundButtonWidget", () => {
		const widget = parseWidgetJSON(json);
		expect(widget.name).toBe("name");
		expect(widget.button).toBeUndefined();
		expect(widget.x).toBe(0);
		expect(widget.y).toBe(1);
		expect(widget.width).toBe(2);
		expect(widget.height).toBe(3);
		expect(widget.borderWidth).toBe(4);
		expect(widget.nameLabel).toBe(LabelPosition.Above);
		expect(widget.pressesLabel).toBe(LabelPosition.Below);
		expect(widget.mashSpeedLabel).toBe(LabelPosition.Center);
	});

	it("can create a RoundButtonWidget with a button reference", () => {
		json.button = {
			type: ButtonType.Normal,
			index: 5,
		};
		const widget = parseWidgetJSON(json);
		expect(widget.button instanceof NormalButtonReference).toBe(true);
	});
});

describe("cloneWidget", () => {
	it("clones a widget", () => {
		const json = makeJSON();
		const widget = parseWidgetJSON(json);
		const clone = cloneWidget(widget);
		expect(clone).not.toBe(widget);
		expect(clone.name).toBe(widget.name);
	});
});
