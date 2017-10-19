import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";
import {Widget} from "../widget/widget";

interface Props {
	config: Config;
	controller: Controller;
	widget: Widget;
	children;
}

/**
 * Wraps all elements of a widget into a group. All elements can then be drawn
 * relative to the group and then the group itself is translated to its proper
 * position. Class names are added for the widget's index and its button state
 * which can be targeted with custom CSS.
 */
export const WidgetGroupComponent = connect([Store.Config, Store.Controller], (props: Props) => {
	const classNames: string[] = [];
	if (props.widget.button) {
		const button = props.widget.button.resolve(props.controller);
		if (button) {
			if (button.mashSpeed >= 5) {
				classNames.push("widget-button-mashing");
			}
			if (button.pressed) {
				classNames.push("widget-button-pressed");
			}
		}
	}

	return (
		<g
			className={`widget-${props.config.widgets.indexOf(props.widget) + 1} ${classNames.join(" ")}`}
			transform={`translate(${props.widget.x} ${props.widget.y})`}
		>
			{props.children}
		</g>
	);
});
