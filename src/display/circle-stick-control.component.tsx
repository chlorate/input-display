import {connect} from "inferno-mobx";
import {CircleStickControl} from "../control/circle-stick-control";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	controller: Controller;
	control: CircleStickControl;
}

/**
 * Draws a CircleStickControl.
 */
export const CircleStickControlComponent = connect([Store.Controller], (props: Props) => (
	<ControlGroupComponent control={props.control}>
		<ellipse
			className="control-axis"
			cx={props.control.centerX}
			cy={props.control.centerY}
			rx={props.control.centerX - props.control.nudge}
			ry={props.control.centerY - props.control.nudge}
			stroke-width={props.control.borderWidth}
		/>
		<ellipse
			className="control-button"
			cx={props.control.getInnerX(props.controller)}
			cy={props.control.getInnerY(props.controller)}
			rx={props.control.innerSize / 2 - props.control.nudge}
			ry={props.control.innerSize / 2 - props.control.nudge}
			stroke-width={props.control.borderWidth}
		/>
		<ControlLabelComponent control={props.control} />
	</ControlGroupComponent>
));
