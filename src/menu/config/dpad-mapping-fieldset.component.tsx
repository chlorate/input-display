import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {AxisReference} from "../../config/axis-reference";
import {Config} from "../../config/config";
import {Controller} from "../../controller/controller";
import {Store} from "../../storage/store";
import {AxisIndexSelectComponent} from "./axis-index-select.component";
import {AxisReferenceSelectComponent} from "./axis-reference-select.component";

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

/**
 * A set of fields for selecting which d-pad mapping to use. When one of the
 * axis mappings are selected, fields are shown that allow the user to select
 * which axes to use.
 */
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
			<div className="form-group">
				<label for="config-dpad-mapping">
					D-pad mapping
				</label>
				<select
					className="form-control"
					id="config-dpad-mapping"
					value={value}
					onChange={linkEvent(props, handleChangeMapping)}
				>
					<option value={Mapping.Buttons}>Buttons</option>
					<option value={Mapping.SingleAxis}>Single axis</option>
					<option value={Mapping.DualAxes}>Dual axes</option>
				</select>
				<small className="form-text text-muted">
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
					onChange={linkEvent(props.config, handleChangeIndex)}
				/>
			}
			{value === Mapping.DualAxes &&
				<div className="form-row">
					<AxisReferenceSelectComponent
						className="col"
						id="config-dpad-x-axis"
						label="D-pad X axis"
						reference={props.config.dpadXAxis}
					/>
					<AxisReferenceSelectComponent
						className="col"
						id="config-dpad-y-axis"
						label="D-pad Y axis"
						reference={props.config.dpadYAxis}
					/>
				</div>
			}
		</fieldset>
	);
});

function handleChangeMapping(props: Props, event): void {
	switch (event.target.value) {
		case Mapping.Buttons:
			props.config.clearDpadMapping();
			break;
		case Mapping.SingleAxis:
			// Usually the last axis is the one to use.
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

function handleChangeIndex(config: Config, event): void {
	config.dpadAxisIndex = event.target.value;
}
