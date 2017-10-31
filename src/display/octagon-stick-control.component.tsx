import {connect} from "inferno-mobx";
import {OctagonStickControl} from "../control/octagon-stick-control";
import {StickControlComponent} from "./stick-control.component";

interface Props {
	control: OctagonStickControl;
}

/**
 * Draws an OctagonStickControl.
 */
export const OctagonStickControlComponent = connect(({control}: Props) => (
	<StickControlComponent control={control}>
		<path
			className="control-axis"
			d={control.path}
			stroke-width={control.borderWidth}
		/>
	</StickControlComponent>
));
