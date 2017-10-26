import {connect} from "inferno-mobx";
import {TriangleControl} from "../control/triangle-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: TriangleControl;
}

/**
 * Draws a TriangleControl.
 */
export const TriangleControlComponent = connect(({control}: Props) => (
	<ControlGroupComponent control={control}>
		<path
			className="control-button"
			d={control.path}
			stroke-width={control.borderWidth}
		/>
		<ControlLabelComponent control={control} />
	</ControlGroupComponent>
));
