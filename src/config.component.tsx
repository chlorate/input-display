import {connect} from "inferno-mobx";
import {Config} from "./config";
import {ControllerSelectComponent} from "./form/controller-select.component";

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
			<div class="form-group mb-0">
				<ControllerSelectComponent />
			</div>
		</form>
	);
});
