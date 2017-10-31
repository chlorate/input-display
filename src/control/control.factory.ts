import {AxisReference} from "../config/axis-reference";
import {parseButtonReferenceJSON} from "../config/button-reference.factory";
import {ButtonControl} from "./button-control";
import {CircleStickControl} from "./circle-stick-control";
import {Control} from "./control";
import {DpadButtonControl} from "./dpad-button-control";
import {EllipseButtonControl} from "./ellipse-button-control";
import {BaseButtonControlJSON, BaseStickControlJSON, ControlJSON, ControlType} from "./json/control-json";
import {OctagonStickControl} from "./octagon-stick-control";
import {RectangleButtonControl} from "./rectangle-button-control";
import {StickControl} from "./stick-control";
import {TriangleButtonControl} from "./triangle-button-control";

/**
 * Creates a control from its JSON representation.
 */
export function parseControlJSON(json: ControlJSON): Control {
	let control: Control;
	switch (json.type) {
		case ControlType.DpadButton:
			const dpad = new DpadButtonControl();
			loadButtonJSON(json, dpad);
			dpad.radius = json.radius;
			dpad.direction = json.direction;
			control = dpad;
			break;
		case ControlType.EllipseButton:
			const ellipse = new EllipseButtonControl();
			loadButtonJSON(json, ellipse);
			ellipse.rotation = json.rotation;
			control = ellipse;
			break;
		case ControlType.RectangleButton:
			const rectangle = new RectangleButtonControl();
			loadButtonJSON(json, rectangle);
			rectangle.topRadius = json.topRadius;
			rectangle.bottomRadius = json.bottomRadius;
			rectangle.rotation = json.rotation;
			control = rectangle;
			break;
		case ControlType.TriangleButton:
			const triangle = new TriangleButtonControl();
			loadButtonJSON(json, triangle);
			triangle.direction = json.direction;
			control = triangle;
			break;
		case ControlType.CircleStick:
			const circle = new CircleStickControl();
			loadStickJSON(json, circle);
			control = circle;
			break;
		case ControlType.OctagonStick:
			const octagon = new OctagonStickControl();
			loadStickJSON(json, octagon);
			control = octagon;
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
	return control;
}

function loadButtonJSON(json: BaseButtonControlJSON, control: ButtonControl) {
	control.width = json.width;
	control.height = json.height;
}

function loadStickJSON(json: BaseStickControlJSON, control: StickControl) {
	control.xAxis = json.xAxis ? AxisReference.fromJSON(json.xAxis) : undefined;
	control.yAxis = json.yAxis ? AxisReference.fromJSON(json.yAxis) : undefined;
	control.outerSize = json.outerSize;
	control.innerSize = json.innerSize;
}

/**
 * Returns a copy of a control.
 */
export function cloneControl(control: Control): Control {
	return parseControlJSON(control.toJSON());
}
