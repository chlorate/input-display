import {Component, InfernoNode} from "inferno";
import {inject, observer} from "inferno-mobx";
import {action} from "mobx";
import {Store} from "../../../storage/store";
import {NumberGroup} from "../field";

import {
	Config,
	defaultPollRate,
	maxPollRate,
	minPollRate,
} from "../../../config/config";

interface InjectedProps {
	config: Config;
}

/**
 * A field for setting the controller poll rate.
 */
@inject(Store.Config)
@observer
export class PollRateInput extends Component {
	private get injected(): InjectedProps {
		return this.props as InjectedProps;
	}

	public render = (): InfernoNode => (
		<NumberGroup
			inputClassName="number-input-3"
			id="config-poll-rate"
			label="Poll rate"
			value={this.injected.config.pollRate}
			min={minPollRate}
			max={maxPollRate}
			placeholder={defaultPollRate}
			suffix="Hz"
			onChange={this.handleChange}
		>
			Inputs will be read this many times per second.
		</NumberGroup>
	);

	@action
	private handleChange = (value?: number): void => {
		this.injected.config.pollRate = value || defaultPollRate;
	};
}
