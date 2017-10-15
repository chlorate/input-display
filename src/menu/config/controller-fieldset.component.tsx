import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, maxPollRate, minPollRate} from "../../config/config";
import {Store} from "../../storage/store";
import {DeviceSelectComponent} from "./device-select.component";
import {DpadMappingFieldsetComponent} from "./dpad-mapping-fieldset.component";
import {NumberInputComponent} from "./number-input.component";

interface Props {
	config: Config;
}

/**
 * A set of fields related to controller configuration.
 */
export const ControllerFieldsetComponent = connect([Store.Config], ({config}: Props) => (
	<fieldset>
		<DeviceSelectComponent />
		<DpadMappingFieldsetComponent />
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
	</fieldset>
));

function handleChange(config: Config, event): void {
	config.pollRate = event.target.value;
}
