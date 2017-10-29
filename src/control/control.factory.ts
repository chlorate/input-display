import {parseButtonReferenceJSON} from "../config/button-reference.factory";
import {ButtonControl} from "./button-control";
import {Control} from "./control";
import {DpadButtonControl} from "./dpad-button-control";
import {EllipseButtonControl} from "./ellipse-button-control";
import {ControlJSON, ControlType} from "./json/control-json";
import {RectangleButtonControl} from "./rectangle-button-control";
import {TriangleButtonControl} from "./triangle-button-control";

/**
 * Creates a control from its JSON representation.
 */
export function parseControlJSON(json: ControlJSON): Control {
	let control: Control;
	switch (json.type) {
		case ControlType.Dpad:
			const dpad = new DpadButtonControl();
			dpad.radius = json.radius;
			dpad.direction = json.direction;
			control = dpad;
			break;
		case ControlType.Ellipse:
			const ellipse = new EllipseButtonControl();
			ellipse.rotation = json.rotation;
			control = ellipse;
			break;
		case ControlType.Rectangle:
			const rectangle = new RectangleButtonControl();
			rectangle.topRadius = json.topRadius;
			rectangle.bottomRadius = json.bottomRadius;
			rectangle.rotation = json.rotation;
			control = rectangle;
			break;
		case ControlType.Triangle:
			const triangle = new TriangleButtonControl();
			triangle.direction = json.direction;
			control = triangle;
			break;
		default:
			throw new TypeError("invalid control JSON");
	}
	control.name = json.name;
	control.button = json.button ? parseButtonReferenceJSON(json.button) : undefined;
	control.x = json.x;
	control.y = json.y;
	control.borderWidth = json.borderWidth;
	control.nameLabel = json.nameLabel;
	control.pressesLabel = json.pressesLabel;
	control.mashSpeedLabel = json.mashSpeedLabel;
	if (control instanceof ButtonControl) {
		control.width = json.width;
		control.height = json.height;
	}
	return control;
}

/**
 * Returns a copy of a control.
 */
export function cloneControl(control: Control): Control {
	return parseControlJSON(control.toJSON());
}
