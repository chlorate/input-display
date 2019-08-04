import {Component, InfernoNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Store} from "../../../storage/store";
import {NumberGroup} from "../field";

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

	public render = (): InfernoNode => (
		<NumberGroup
			className="m-0"
			inputClassName="number-input-2"
			id="config-mash-speed-threshold"
			label="Mash speed threshold"
			value={this.injected.config.mashSpeedThreshold}
			min={minMashSpeedThreshold}
			max={maxMashSpeedThreshold}
			placeholder={defaultMashSpeedThreshold}
			suffix="Hz"
			onChange={this.handleChange}
		>
			If you press a button at least this many times per second, the
			button will enter a mashing state. While mashing, a button can be
			shown with different colors and with a label that displays the
			current mash speed.
		</NumberGroup>
	);

	@action
	private handleChange = (value?: number): void => {
		this.injected.config.mashSpeedThreshold =
			value || defaultMashSpeedThreshold;
	};
}
