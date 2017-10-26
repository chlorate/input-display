import {connect} from "inferno-mobx";
import {EllipseControl} from "../control/ellipse-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: EllipseControl;
}

/**
 * Draws an EllipseControl.
 */
export const EllipseControlComponent = connect(({control}: Props) => (
	<ControlGroupComponent control={control}>
		<ellipse
			className="control-button"
			cx={control.centerX}
			cy={control.centerY}
			rx={control.centerX - control.nudge}
			ry={control.centerY - control.nudge}
			stroke-width={control.borderWidth}
			transform={control.transform}
		/>
		<ControlLabelComponent control={control} />
	</ControlGroupComponent>
));
