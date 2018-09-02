import {Component, VNode} from "inferno";
import {FormGroup, FormText, InputGroupAddon, Label} from "inferno-bootstrap";
import {action} from "mobx";
import {inject, observer} from "inferno-mobx";
import {Store} from "../../../storage/store";
import {AutoWidthInputGroup, NumberInput} from "../field";

import {
	Config,
	defaultMashSpeedThreshold,
	maxMashSpeedThreshold,
	minMashSpeedThreshold,
} from "../../../config/config";

interface InjectedProps {
	config: Config;
}

/**
 * A field for setting the controller mash speed threshold.
 */
@inject(Store.Config)
@observer
export class MashSpeedThresholdInput extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render = (): VNode => (
		<FormGroup className="m-0">
			<Label for="config-mash-speed-threshold">
				Mash speed threshold
			</Label>
			<AutoWidthInputGroup>
				<NumberInput
					id="config-mash-speed-threshold"
					value={this.injected.config.mashSpeedThreshold}
					min={minMashSpeedThreshold}
					max={maxMashSpeedThreshold}
					defaultValue={defaultMashSpeedThreshold}
					describedBy="config-mash-speed-threshold-help"
					onChange={this.handleChange}
				/>
				<InputGroupAddon addonType="append">Hz</InputGroupAddon>
			</AutoWidthInputGroup>
			<FormText id="config-mash-speed-threshold-help">
				If you press a button at least this many times per second, the
				button will enter a mashing state. While mashing, a button can
				be shown with different colors and with a label that displays
				the current mash speed.
			</FormText>
		</FormGroup>
	);

	@action
	private handleChange = (value: number): void => {
		this.injected.config.mashSpeedThreshold = value;
	};
}
