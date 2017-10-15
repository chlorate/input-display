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
			const buttonWidget = new RoundButtonWidget();
			buttonWidget.width = json.width;
			buttonWidget.height = json.height;
			buttonWidget.borderWidth = json.borderWidth;
			buttonWidget.button = parseButtonReferenceJSON(json.button);
			widget = buttonWidget;
			break;
		default:
			throw new TypeError("invalid widget JSON");
	}
	widget.x = json.x;
	widget.y = json.y;
	return widget;
}
