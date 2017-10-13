import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, maxPollRate, minPollRate} from "../../config/config";
import {Store} from "../../storage/store";

interface Props {
	config: Config;
}

/**
 * A numeric field for setting the controller poll rate.
 */
export const PollRateInputComponent = connect([Store.Config], ({config}: Props) => (
	<div className="form-group mb-0">
		<label for="config-poll-rate">
			Poll rate
		</label>
		<div className="input-group input-group-poll-rate">
			<input
				type="number"
				className="form-control"
				id="config-poll-rate"
				value={config.pollRate}
				min={minPollRate}
				max={maxPollRate}
				placeholder={minPollRate}
				required
				aria-describedby="config-poll-rate-addon config-poll-rate-help"
				onChange={linkEvent(config, handleChange)}
			/>
			<span className="input-group-addon" id="config-poll-rate-addon">
				Hz
			</span>
		</div>
		<small className="form-text text-muted" id="config-poll-rate-help">
			How often the controller's inputs are read.
		</small>
	</div>
));

function handleChange(config: Config, event): void {
	config.pollRate = event.target.value;
}
