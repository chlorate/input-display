import {connect} from "inferno-mobx";
import {EllipseButtonControl} from "../control/ellipse-button-control";
import {ButtonControlComponent} from "./button-control.component";

interface Props {
	control: EllipseButtonControl;
}

/**
 * Draws an EllipseButtonControl.
 */
export const EllipseButtonControlComponent = connect(({control}: Props) => (
	<ButtonControlComponent control={control}>
		<ellipse
			className="control-button"
			cx={control.centerX}
			cy={control.centerY}
			rx={control.centerX - control.nudge}
			ry={control.centerY - control.nudge}
			stroke-width={control.borderWidth}
			transform={control.transform}
		/>
	</ButtonControlComponent>
));
