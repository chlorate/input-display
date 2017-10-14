import {Button} from "../controller/button";
import {Controller} from "../controller/controller";

/**
 * An abstract reference to a controller's button.
 */
export abstract class ButtonReference {
	abstract get name(): string;
	public abstract resolve(controller: Controller): Button | undefined;
}
