import {Button} from "../controller/button";
import {Controller} from "../controller/controller";
import {ButtonReferenceJSON} from "./json/button-reference-json";

/**
 * An abstract reference to a controller's button.
 */
export abstract class ButtonReference {
	abstract get name(): string;
	public abstract toJSON(): ButtonReferenceJSON;
	public abstract resolve(controller: Controller): Button | undefined;
}
