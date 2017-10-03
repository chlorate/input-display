import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, maxPollRate, minPollRate} from "./config";

interface Props {
	config: Config;
}

export const PollRateInputComponent = connect(["config"], ({config}: Props) => (
	<div>
		<label for="id-config-poll-rate">
			Poll rate
		</label>
		<div class="input-group id-input-group-poll-rate">
			<input
				type="number"
				class="form-control"
				id="id-config-poll-rate"
				value={config.pollRate}
				min={minPollRate}
				max={maxPollRate}
				placeholder={minPollRate}
				required
				aria-describedby="id-config-poll-rate-addon id-config-poll-rate-help"
				onChange={linkEvent(config, handleChange)}
			/>
			<span class="input-group-addon" id="id-config-poll-rate-addon">
				Hz
			</span>
		</div>
		<small class="form-text text-muted" id="id-config-poll-rate-help">
			How often the controller's state is read.
		</small>
	</div>
));

function handleChange(config: Config, event: any) {
	config.pollRate = event.target.value;
}
