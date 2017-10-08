import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Store} from "../mobx/store";
import {Config, maxPollRate, minPollRate} from "./config";

interface Props {
	config: Config;
}

/**
 * A numeric field for setting the controller poll rate.
 */
export const PollRateInputComponent = connect([Store.Config], ({config}: Props) => (
	<div class="form-group mb-0">
		<label for="config-poll-rate">
			Poll rate
		</label>
		<div class="input-group input-group-poll-rate">
			<input
				type="number"
				class="form-control"
				id="config-poll-rate"
				value={config.pollRate}
				min={minPollRate}
				max={maxPollRate}
				placeholder={minPollRate}
				required
				aria-describedby="config-poll-rate-addon config-poll-rate-help"
				onChange={linkEvent(config, handleChange)}
			/>
			<span class="input-group-addon" id="config-poll-rate-addon">
				Hz
			</span>
		</div>
		<small class="form-text text-muted" id="config-poll-rate-help">
			How often the controller's inputs are read.
		</small>
	</div>
));

function handleChange(config: Config, event): void {
	config.pollRate = event.target.value;
}
