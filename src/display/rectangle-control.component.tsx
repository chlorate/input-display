import {connect} from "inferno-mobx";
import {RectangleControl} from "../control/rectangle-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: RectangleControl;
}

/**
 * Draws a RectangleControl.
 */
export const RectangleControlComponent = connect(({control}: Props) => (
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
