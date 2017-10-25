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
export const RectangleControlComponent = connect(({control}: Props) => {
	// Nudge shape inward up to 0.5px so that odd border widths align with the
	// pixel grid and look sharp. Then back down to zero for even border widths
	// which are already aligned.
	let offset = control.borderWidth % 2 / 2;
	if (offset > 0.5) {
		offset = 1 - offset;
	}

	return (
		<ControlGroupComponent control={control}>
			<path
				className="control-button"
				d={
					`M ${offset},${offset} ` +
					`H ${control.width - offset} ` +
					`V ${control.height - offset} ` +
					`H ${offset} ` +
					`Z`
				}
				stroke-width={control.borderWidth}
				transform={`rotate(${control.rotation} ${control.centerX} ${control.centerY})`}
			/>
			<ControlLabelComponent control={control} />
		</ControlGroupComponent>
	);
});
