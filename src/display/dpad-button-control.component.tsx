import {connect} from "inferno-mobx";
import {DpadButtonControl} from "../control/dpad-button-control";
import {ButtonControlComponent} from "./button-control.component";

interface Props {
	control: DpadButtonControl;
}

/**
 * Draws a DpadButtonControl.
 */
export const DpadButtonControlComponent = connect(({control}: Props) => (
	<ButtonControlComponent control={control}>
		<path
			className="control-button"
			d={control.path}
			stroke-width={control.borderWidth}
			stroke-dasharray={control.strokeDashArray}
		/>
	</ButtonControlComponent>
));
