import {parseButtonReferenceJSON} from "../config/button-reference.factory";
import {Control} from "./control";
import {EllipseControl} from "./ellipse-control";
import {ControlJSON, ControlType} from "./json/control-json";
import {RectangleControl} from "./rectangle-control";

/**
 * Creates a control from its JSON representation.
 */
export function parseControlJSON(json: ControlJSON): Control {
	let control: Control;
	switch (json.type) {
		case ControlType.Ellipse:
			const ellipse = new EllipseControl();
			ellipse.rotation = json.rotation;
			control = ellipse;
			break;
		case ControlType.Rectangle:
			const rectangle = new RectangleControl();
			rectangle.rotation = json.rotation;
			control = rectangle;
			break;
		default:
			throw new TypeError("invalid control JSON");
	}
	control.name = json.name;
	control.button = json.button ? parseButtonReferenceJSON(json.button) : undefined;
	control.x = json.x;
	control.y = json.y;
	control.width = json.width;
	control.height = json.height;
	control.borderWidth = json.borderWidth;
	control.nameLabel = json.nameLabel;
	control.pressesLabel = json.pressesLabel;
	control.mashSpeedLabel = json.mashSpeedLabel;
	return control;
}

/**
 * Returns a copy of a control.
 */
export function cloneControl(control: Control): Control {
	return parseControlJSON(control.toJSON());
}
