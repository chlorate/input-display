import {observable} from "mobx";
import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {Direction} from "../controller/direction";
import {DpadButton} from "../controller/dpad-button";
import {ButtonReference} from "./button-reference";

/**
 * A reference to a controller's d-pad button by its direction.
 */
export class DpadButtonReference extends ButtonReference {
	@observable public direction: Direction;

	constructor(direction: Direction) {
		super();
		this.direction = direction;
	}

	get name(): string {
		return `D-pad ${this.direction}`;
	}

	/**
	 * Finds and returns the d-pad button of a controller that this reference
	 * points to. If no button was found, this returns undefined.
	 */
	public resolve(controller: Controller): Button | undefined {
		return controller.buttons.find((button) => button instanceof DpadButton && button.direction === this.direction);
	}
}
