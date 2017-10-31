import {connect} from "inferno-mobx";
import {ButtonControl} from "../control/button-control";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	control: ButtonControl;
	children;
}

/**
 * Partially draws a ButtonControl. The child of this component must draw the
 * button's shape. This component will draw its label and outer group.
 */
export const ButtonControlComponent = connect((props: Props) => (
	<ControlGroupComponent control={props.control}>
		{props.children}
		<ControlLabelComponent
			control={props.control}
			centerX={props.control.centerX}
			centerY={props.control.centerY}
		/>
	</ControlGroupComponent>
));
