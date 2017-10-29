import {connect} from "inferno-mobx";
import {RectangleButtonControl} from "../control/rectangle-button-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: RectangleButtonControl;
}

/**
 * Draws a RectangleButtonControl.
 */
export const RectangleButtonControlComponent = connect(({control}: Props) => (
	<ControlGroupComponent control={control}>
		<path
			className="control-button"
			d={control.path}
			stroke-width={control.borderWidth}
			transform={control.transform}
		/>
		<ControlLabelComponent control={control} />
	</ControlGroupComponent>
));
