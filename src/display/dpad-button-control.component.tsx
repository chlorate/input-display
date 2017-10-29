import {connect} from "inferno-mobx";
import {DpadButtonControl} from "../control/dpad-button-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: DpadButtonControl;
}

/**
 * Draws a DpadButtonControl.
 */
export const DpadButtonControlComponent = connect(({control}: Props) => (
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
