import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Store} from "../mobx/store";
import {Config} from "./config";
import {DeviceSelectComponent} from "./device-select.component";
import {DpadMappingFieldsetComponent} from "./dpad-mapping-fieldset.component";
import {PollRateInputComponent} from "./poll-rate-input.component";

interface Props {
	config: Config;
}

/**
 * Contents of the Config tab. Provides fields for configuring the controller
 * and input display.
 */
export const ConfigComponent = connect([Store.Config], ({config}: Props) => (
	<form onSubmit={linkEvent(undefined, handleSubmit)}>
		<div class="mb-4">
			<button type="button" class="btn btn-secondary mr-1">
				Import
			</button>
			<button type="button" class="btn btn-secondary">
				Export
			</button>
		</div>

		<h2 class="h4">
			Controller
		</h2>
		<DeviceSelectComponent />
		<DpadMappingFieldsetComponent />
		<PollRateInputComponent />
	</form>
));

function handleSubmit(_: undefined, event): void {
	event.preventDefault();
}
