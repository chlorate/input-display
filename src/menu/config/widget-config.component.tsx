import {linkEvent} from "inferno";
import {connect} from "inferno-mobx";
import {Config, maxMashSpeedThreshold, minMashSpeedThreshold} from "../../config/config";
import {Store} from "../../storage/store";
import {NumberInputComponent} from "../field/number-input.component";
import {AddWidgetFormComponent} from "./add-widget-form.component";
import {EditWidgetFieldsetComponent} from "./edit-widget-fieldset.component";

interface Props {
	config: Config;
}

/**
 * A section within the Config tab related to widgets.
 */
export const WidgetConfigComponent = connect([Store.Config], ({config}: Props) => (
	<section>
		<div className="form-row">
			<NumberInputComponent
				className="col m-0"
				id="config-mash-speed-threshold"
				label="Mash speed threshold"
				suffix="Hz"
				value={config.mashSpeedThreshold}
				min={minMashSpeedThreshold}
				max={maxMashSpeedThreshold}
				onChange={linkEvent(config, handleChangeMashSpeedThreshold)}
			/>
			<div className="col-6 col-spacer"></div>
			<div className="col-2 col-spacer"></div>
		</div>
		<small className="form-text text-muted mb-3" id="config-mash-speed-threshold-help">
			Minimum mash speed required before a button's mashing colors
			and label are shown.
		</small>

		<h3 className="h5">
			Add widget
		</h3>
		<AddWidgetFormComponent />

		{config.widgets.length > 0 &&
			<h3 className="h5">
				Edit widget
			</h3>
		}
		<EditWidgetFieldsetComponent />
	</section>
));

function handleChangeMashSpeedThreshold(config: Config, event) {
	config.mashSpeedThreshold = event.target.value;
}
