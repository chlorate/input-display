import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";
import {RoundButtonWidget} from "../widget/round-button-widget";
import {WidgetGroupComponent} from "./widget-group.component";
import {WidgetLabelComponent} from "./widget-label.component";

interface Props {
	controller: Controller;
	widget: RoundButtonWidget;
}

/**
 * Draws a RoundButtonWidget.
 */
export const RoundButtonWidgetComponent = connect([Store.Controller], ((props: Props) => {
	let fill = "grey";
	if (props.widget.button) {
		const button = props.widget.button.resolve(props.controller);
		if (button && button.pressed) {
			fill = "green";
			if (button.mashSpeed >= 5) {
				fill = "red";
			}
		}
	}

	return (
		<WidgetGroupComponent widget={props.widget}>
			<ellipse
				cx={props.widget.centerX}
				cy={props.widget.centerY}
				rx={props.widget.centerX}
				ry={props.widget.centerY}
				fill={fill}
				stroke="white"
				stroke-width={props.widget.borderWidth}
			/>
			<WidgetLabelComponent widget={props.widget} />
		</WidgetGroupComponent>
	);
}));
