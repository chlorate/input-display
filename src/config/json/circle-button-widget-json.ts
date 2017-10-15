import {BaseWidgetJSON, WidgetType} from "./widget-json";
import {ButtonReferenceJSON} from "./button-reference-json";

/**
 * A JSON representation of a CircleButtonWidget.
 */
export interface CircleButtonWidgetJSON extends BaseWidgetJSON {
	type: WidgetType.CircleButton;
	width: number;
	height: number;
	borderWidth: number;
	button: ButtonReferenceJSON;
}
