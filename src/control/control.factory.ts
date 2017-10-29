import {parseButtonReferenceJSON} from "../config/button-reference.factory";
import {ButtonControl} from "./button-control";
import {Control} from "./control";
import {DpadControl} from "./dpad-control";
import {EllipseControl} from "./ellipse-control";
import {ControlJSON, ControlType} from "./json/control-json";
import {RectangleControl} from "./rectangle-control";
import {TriangleControl} from "./triangle-control";

/**
 * Creates a control from its JSON representation.
 */
export function parseControlJSON(json: ControlJSON): Control {
	let control: Control;
	switch (json.type) {
		case ControlType.Dpad:
			const dpad = new DpadControl();
			dpad.radius = json.radius;
			dpad.direction = json.direction;
			control = dpad;
			break;
		case ControlType.Ellipse:
			const ellipse = new EllipseControl();
			ellipse.rotation = json.rotation;
			control = ellipse;
			break;
		case ControlType.Rectangle:
			const rectangle = new RectangleControl();
			rectangle.topRadius = json.topRadius;
			rectangle.bottomRadius = json.bottomRadius;
			rectangle.rotation = json.rotation;
			control = rectangle;
			break;
		case ControlType.Triangle:
			const triangle = new TriangleControl();
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
