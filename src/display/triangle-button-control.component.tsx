import {connect} from "inferno-mobx";
import {TriangleButtonControl} from "../control/triangle-button-control";
import {ButtonControlComponent} from "./button-control.component";

interface Props {
	control: TriangleButtonControl;
}

/**
 * Draws a TriangleButtonControl.
 */
export const TriangleButtonControlComponent = connect(({control}: Props) => (
	<ButtonControlComponent control={control}>
		<path
			className="control-button"
			d={control.path}
			stroke-width={control.borderWidth}
		/>
	</ButtonControlComponent>
));
