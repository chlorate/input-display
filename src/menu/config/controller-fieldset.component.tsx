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
		<div class="form-row">
			<NumberInputComponent
				className="col m-0"
				id="config-poll-rate"
				label="Poll rate"
				suffix="Hz"
				value={config.pollRate}
				min={minPollRate}
				max={maxPollRate}
				help={true}
				onChange={linkEvent(config, handleChange)}
			/>
			<div class="col-6 col-spacer"></div>
			<div class="col-2 col-spacer"></div>
			<div class="col-1 col-spacer"></div>
		</div>
		<small className="form-text text-muted mb-3" id="config-poll-rate-help">
			How often the controller's inputs are read.
		</small>
	</fieldset>
));

function handleChange(config: Config, event): void {
	config.pollRate = event.target.value;
}
