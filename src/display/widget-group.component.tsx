import {connect} from "inferno-mobx";
import {Widget} from "../widget/widget";

interface Props {
	index: number;
	widget: Widget;
	children;
}

/**
 * Wraps all elements of a widget into a group. All elements can then be drawn
 * relative to the group and then the group itself is translated to its proper
 * position. A class name is added for targeting with custom CSS.
 */
export const WidgetGroupComponent = connect((props: Props) => (
	<g
		className={`widget-${props.index + 1}`}
		transform={`translate(${props.widget.x} ${props.widget.y})`}
	>
		{props.children}
	</g>
));
