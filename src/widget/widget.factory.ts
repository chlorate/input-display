import {parseButtonReferenceJSON} from "../config/button-reference.factory";
import {WidgetJSON, WidgetType} from "./json/widget-json";
import {RoundButtonWidget} from "./round-button-widget";
import {Widget} from "./widget";

/**
 * Creates a widget from its JSON representation.
 */
export function parseWidgetJSON(json: WidgetJSON): Widget {
	let widget: Widget;
	switch (json.type) {
		case WidgetType.RoundButton:
			widget = new RoundButtonWidget();
			break;
		default:
			throw new TypeError("invalid widget JSON");
	}
	widget.name = json.name;
	widget.button = json.button ? parseButtonReferenceJSON(json.button) : undefined;
	widget.x = json.x;
	widget.y = json.y;
	widget.width = json.width;
	widget.height = json.height;
	widget.borderWidth = json.borderWidth;
	widget.showName = json.showName;
	widget.showPresses = json.showPresses;
	widget.showMashSpeed = json.showMashSpeed;
	widget.nameLabel = json.nameLabel;
	widget.pressesLabel = json.pressesLabel;
	widget.mashSpeedLabel = json.mashSpeedLabel;
	return widget;
}
