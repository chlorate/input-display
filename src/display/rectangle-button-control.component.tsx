import {connect} from "inferno-mobx";
import {RectangleButtonControl} from "../control/rectangle-button-control";
import {ButtonControlComponent} from "./button-control.component";

interface Props {
	control: RectangleButtonControl;
}

/**
 * Draws a RectangleButtonControl.
 */
export const RectangleButtonControlComponent = connect(({control}: Props) => (
	<ButtonControlComponent control={control}>
		<path
			className="control-button"
			d={control.path}
			stroke-width={control.borderWidth}
			transform={control.transform}
		/>
	</ButtonControlComponent>
));
