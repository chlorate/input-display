import {Component, VNode} from "inferno";
import {action} from "mobx";
import {inject, observer} from "inferno-mobx";
import {Store} from "../../../storage/store";
import {NumberInput} from "../field";

import {
	FormGroup,
	FormText,
	InputGroup,
	InputGroupAddon,
	Label,
} from "inferno-bootstrap";

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

	public render = (): VNode => (
		<FormGroup>
			<Label for="config-poll-rate">Poll rate</Label>
			<div>
				<InputGroup className="d-inline-flex w-auto">
					<NumberInput
						id="config-poll-rate"
						value={this.injected.config.pollRate}
						min={minPollRate}
						max={maxPollRate}
						defaultValue={defaultPollRate}
						describedBy="config-poll-rate-help"
						onChange={this.handleChange}
					/>
					<InputGroupAddon addonType="append">Hz</InputGroupAddon>
				</InputGroup>
			</div>
			<FormText id="config-poll-rate-help">
				Inputs will be read this many times per second.
			</FormText>
		</FormGroup>
	);

	@action
	private handleChange = (value: number): void => {
		this.injected.config.pollRate = value;
	};
}
