import {VNode} from "inferno";
import {CardBody} from "inferno-bootstrap";
import {BackHeading} from "..";

import {
	DeviceSelect,
	DpadDualAxesSelects,
	DpadMappingSelect,
	DpadSingleAxisSelect,
	PollRateInput,
} from ".";

/**
 * The contents of the Controller screen of the Config tab. Provides fields for
 * controller-related configuration.
 */
export const ControllerConfigTab = (): VNode => (
	<div>
		<BackHeading to="/config">Controller</BackHeading>
		<CardBody>
			<DeviceSelect />

			<h3 className="h4 mt-4">Directional pad</h3>
			<DpadMappingSelect />
			<DpadSingleAxisSelect />
			<DpadDualAxesSelects />

			<h3 className="h4 mt-4">Inputs</h3>
			<PollRateInput />
		</CardBody>
	</div>
);

/*
import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Config, defaultPollRate, maxPollRate, minPollRate} from "../../config/config";
import {Store} from "../../storage/store";
import {DeviceSelectComponent} from "../field/device-select.component";
import {NumberInputComponent} from "../field/number-input.component";
import {DpadMappingFieldsetComponent} from "./dpad-mapping-fieldset.component";

interface Props {
	config: Config;
}

**
 * A section within the Config tab for controller configuration.
 *
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
				placeholder={defaultPollRate}
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

const handleChange = action((config: Config, event): void => {
	config.pollRate = event.target.value || defaultPollRate;
});
 */
