import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Controller} from "../controller/controller";
import {Store} from "../mobx/store";
import {AxisIndexSelectComponent} from "./axis-index-select.component";
import {AxisReference} from "./axis-reference";
import {AxisReferenceSelectComponent} from "./axis-reference-select.component";
import {Config} from "./config";

const defaultXAxisIndex = 0;
const defaultYAxisIndex = 1;

enum Mapping {
	Buttons = "buttons",
	SingleAxis = "singleAxis",
	DualAxes = "dualAxes",
}

interface Props {
	config: Config;
	controller: Controller;
}

export const DpadMappingFieldsetComponent = connect([Store.Config, Store.Controller], (props: Props) => {
	let value = Mapping.Buttons;
	if (props.config.dpadAxisIndex !== undefined) {
		value = Mapping.SingleAxis;
	}
	if (props.config.dpadXAxis !== undefined && props.config.dpadYAxis !== undefined) {
		value = Mapping.DualAxes;
	}

	return (
		<fieldset>
			<div class="form-group">
				<label for="config-dpad-mapping">
					D-pad mapping
				</label>
				<select
					class="form-control"
					id="config-dpad-mapping"
					value={value}
					onChange={linkEvent(props, handleMappingChange)}
				>
					<option value={Mapping.Buttons}>Buttons</option>
					<option value={Mapping.SingleAxis}>Single axis</option>
					<option value={Mapping.DualAxes}>Dual axes</option>
				</select>
				<small class="form-text text-muted">
					Controllers vary in how d-pad inputs are mapped. Directions
					could be mapped to buttons, to values on a single axis, or to
					separate X and Y axes. Go to the Controller tab and move the
					d-pad to determine which mapping fits your controller.
				</small>
			</div>
			{value === Mapping.SingleAxis &&
				<AxisIndexSelectComponent
					id="config-dpad-axis-index"
					label="D-pad axis"
					value={props.config.dpadAxisIndex}
					onChange={linkEvent(props.config, handleIndexChange)}
				/>
			}
			<div class="form-row">
				{value === Mapping.DualAxes && [
					<AxisReferenceSelectComponent
						class="col"
						id="config-dpad-x-axis"
						label="D-pad X axis"
						reference={props.config.dpadXAxis}
					/>,
					<AxisReferenceSelectComponent
						class="col"
						id="config-dpad-y-axis"
						label="D-pad Y axis"
						reference={props.config.dpadYAxis}
					/>,
				]}
			</div>
		</fieldset>
	);
});

function handleMappingChange(props: Props, event) {
	switch (event.target.value) {
		case Mapping.Buttons:
			props.config.clearDpadMapping();
			break;
		case Mapping.SingleAxis:
			// Usually it is the last axis.
			props.config.dpadAxisIndex = props.controller.axes.length - 1;
			break;
		case Mapping.DualAxes:
			props.config.setDpadDualAxes(
				new AxisReference(defaultXAxisIndex, false),
				new AxisReference(defaultYAxisIndex, false),
			);
			break;
	}
}

function handleIndexChange(config: Config, event) {
	config.dpadAxisIndex = event.target.value;
}
