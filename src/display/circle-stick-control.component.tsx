import {connect} from "inferno-mobx";
import {CircleStickControl} from "../control/circle-stick-control";
import {StickControlComponent} from "./stick-control.component";

interface Props {
	control: CircleStickControl;
}

/**
 * Draws a CircleStickControl.
 */
export const CircleStickControlComponent = connect(({control}: Props) => (
	<StickControlComponent control={control}>
		<circle
			className="control-axis"
			cx={control.centerX}
			cy={control.centerY}
			r={control.centerX - control.nudge}
			stroke-width={control.borderWidth}
		/>
	</StickControlComponent>
));
