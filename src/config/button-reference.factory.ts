import {ButtonType} from "../controller/json/button-json";
import {ButtonReference} from "./button-reference";
import {DpadButtonReference} from "./dpad-button-reference";
import {ButtonReferenceJSON} from "./json/button-reference-json";
import {NormalButtonReference} from "./normal-button-reference";

/**
 * Creates a button reference from a JSON representation.
 */
export function parseButtonReferenceJSON(json: ButtonReferenceJSON): ButtonReference {
	switch (json.type) {
		case ButtonType.Normal:
			return new NormalButtonReference(json.index);
		case ButtonType.Dpad:
			return new DpadButtonReference(json.direction);
	}
}
