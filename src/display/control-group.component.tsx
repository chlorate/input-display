import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Control} from "../control/control";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";

interface Props {
	config: Config;
	controller: Controller;
	control: Control;
	children;
}

/**
 * Wraps all elements of a control into a group. All elements can then be drawn
 * relative to the group and then the group itself is translated to its proper
 * position. Class names are added for the control's index and its button state
 * which can be targeted with custom CSS.
 */
export const ControlGroupComponent = connect([Store.Config, Store.Controller], (props: Props) => {
	const classNames: string[] = [];
	if (props.control.button) {
		const button = props.control.button.resolve(props.controller);
		if (button) {
			if (button.mashing) {
				classNames.push("control-button-mashing");
			}
			if (button.pressed) {
				classNames.push("control-button-pressed");
			}
		}
	}

	return (
		<g
			className={`control-${props.config.controls.indexOf(props.control) + 1} ${classNames.join(" ")}`}
			transform={`translate(${props.control.x} ${props.control.y})`}
		>
			{props.children}
		</g>
	);
});
