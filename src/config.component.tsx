import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config} from "./config";
import {AxisInputComponent} from "./form/axis-input.component";

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

			<h2 class="h5">Triggers</h2>
			<div class="form-row mb-4">
				<div class="col">
					<label for="trigger-width">
						Width
					</label>
					<input
						type="number"
						class="form-control"
						id="trigger-width"
					/>
				</div>
				<div class="col">
					<label for="trigger-height">
						Height
					</label>
					<input
						type="number"
						class="form-control"
						id="trigger-height"
					/>
				</div>
			</div>

			<h2 class="h5">Top buttons</h2>
			<div class="form-group mb-4">
				<label for="button-width">
					Width
				</label>
				<input
					type="number"
					class="form-control"
					id="top-button-width"
				/>
			</div>

			<h2 class="h5">D-pad and face buttons</h2>
			<div class="form-group">
				<label for="face-button-size">
					Size
				</label>
				<input
					type="number"
					class="form-control"
					id="face-button-size"
				/>
			</div>
		</form>
	);
};
