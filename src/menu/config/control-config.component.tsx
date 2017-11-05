import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {action} from "mobx";
import {Store} from "../../storage/store";
import {NumberInputComponent} from "../field/number-input.component";
import {AddControlFormComponent} from "./add-control-form.component";
import {EditControlFieldsetComponent} from "./edit-control-fieldset.component";
import {EditControlsFieldsetComponent} from "./edit-controls-fieldset.component";

import {
	Config,
	defaultLabelOffset, defaultMashSpeedThreshold,
	maxLabelOffset, maxMashSpeedThreshold,
	minLabelOffset, minMashSpeedThreshold,
} from "../../config/config";

interface Props {
	config: Config;
}

/**
 * A section within the Config tab related to controls.
 */
export const ControlConfigComponent = connect([Store.Config], ({config}: Props) => (
	<section className="mb-5">
		<div className="form-row">
			<NumberInputComponent
				className="col m-0"
				id="config-mash-speed-threshold"
				label="Mash speed threshold"
				suffix="Hz"
				value={config.mashSpeedThreshold}
				min={minMashSpeedThreshold}
				max={maxMashSpeedThreshold}
				placeholder={defaultMashSpeedThreshold}
				helpId="config-mash-speed-threshold-help"
				onChange={linkEvent(config, handleChangeMashSpeedThreshold)}
			/>
			<div className="col-6 col-spacer"></div>
			<div className="col-2 col-spacer"></div>
		</div>
		<small className="form-text text-muted mb-3" id="config-mash-speed-threshold-help">
			Minimum mash speed required before a button's mashing colors
			and label are shown.
		</small>

		<div className="form-row">
			<NumberInputComponent
				className="col m-0"
				id="config-label-offset-x"
				label="Label offset X"
				suffix="px"
				value={config.labelOffsetX}
				min={minLabelOffset}
				max={maxLabelOffset}
				placeholder={defaultLabelOffset}
				helpId="config-label-offset-help"
				onChange={linkEvent(config, handleChangeLabelOffsetX)}
			/>
			<NumberInputComponent
				className="col m-0"
				id="config-label-offset-y"
				label="Label offset Y"
				suffix="px"
				value={config.labelOffsetY}
				min={minLabelOffset}
				max={maxLabelOffset}
				placeholder={defaultLabelOffset}
				helpId="config-label-offset-help"
				onChange={linkEvent(config, handleChangeLabelOffsetY)}
			/>
			<div class="col-3 col-spacer"></div>
			<div class="col-3 col-spacer"></div>
		</div>
		<small className="form-text text-muted mb-3" id="config-label-offset-help">
			Adjust if labels appear off-center due to the display's font.
		</small>

		<h3 className="h5">
			Add control
		</h3>
		<AddControlFormComponent />

		{config.controls.length > 0 &&
			<h3 className="h5">
				Edit control
			</h3>
		}
		<EditControlFieldsetComponent />

		{config.controls.length > 1 && [
			<h3 className="h5">
				Edit all controls
			</h3>,
			<EditControlsFieldsetComponent />,
		]}
	</section>
));

const handleChangeMashSpeedThreshold = action((config: Config, event): void => {
	config.mashSpeedThreshold = event.target.value || defaultMashSpeedThreshold;
});

const handleChangeLabelOffsetX = action((config: Config, event): void => {
	config.labelOffsetX = event.target.value || defaultLabelOffset;
});

const handleChangeLabelOffsetY = action((config: Config, event): void => {
	config.labelOffsetY = event.target.value || defaultLabelOffset;
});
