import {computed, observable} from "mobx";
import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {DpadButton} from "../controller/dpad-button";
import {ButtonType} from "../controller/json/button-json";
import {Direction4} from "../direction/direction4";
import {ButtonReference} from "./button-reference";
import {DpadButtonReferenceJSON} from "./json/button-reference-json";

/**
 * A reference to a controller's d-pad button by its direction.
 */
export class DpadButtonReference extends ButtonReference {
	@observable public direction: Direction4;

	constructor(direction: Direction4) {
		super();
		this.direction = direction;
	}

	@computed get name(): string {
		return `D-pad ${this.direction}`;
	}

	/**
	 * Returns a JSON representation of this reference.
	 */
	public toJSON(): DpadButtonReferenceJSON {
		return {
			type: ButtonType.Dpad,
			direction: this.direction,
		};
	}

	/**
	 * Finds and returns the d-pad button of a controller that this reference
	 * points to. If no button was found, this returns undefined.
	 */
	public resolve(controller: Controller): Button | undefined {
		return controller.buttons.find((button) => button instanceof DpadButton && button.direction === this.direction);
	}
}
