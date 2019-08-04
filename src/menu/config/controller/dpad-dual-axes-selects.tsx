import {Component, InfernoNode} from "inferno";
import {Col} from "inferno-bootstrap";
import {inject, observer} from "inferno-mobx";
import {AxisReference} from "../../../config/axis-reference";
import {Config} from "../../../config/config";
import {Store} from "../../../storage/store";
import {AxisReferenceSelect} from "../field";

interface InjectedProps {
	config: Config;
}

/**
 * Fields for selecting which axes will be read when the dual axes d-pad mapping
 * is used.
 */
@inject(Store.Config)
@observer
export class DpadDualAxesSelects extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render(): InfernoNode | null {
		const {dpadXAxis, dpadYAxis} = this.injected.config;
		if (dpadXAxis === undefined || dpadYAxis === undefined) {
			return null;
		}

		return (
			<div class="form-row form-row-collapse-margin">
				<Col xs="auto">
					<AxisReferenceSelect
						id="config-dpad-dual-axes-x"
						label="X axis"
						reference={dpadXAxis}
						required
						onChange={this.handleChangeX}
					/>
				</Col>
				<Col xs="auto">
					<AxisReferenceSelect
						id="config-dpad-dual-axes-y"
						label="Y axis"
						reference={dpadYAxis}
						required
						onChange={this.handleChangeY}
					/>
				</Col>
			</div>
		);
	}

	private handleChangeX = (reference?: AxisReference): void => {
		const {config} = this.injected;
		if (reference && config.dpadYAxis) {
			config.setDpadDualAxes(reference, config.dpadYAxis);
		}
	};

	private handleChangeY = (reference?: AxisReference): void => {
		const {config} = this.injected;
		if (reference && config.dpadXAxis) {
			config.setDpadDualAxes(config.dpadXAxis, reference);
		}
	};
}
