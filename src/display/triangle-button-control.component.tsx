import {connect} from "inferno-mobx";
import {TriangleButtonControl} from "../control/triangle-button-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: TriangleButtonControl;
}

/**
 * Draws a TriangleButtonControl.
 */
export const TriangleButtonControlComponent = connect(({control}: Props) => (
	<ControlGroupComponent control={control}>
		<path
			className="control-button"
			d={control.path}
			stroke-width={control.borderWidth}
		/>
		<ControlLabelComponent control={control} />
	</ControlGroupComponent>
));
