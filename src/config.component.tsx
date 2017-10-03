import {connect} from "inferno-mobx";
import {Config} from "./config";
import {ControllerSelectComponent} from "./form/controller-select.component";
import {PollRateInputComponent} from "./form/poll-rate-input.component";

export const ConfigComponent = connect(["config"], ({config}: {config: Config}) => {
	return (
		<form>
			<div class="mb-4">
				<button type="button" class="btn btn-secondary mr-1">
					Import
				</button>
				<button type="button" class="btn btn-secondary">
					Export
				</button>
			</div>

			<h2 class="h5">
				General
			</h2>
			<div class="form-group">
				<ControllerSelectComponent />
			</div>
			<div class="form-group mb-0">
				<PollRateInputComponent />
			</div>
		</form>
	);
});
