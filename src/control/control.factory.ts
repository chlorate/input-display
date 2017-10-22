import {parseButtonReferenceJSON} from "../config/button-reference.factory";
import {Control} from "./control";
import {ControlJSON, ControlType} from "./json/control-json";
import {RoundButtonControl} from "./round-button-control";

/**
 * Creates a control from its JSON representation.
 */
export function parseControlJSON(json: ControlJSON): Control {
	let control: Control;
	switch (json.type) {
		case ControlType.RoundButton:
			control = new RoundButtonControl();
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
