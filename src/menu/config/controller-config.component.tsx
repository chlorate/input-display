import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, maxPollRate, minPollRate} from "../../config/config";
import {Store} from "../../storage/store";
import {DeviceSelectComponent} from "../field/device-select.component";
import {NumberInputComponent} from "../field/number-input.component";
import {DpadMappingFieldsetComponent} from "./dpad-mapping-fieldset.component";

interface Props {
	config: Config;
}

/**
 * A section within the Config tab for controller configuration.
 */
export const ControllerConfigComponent = connect([Store.Config], ({config}: Props) => (
	<section className="mb-5">
		<DeviceSelectComponent />
		<DpadMappingFieldsetComponent />
		<div className="form-row">
			<NumberInputComponent
				className="col m-0"
				id="config-poll-rate"
				label="Poll rate"
				suffix="Hz"
				value={config.pollRate}
				min={minPollRate}
				max={maxPollRate}
				helpId="config-poll-rate-help"
				onChange={linkEvent(config, handleChange)}
			/>
			<div className="col-6 col-spacer"></div>
			<div className="col-2 col-spacer"></div>
			<div className="col-1 col-spacer"></div>
		</div>
		<small className="form-text text-muted mb-3" id="config-poll-rate-help">
			How often the controller's inputs are read.
		</small>
	</section>
));

function handleChange(config: Config, event): void {
	config.pollRate = event.target.value;
}
