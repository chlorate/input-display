import {connect} from "inferno-mobx";
import {Config} from "../config/config";
import {Store} from "../storage/store";
import {Widget} from "../widget/widget";

interface Props {
	config: Config;
	widget: Widget;
	children;
}

/**
 * Wraps all elements of a widget into a group. All elements can then be drawn
 * relative to the group and then the group itself is translated to its proper
 * position. A class name is added for targeting with custom CSS.
 */
export const WidgetGroupComponent = connect([Store.Config], (props: Props) => (
	<g
		className={`widget-${props.config.widgets.indexOf(props.widget) + 1}`}
		transform={`translate(${props.widget.x} ${props.widget.y})`}
	>
		{props.children}
	</g>
));
