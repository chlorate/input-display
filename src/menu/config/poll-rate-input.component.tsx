import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, maxPollRate, minPollRate} from "../../config/config";
import {Store} from "../../storage/store";
import {NumberInputComponent} from "./number-input.component";

interface Props {
	config: Config;
}

/**
 * A numeric field for setting the controller poll rate.
 */
export const PollRateInputComponent = connect([Store.Config], ({config}: Props) => (
	<NumberInputComponent
		id="config-poll-rate"
		label="Poll rate"
		suffix="Hz"
		value={config.pollRate}
		min={minPollRate}
		max={maxPollRate}
		help="How often the controller's inputs are read."
		onChange={linkEvent(config, handleChange)}
	/>
));

function handleChange(config: Config, event): void {
	config.pollRate = event.target.value;
}
