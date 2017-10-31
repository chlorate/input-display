import {connect} from "inferno-mobx";
import {StickControl} from "../control/stick-control";
import {Controller} from "../controller/controller";
import {Store} from "../storage/store";
import {ControlGroupComponent} from "./control-group.component";
import {ControlLabelComponent} from "./control-label.component";

interface Props {
	controller: Controller;
	control: StickControl;
	children;
}

/**
 * Partially draws a StickControl. The child of this component must draw the
 * outer shape of the stick. This component will draw the inner circle, its
 * label, and the outer group.
 */
export const StickControlComponent = connect([Store.Controller], (props: Props) => {
	const innerX = props.control.getInnerX(props.controller);
	const innerY = props.control.getInnerY(props.controller);
	return (
		<ControlGroupComponent control={props.control}>
			{props.children}
			<circle
				className="control-button"
				cx={innerX}
				cy={innerY}
				r={props.control.innerSize / 2 - props.control.nudge}
				stroke-width={props.control.borderWidth}
			/>
			<ControlLabelComponent
				control={props.control}
				centerX={innerX}
				centerY={innerY}
			/>
		</ControlGroupComponent>
	);
});
