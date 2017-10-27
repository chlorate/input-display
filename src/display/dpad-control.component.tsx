import {connect} from "inferno-mobx";
import {DpadControl} from "../control/dpad-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: DpadControl;
}

/**
 * Draws a DpadControl.
 */
export const DpadControlComponent = connect(({control}: Props) => (
	<ControlGroupComponent control={control}>
		<path
			className="control-button"
			d={control.path}
			stroke-width={control.borderWidth}
			stroke-dasharray={control.strokeDashArray}
		/>
		<ControlLabelComponent control={control} />
	</ControlGroupComponent>
));
