import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";
import {RoundButtonWidget} from "../widget/round-button-widget";

interface Props {
	controller: Controller;
	widget: RoundButtonWidget;
}

/**
 * Draws a RoundButtonWidget.
 */
export const RoundButtonWidgetComponent = connect([Store.Controller], ((props: Props) => {
	const button = props.widget.button.resolve(props.controller);
	let fill = "grey";
	if (button && button.pressed) {
		fill = "green";
		if (button.mashSpeed > 5) {
			fill = "red";
		}
	}

	return (
		<ellipse
			cx={props.widget.centerX}
			cy={props.widget.centerY}
			rx={props.widget.centerX}
			ry={props.widget.centerY}
			fill={fill}
			stroke="white"
			stroke-width={props.widget.borderWidth}
		/>
	);
}));
