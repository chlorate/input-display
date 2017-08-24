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

			<h2 class="h5">
				Compatibility
			</h2>
			<div class="form-group mb-4">
				<AxisInputComponent
					id="hat-axis"
					label="Point of View Hat axis"
					help
					value={config.hatAxis}
					onChange={linkEvent(config, handleChangeHatAxis)}
				/>
				<small class="form-text text-muted" id="hat-axis-help">
					Your controller's <nobr>d-pad</nobr> might be mapped to a "Point of View Hat" under Windows Game Controller properties.
					If it is, then you need to configure this setting in order to map your <nobr>d-pad</nobr> to the input display.
					Browsers map the POV Hat to an axis.
					Under the Stats tab, move your <nobr>d-pad</nobr> and identify which axis represents your <nobr>d-pad</nobr>.
					Select the axis here and then you can map POV Hat directions to the input display.
				</small>
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
});

function handleChangeHatAxis(config: Config, event) {
	config.hatAxis = event.target.value;
}
