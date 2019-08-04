import {ChangeEvent, Component, InfernoNode} from "inferno";
import {FormGroup, FormText, Input, Label} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {Link} from "inferno-router";
import {action} from "mobx";
import {AxisReference} from "../../../config/axis-reference";
import {Config} from "../../../config/config";
import {Controller} from "../../../controller/controller";
import {Store} from "../../../storage/store";

const defaultXAxisIndex = 0;
const defaultYAxisIndex = 1;

enum Mapping {
	Buttons = "buttons",
	SingleAxis = "singleAxis",
	DualAxes = "dualAxes",
}

interface InjectedProps {
	config: Config;
	controller: Controller;
}

/**
 * A field for selecting which d-pad mapping to use.
 */
@inject(Store.Config, Store.Controller)
@observer
export class DpadMappingSelect extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render = (): InfernoNode => (
		<FormGroup>
			<Label for="config-dpad-mapping">Mapping</Label>
			<Input
				className="w-auto"
				id="config-dpad-mapping"
				type="select"
				value={this.value}
				aria-describedby="config-dpad-mapping-help"
				onChange={this.handleChange}
			>
				<option value={Mapping.Buttons}>Buttons</option>
				<option value={Mapping.SingleAxis}>Single axis</option>
				<option value={Mapping.DualAxes}>Dual axes</option>
			</Input>
			<FormText id="config-dpad-mapping-help">
				Controllers vary in how d-pad inputs are mapped. Directions
				could be mapped to buttons, to values on a single axis, or to
				separate X and Y axes. To determine which mapping fits your
				controller, go to the{" "}
				<Link to="/controller">Controller tab</Link>, move the d-pad
				around, and watch what changes. If buttons are pressed, use the
				buttons mapping. If only one axis changes, use the single axis
				mapping. If two axes change, use the dual axes mapping.
			</FormText>
		</FormGroup>
	);

	private get value(): Mapping {
		const {dpadAxisIndex, dpadXAxis, dpadYAxis} = this.injected.config;
		if (dpadAxisIndex !== undefined) {
			return Mapping.SingleAxis;
		}
		if (dpadXAxis !== undefined && dpadYAxis !== undefined) {
			return Mapping.DualAxes;
		}
		return Mapping.Buttons;
	}

	@action
	private handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		const {config, controller} = this.injected;
		switch (event.target.value) {
			case Mapping.Buttons:
				config.clearDpadMapping();
				break;
			case Mapping.SingleAxis:
				// Usually the last axis is the one to use.
				config.dpadAxisIndex = controller.axes.length - 1;
				break;
			case Mapping.DualAxes:
				config.setDpadDualAxes(
					new AxisReference(defaultXAxisIndex, false),
					new AxisReference(defaultYAxisIndex, false),
				);
				break;
		}
	};
}
