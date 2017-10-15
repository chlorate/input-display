import {Button} from "./button";
import {DpadButton} from "./dpad-button";
import {ButtonJSON, ButtonType} from "./json/button-json";
import {NormalButton} from "./normal-button";

/**
 * Creates a button from its JSON representation.
 */
export function parseButtonJSON(json: ButtonJSON): Button {
	let button: Button;
	switch (json.type) {
		case ButtonType.Normal:
			button = new NormalButton(json.index);
			break;
		case ButtonType.Dpad:
			button = new DpadButton(json.direction);
			break;
		default:
			throw new TypeError("invalid button JSON");
	}
	button.presses = json.presses;
	button.bestMashSpeed = json.bestMashSpeed;
	return button;
}
