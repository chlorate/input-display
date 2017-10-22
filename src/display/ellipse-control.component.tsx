import {connect} from "inferno-mobx";
import {EllipseControl} from "../control/ellipse-control";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	controller: Controller;
	control: EllipseControl;
}

/**
 * Draws a EllipseControl.
 */
export const EllipseControlComponent = connect([Store.Controller], ((props: Props) => {
	return (
		<ControlGroupComponent control={props.control}>
			<ellipse
				className="control-button"
				cx={props.control.centerX}
				cy={props.control.centerY}
				rx={props.control.centerX}
				ry={props.control.centerY}
				stroke-width={props.control.borderWidth}
			/>
			<ControlLabelComponent control={props.control} />
		</ControlGroupComponent>
	);
}));
